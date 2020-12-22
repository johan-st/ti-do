import { User, ListNode, ListNodeInput, NodeId, Metadata, UserId, ResolverContext } from '../types'
import * as uuid from 'uuid'

import { GraphQLError } from 'graphql'
import { canAdmin, canDelete, canRead, canWrite } from '../bespokeExtras'



// TODO: who should be able to get a users data?
const getUser = async (args: { userId: string }, context: ResolverContext): Promise<User> => {
  if (!context.auth.isValid) {
    throw new GraphQLError('getUser: Request can not be Authenticated')
  }
  return await context.db.userById(args.userId)
}

// TODO: typing
const getNode = async (args: { nodeId: string }, context: ResolverContext): Promise<ListNode> => {
  const node = await context.db.nodeById(args.nodeId)
  return new Promise((resolve, reject) => {
    if (canRead(context.auth.userId, node)) {
      const subNodesProms = node.subNodes.map((subNode: string | ListNode) => {
        if (typeof subNode === 'string') {
          return (context.db.nodeById(subNode))
        } else {
          return subNode
        }
      })
      Promise.all(subNodesProms).then(subNodes => {
        resolve({ ...node, subNodes })
      })

    } else {
      reject('Not authorized too read this node')
    }
  })
}

const getRoots = async (args: unknown, context: ResolverContext): Promise<ListNode[]> => {
  if (!context.auth.isValid) {
    throw new GraphQLError('getNode: Request can not be Authenticated')
  }
  return context.db.rootsByOwner(context.auth.userId)
}
const createRootNode = async (args: { listNode: ListNodeInput }, context: ResolverContext): Promise<ListNode | undefined> => {
  if (!context.auth.isValid) {
    throw new GraphQLError('createRootNode: Request can not be Authenticated')
  }
  const metadata: Metadata = {
    owner: context.auth.userId,
    readers: [],
    writers: [],
    admins: []
  }
  const newNode = { ...args.listNode, rootNode: true, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  const result = await context.db.addListNode(newNode)
  return result
}
const createChildNode = async (args: { listNode: ListNodeInput, parentId: NodeId }, context: ResolverContext): Promise<ListNode | undefined> => {
  if (!context.auth.isValid) {
    throw new GraphQLError('createChildNode: Request can not be Authenticated')
  }
  const metadata: Metadata = {
    owner: context.auth.userId,
    readers: [],
    writers: [],
    admins: []
  }
  const newNode = { ...args.listNode, rootNode: false, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  return context.db.addListNode(newNode)
}
const deleteNode = async (args: { nodeId: NodeId }, context: ResolverContext): Promise<void> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canDelete(context.auth.userId, node)) {
    return context.db.deleteNode(args.nodeId)
  }
}
const markNodeComplete = async (args: { nodeId: NodeId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canWrite(context.auth.userId, node)) {
    node.completed = true
    return context.db.updateListNode(node)
  }
}
const markNodeIncomplete = async (args: { nodeId: NodeId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canWrite(context.auth.userId, node)) {
    node.completed = false
    return await context.db.updateListNode(node)
  }
}
const addReader = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canRead(context.auth.userId, node)) {
    if (node.metadata.readers.includes(args.userId)) {
      return node
    }
    node.metadata.readers.push(args.userId)
    return context.db.updateListNode(node)
  }
}
const removeReader = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canAdmin(context.auth.userId, node)) {
    if (!node.metadata.readers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.readers.indexOf(args.userId)
    const newReaders = node.metadata.readers.splice(index, 0)
    const newNode = { ...node, metadata: { ...node.metadata, readers: newReaders } }
    return context.db.updateListNode(newNode)
  }
}
const addWriter = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canAdmin(context.auth.userId, node)) {

    if (node.metadata.writers.includes(args.userId)) {
      return node
    }
    node.metadata.writers.push(args.userId)
    return context.db.updateListNode(node)
  }
}
const removeWriter = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canAdmin(context.auth.userId, node)) {

    if (!node.metadata.writers.includes(args.userId)) {
      return node
    }
    const index = node.metadata.writers.indexOf(args.userId)
    const newWriters = node.metadata.writers.splice(index, 0)
    const newNode = { ...node, metadata: { ...node.metadata, writers: newWriters } }
    return context.db.updateListNode(newNode)
  }
}
const addAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canAdmin(context.auth.userId, node)) {

    if (node.metadata.admins.includes(args.userId)) {
      return node
    }
    node.metadata.admins.push(args.userId)
    return context.db.updateListNode(node)
  }
}
const removeAdmin = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (canAdmin(context.auth.userId, node)) {
    if (!node.metadata.admins.includes(args.userId)) {
      return node
    }
    const index = node.metadata.admins.indexOf(args.userId)
    const newAdmins = node.metadata.admins.splice(index, 0)
    const newNode = { ...node, metadata: { ...node.metadata, admins: newAdmins } }
    return context.db.updateListNode(newNode)
  }
}
const transferOwnership = async (args: { nodeId: NodeId, userId: UserId }, context: ResolverContext): Promise<ListNode | undefined> => {
  const node = await context.db.nodeById(args.nodeId)
  if (node) {
    if (node.metadata.owner === args.userId) {
      return node
    }
    const newNode = { ...node, metadata: { ...node.metadata, owner: args.userId } }
    return context.db.updateListNode(newNode)
  }
}
// Root resolver
export const root = {
  user: getUser,
  node: getNode,
  rootNodes: getRoots,
  createRootNode: createRootNode,
  createChildNode: createChildNode,
  deleteNode: deleteNode,
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