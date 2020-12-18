import { User, ListNode } from '../types'
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

// Root resolver
export const root = {
  user: getUser,
  node: getNode,
  rootNodes: getRootNodes

}
