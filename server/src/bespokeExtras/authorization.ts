import { ListNode, UserId } from '../types'

const isReader = (userId: UserId, node: ListNode): boolean => {
  console.log('isReader')
  return node.metadata.owner === userId || node.metadata.readers?.includes(userId) ? true : false
}

const isWriter = (userId: UserId, node: ListNode): boolean => {
  console.log('isWriter')
  return node.metadata.owner === userId || node.metadata.writers?.includes(userId) ? true : false
}
const isAdmin = (userId: UserId, node: ListNode): boolean => {
  console.log('isAdmin')
  return node.metadata.owner === userId || node.metadata.admins?.includes(userId) ? true : false
}
const isOwner = (userId: UserId, node: ListNode): boolean => {
  console.log('isOwner')
  return node.metadata.owner === userId
}
export { isReader, isWriter, isAdmin, isOwner }