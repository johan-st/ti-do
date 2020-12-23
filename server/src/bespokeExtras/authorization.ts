import { ListNode, UserId } from '../types'


const canRead = (userId: UserId, node: ListNode): boolean => {
  return node?.metadata.owner === userId
    || node?.metadata.readers.includes(userId)
    || node?.metadata.writers.includes(userId)
    || node?.metadata.admins.includes(userId)
    ? true : false
}
const canWrite = (userId: UserId, node: ListNode): boolean => {
  return node?.metadata.owner === userId
    || node?.metadata.writers.includes(userId)
    || node?.metadata.admins.includes(userId)
    ? true : false
}
const canAdmin = (userId: UserId, node: ListNode): boolean => {
  return node?.metadata.owner === userId
    || node?.metadata.admins.includes(userId)
    ? true : false
}
const canDelete = (userId: UserId, node: ListNode): boolean => {
  return node?.metadata.owner === userId
    || node?.metadata.writers.includes(userId)
    || node?.metadata.admins.includes(userId)
    ? true : false
}

export { canAdmin, canDelete, canRead, canWrite }