import { User, ListNode, ListNodeInput, NodeId, Metadata, UserId, ValidAuthentication, InvalidAuthentication, Authentication } from '../types'
import * as uuid from 'uuid'
import { DataWrapper } from '../repository'
import { MockDataWrapper } from '../repository/mock-db'

import { GraphQLError } from 'graphql'
import { isWriter, isReader, isAdmin, isOwner } from '../bespokeExtras'

let db: DataWrapper | MockDataWrapper
if (process.env.MOCK_DATA) {
  db = new MockDataWrapper()
} else { db = new DataWrapper() }


// TODO: who should be able to get a users data?
const getUser = async (args: { userId: string }, context: ValidAuthentication | InvalidAuthentication): Promise<User | undefined> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  try {
    const user = await db.userById(args.userId)
    return user
  } catch (err) { console.dir(err) }
}

const getNode = async (args: { nodeId: string }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  try {
    const node = await getNodeIfReader(args.nodeId, context)
    return node
  } catch (err) { console.dir(err) }
}

const getRoots = async (context: ValidAuthentication | InvalidAuthentication): Promise<ListNode[] | undefined> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  try {
    const roots = await db.rootsByOwner(context.userId)
    return roots
  } catch (err) {
    console.dir(err)
  }
}

const createListNode = async (args: { userId: UserId, listNode: ListNodeInput, parentNode: NodeId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(args.parentNode)
  if (!isWriter(context.userId, node)) {
    throw new GraphQLError('nauthorized request')
  }
  const metadata: Metadata = {
    owner: args.userId,
    readers: [],
    writers: [],
    admins: []
  }
  const newNode = { ...args.listNode, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  const result = await db.addListNode(newNode)
  return result
}
const markNodeComplete = async (args: { nodeId: NodeId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfWriter(args.nodeId, context)
  if (node) {
    node.completed = true
    const result = await db.updateListNode(node)
    return result
  }
}

const markNodeIncomplete = async (args: { nodeId: NodeId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfWriter(args.nodeId, context)
  if (node) {
    node.completed = false
    const result = await db.updateListNode(node)
    return result
  }
}
const addReader = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.readers.includes(args.userId)) {
      return node
    }
    node.metadata.readers.push(args.userId)
    const result = await db.updateListNode(node)
    return result
  }
}
const removeReader = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.readers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.readers.indexOf(args.userId)
    const newReaders = node.metadata.readers.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, readers: newReaders } }
    const result = await db.updateListNode(newNode)
    return result
  }
}
const addWriter = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.writers.includes(args.userId)) {
      return node
    }
    node.metadata.writers.push(args.userId)
    const result = await db.updateListNode(node)
    return result
  }
}
const removeWriter = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.writers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.writers.indexOf(args.userId)
    const newWriters = node.metadata.writers.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, writers: newWriters } }
    const result = await db.updateListNode(newNode)
    return result
  }
}
const addAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.admins.includes(args.userId)) {
      return node
    }
    node.metadata.admins.push(args.userId)
    const result = await db.updateListNode(node)
    return result
  }
}
const removeAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.admins.includes(args.userId)) {
      return node
    }
    const index = node.metadata.admins.indexOf(args.userId)
    const newAdmins = node.metadata.admins.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, admins: newAdmins } }
    const result = await db.updateListNode(newNode)
    return result
  }
}
const transferOwnership = async (args: { nodeId: NodeId, userId: UserId }, context: ValidAuthentication | InvalidAuthentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfOwner(args.nodeId, context)
  if (node) {
    if (node.metadata.owner === args.userId) {
      return node
    }
    const newNode = { ...node, metadata: { ...node.metadata, owner: args.userId } }
    const result = await db.updateListNode(newNode)
    return result
  }
}
// Root resolver
export const root = {
  user: getUser,
  node: getNode,
  rootNodes: getRoots,
  createListNode: createListNode,
  markNodeComplete: markNodeComplete,
  markNodeIncomplete: markNodeIncomplete,
  addReader: addReader,
  removeReader: removeReader,
  addWriter: addWriter,
  removeWriter: removeWriter,
  addAdmin: addAdmin,
  removeAdmin: removeAdmin,
  transferOwnership: transferOwnership

}


// helpers
const getNodeIfReader = async (nodeId: NodeId, context: Authentication) => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isReader(context.userId, node)) {
    throw new GraphQLError('unauthorized request')
  }
  return node
}

const getNodeIfWriter = async (nodeId: NodeId, context: Authentication) => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isWriter(context.userId, node)) {
    throw new GraphQLError('nauthorized request')
  }
  return node
}

const getNodeIfAdmin = async (nodeId: NodeId, context: Authentication) => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isAdmin(context.userId, node)) {
    throw new GraphQLError('nauthorized request')
  }
  return node
}

const getNodeIfOwner = async (nodeId: NodeId, context: Authentication) => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isOwner(context.userId, node)) {
    throw new GraphQLError('nauthorized request')
  }
  return node
}