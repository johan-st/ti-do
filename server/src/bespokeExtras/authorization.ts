import { ListNode, UserId } from '../types'

const isWriter = (userId: UserId, node: ListNode): boolean =>
  node.metadata.owner === userId || node.metadata.writers?.includes(userId) ? true : false

const isReader = (userId: UserId, node: ListNode): boolean =>
  node.metadata.owner === userId || node.metadata.readers?.includes(userId) ? true : false

const isAdmin = (userId: UserId, node: ListNode): boolean =>
  node.metadata.owner === userId || node.metadata.admins?.includes(userId) ? true : false

const isOwner = (userId: UserId, node: ListNode): boolean =>
  node.metadata.owner === userId

export { isReader, isWriter, isAdmin, isOwner }