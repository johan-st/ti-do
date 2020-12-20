import { User, ListNode, ListNodeInput, NodeId, Metadata, UserId, Authentication } from '../types'
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
const getUser = async (args: { userId: string }, context: Authentication): Promise<User> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const user = db.userById(args.userId)
  return user
}

const getNode = async (args: { nodeId: string }, context: Authentication): Promise<ListNode> => {
  const node = await getNodeIfReader(args.nodeId, context)
  return node
}

const getRoots = async (context: Authentication): Promise<ListNode[]> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const roots = db.rootsByOwner(context.userId)
  return roots
}
const createRootNode = async (args: { userId: UserId, listNode: ListNodeInput }, context: Authentication): Promise<ListNode | undefined> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const metadata: Metadata = {
    owner: args.userId,
    readers: [],
    writers: [],
    admins: []
  }

  const newNode = { ...args.listNode, rootNode: true, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  const result = db.addListNode(newNode)
  return result
}
const createChildNode = async (args: { userId: UserId, listNode: ListNodeInput, parentId: NodeId }, context: Authentication): Promise<ListNode | undefined> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const metadata: Metadata = {
    owner: args.userId,
    readers: [],
    writers: [],
    admins: []
  }
  const newNode = { ...args.listNode, rootNode: false, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  const result = db.addListNode(newNode)
  return result
}
const markNodeComplete = async (args: { nodeId: NodeId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfWriter(args.nodeId, context)
  if (node) {
    node.completed = true
    return db.updateListNode(node)

  }
}

const markNodeIncomplete = async (args: { nodeId: NodeId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfWriter(args.nodeId, context)
  if (node) {
    node.completed = false
    return db.updateListNode(node)
  }
}
const addReader = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.readers.includes(args.userId)) {
      return node
    }
    node.metadata.readers.push(args.userId)
    return db.updateListNode(node)
  }
}
const removeReader = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.readers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.readers.indexOf(args.userId)
    const newReaders = node.metadata.readers.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, readers: newReaders } }
    return await db.updateListNode(newNode)
  }
}
const addWriter = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.writers.includes(args.userId)) {
      return node
    }
    node.metadata.writers.push(args.userId)
    return db.updateListNode(node)
  }
}
const removeWriter = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.writers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.writers.indexOf(args.userId)
    const newWriters = node.metadata.writers.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, writers: newWriters } }
    return db.updateListNode(newNode)
  }
}
const addAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (node.metadata.admins.includes(args.userId)) {
      return node
    }
    node.metadata.admins.push(args.userId)
    return db.updateListNode(node)
  }
}
const removeAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfAdmin(args.nodeId, context)
  if (node) {
    if (!node.metadata.admins.includes(args.userId)) {
      return node
    }
    const index = node.metadata.admins.indexOf(args.userId)
    const newAdmins = node.metadata.admins.splice(index, 1)
    const newNode = { ...node, metadata: { ...node.metadata, admins: newAdmins } }
    return db.updateListNode(newNode)
  }
}
const transferOwnership = async (args: { nodeId: NodeId, userId: UserId }, context: Authentication): Promise<ListNode | undefined> => {
  const node = await getNodeIfOwner(args.nodeId, context)
  if (node) {
    if (node.metadata.owner === args.userId) {
      return node
    }
    const newNode = { ...node, metadata: { ...node.metadata, owner: args.userId } }
    const result = db.updateListNode(newNode)
    return result
  }
}
// Root resolver
export const root = {
  user: getUser,
  node: getNode,
  rootNodes: getRoots,
  createRootNode: createRootNode,
  createChildNode: createChildNode,
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
const getNodeIfReader = async (nodeId: NodeId, context: Authentication): Promise<ListNode> => {

  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }

  const node = await db.nodeById(nodeId)
  if (isReader(context.userId, node)) {
    throw new GraphQLError('unauthorized request')
  }

  if (node) {
    return node
  }

  throw new GraphQLError('unable to find node')
}

const getNodeIfWriter = async (nodeId: NodeId, context: Authentication): Promise<ListNode> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isWriter(context.userId, node)) {
    throw new GraphQLError('unauthorized request')
  }
  return node
}

const getNodeIfAdmin = async (nodeId: NodeId, context: Authentication): Promise<ListNode> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isAdmin(context.userId, node)) {
    throw new GraphQLError('unauthorized request')
  }
  return node
}

const getNodeIfOwner = async (nodeId: NodeId, context: Authentication): Promise<ListNode> => {
  if (!context.isValid) {
    throw new GraphQLError('Request can not be Authenticated')
  }
  const node = await db.nodeById(nodeId)
  if (isOwner(context.userId, node)) {
    throw new GraphQLError('unauthorized request')
  }
  return node
}