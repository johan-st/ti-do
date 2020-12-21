import { root } from './resolvers'
import { MockDataWrapper, mockUsers, mockNodes } from './mock-db'
import { ResolverContext, ValidAuthentication, ListNode } from '../types'

const db = new MockDataWrapper
const auth: ValidAuthentication = { isValid: true, userId: 'ffffffff-ffff-ffff-ffff-ffffffffffff' }
const mockContext: ResolverContext = { auth, db }

test('should return user', async () => {
  expect(await root.user({ userId: mockUsers[0].userId }, mockContext)).toBe(mockUsers[0])
})
test('should return node', async () => {
  expect(await root.node({ nodeId: mockNodes[0].nodeId }, mockContext)).toMatchObject<ListNode>({ ...mockNodes[0], subNodes: [mockNodes[1]] })
})
test('should authorized users root nodes', async () => {
  expect(await root.rootNodes({}, mockContext)).toMatchObject<ListNode[]>([mockNodes[0]])
})
test('should return newly created ROOT node', async () => {
  const node = await root.createRootNode({
    listNode: { title: 'created by test', notes: 'also carries notes' }
  }, mockContext)
  expect(node).toMatchObject<ListNode>(await root.node({ nodeId: node!.nodeId }, mockContext))
})
test('should return newly created CHILD node', async () => {
  const node = await root.createChildNode({
    listNode: { title: 'test child noode', notes: 'also...' },
    parentId: mockNodes[1].nodeId
  }, mockContext)
  expect(node).toMatchObject<ListNode>(await root.node({ nodeId: node!.nodeId }, mockContext))
})
test('DELETED node should not be found', async () => {
  const node = await root.createRootNode({ listNode: { title: 'test node destined to be deleted' } }, mockContext)
  const nodeId = node!.nodeId
  await root.deleteNode({ nodeId }, mockContext)
  // await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
  await expect(root.node({ nodeId }, mockContext)).rejects.toThrow('failed to get node by nodeId')
})
test('should return mark and return node as completed', async () => {
  const node = await root.markNodeComplete({ nodeId: mockNodes[0].nodeId }, mockContext)
  expect(node).toHaveProperty('completed', true)
})
test('should return mark and return node as incomplete', async () => {
  const node = await root.markNodeIncomplete({ nodeId: mockNodes[0].nodeId }, mockContext)
  expect(node).toHaveProperty('completed', false)
})
test('should return node with user added or removed as reader when appropriate', async () => {
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, mockContext)
  const nodeId = node!.nodeId

  const added = await root.addReader({ nodeId, userId }, mockContext)
  expect(added).toHaveProperty('metadata.readers', [userId])
  const removed = await root.removeReader({ nodeId, userId }, mockContext)
  expect(removed).toHaveProperty('metadata.readers', [])
})
test('should return node with user added or removed as writer when appropriate', async () => {
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, mockContext)
  const nodeId = node!.nodeId

  const added = await root.addWriter({ nodeId, userId }, mockContext)
  expect(added).toHaveProperty('metadata.writers', [userId])
  const removed = await root.removeWriter({ nodeId, userId }, mockContext)
  expect(removed).toHaveProperty('metadata.writers', [])
})

test('should return node with user added or removed as admin when appropriate', async () => {
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, mockContext)
  const nodeId = node!.nodeId

  const added = await root.addAdmin({ nodeId, userId }, mockContext)
  expect(added).toHaveProperty('metadata.admins', [userId])
  const removed = await root.removeAdmin({ nodeId, userId }, mockContext)
  expect(removed).toHaveProperty('metadata.admins', [])
})

test('transferOwnership: should return node with new OWNER', async () => {
  const userId = mockUsers[1].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, mockContext)
  const nodeId = node!.nodeId
  const added = await root.transferOwnership({ nodeId, userId }, mockContext)
  expect(added).toHaveProperty('metadata.owner', userId)
})
