import { User, ListNode, ListNodeInput, NodeId, Metadata, UserId } from '../types'
import * as uuid from 'uuid'
import { DataWrapper } from '../repository'
const db = new DataWrapper()

const getUser = async (args: { userId: string }): Promise<User | undefined> => {
  try {
    const user = await db.userById(args.userId)
    return user
  } catch (err) { console.dir(err) }
  return undefined
}
const getNode = async (args: { nodeId: string }): Promise<ListNode | undefined> => {
  try {
    const node = await db.nodeById(args.nodeId)
    return node
  } catch (err) { console.dir(err) }
  return undefined
}
const getRootNodes = async (args: { userId: string }): Promise<ListNode[] | undefined> => {
  try {
    const roots = await db.rootsByOwner(args.userId)
    return roots
  } catch (err) {
    console.dir(err)
  }
  return undefined
}
const createListNode = async (args: { userId: UserId, listNode: ListNodeInput }): Promise<ListNode | undefined> => {
  const metadata: Metadata = {
    owner: args.userId,
    readers: null,
    writers: null,
    admins: null
  }
  const newNode = { ...args.listNode, subNodes: [], nodeId: (uuid.v4() as NodeId), completed: false, metadata }
  db.addListNode(newNode)
  return undefined
}
// Root resolver
export const root = {
  user: getUser,
  node: getNode,
  rootNodes: getRootNodes,
  createListNode: createListNode

}
