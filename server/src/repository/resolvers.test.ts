/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv'
dotenv.config()
import { root } from './resolvers'
import { MockDataWrapper, mockUsers, mockNodes } from './mock-db'
import { DataWrapper } from './db'
import { ResolverContext, ValidAuthentication, ListNode } from '../types'

// const db = MockDataWrapper()
const db = new DataWrapper()
const auth: ValidAuthentication = { isValid: true, userId: '12345678-1234-1234-1234-123456789abc' }
let context: ResolverContext
beforeAll(async () => {
  await db.connect()
  context = { auth, db }

})
afterAll(() => {
  db.close()
  console.log('closing db connection')
})

test.only('USER: should return user by ID if authorized', async () => {
  // arrange
  // act
  const user = await root.user({ userId: auth.userId }, context)
  // assert
  expect.assertions(1)
  expect(user).toHaveProperty('userId', auth.userId)
})

test('NODE: should return node by ID if authorized', async () => {
  // arrange
  // act
  const node = await root.node({ nodeId: mockNodes[0].nodeId }, context)
  // assert
  expect.assertions(1)
  expect(node).toMatchObject<ListNode>({ ...mockNodes[0], subNodes: [mockNodes[1]] })
})
test('ROOTS: should return an authenticated users root nodes', async () => {
  expect.assertions(1)
  expect(await root.rootNodes({}, context)).toMatchObject<ListNode[]>([mockNodes[0]])
})
test('NEW ROOT: should create and return a root node', async () => {
  expect.assertions(1)
  const node = await root.createRootNode({
    listNode: { title: 'created by test', notes: 'also carries notes' }
  }, context)
  expect(node).toMatchObject<ListNode>(await root.node({ nodeId: node!.nodeId }, context))
})
test('NEW CHILD: should create, attatch to parent and return a child node', async () => {
  expect.assertions(2)
  const parentId = mockNodes[1].nodeId
  const node = await root.createChildNode({
    listNode: { title: 'test child noode', notes: 'also...' },
    parentId: parentId
  }, context)
  const parent = await root.node({ nodeId: parentId }, context)
  const test = parent.subNodes.find(n => {
    if (typeof n === 'string') {
      return n === node?.nodeId
    } else {
      return n.nodeId === node?.nodeId
    }
  })
  expect(test).toBeDefined()
  expect(node).toMatchObject<ListNode>(await root.node({ nodeId: node!.nodeId }, context))
})
test('DELETE: return a node that henceforth can not be found', async () => {
  expect.assertions(2)
  const node = await root.createRootNode({ listNode: { title: 'test node destined to be deleted' } }, context)
  const nodeId = node!.nodeId
  const deleted = await await root.deleteNode({ nodeId }, context)
  expect(deleted).toMatchObject<ListNode>(node!)
  await expect(root.node({ nodeId }, context)).rejects.toThrow('failed to get node by nodeId')
})
test('COMPLETE: should mark a node as completed and return it', async () => {
  expect.assertions(1)
  const node = await root.markNodeComplete({ nodeId: mockNodes[0].nodeId }, context)
  expect(node).toHaveProperty('completed', true)
})
test('UNCOMPLETE: should mark a node as uncompleted and return it', async () => {
  expect.assertions(1)
  const node = await root.markNodeIncomplete({ nodeId: mockNodes[0].nodeId }, context)
  expect(node).toHaveProperty('completed', false)
})
test('META READER: should return node with user added or removed as reader when appropriate', async () => {
  expect.assertions(2)
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, context)
  const nodeId = node!.nodeId
  const added = await root.addReader({ nodeId, userId }, context)
  expect(added).toHaveProperty('metadata.readers', [userId])
  const removed = await root.removeReader({ nodeId, userId }, context)
  expect(removed).toHaveProperty('metadata.readers', [])
})
test('META WRITER: should return node with user added or removed as writer when appropriate', async () => {
  expect.assertions(2)
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, context)
  const nodeId = node!.nodeId

  const added = await root.addWriter({ nodeId, userId }, context)
  expect(added).toHaveProperty('metadata.writers', [userId])
  const removed = await root.removeWriter({ nodeId, userId }, context)
  expect(removed).toHaveProperty('metadata.writers', [])
})

test('META ADMIN: should return node with user added or removed as admin when appropriate', async () => {
  expect.assertions(2)
  const userId = mockUsers[0].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, context)
  const nodeId = node!.nodeId

  const added = await root.addAdmin({ nodeId, userId }, context)
  expect(added).toHaveProperty('metadata.admins', [userId])
  const removed = await root.removeAdmin({ nodeId, userId }, context)
  expect(removed).toHaveProperty('metadata.admins', [])
})

test('TRANSFER OWNERSHIP: should return node with new OWNER', async () => {
  expect.assertions(1)
  const userId = mockUsers[1].userId
  const node = await root.createRootNode({ listNode: { title: 'new test node' } }, context)
  const nodeId = node!.nodeId
  const added = await root.transferOwnership({ nodeId, userId }, context)
  expect(added).toHaveProperty('metadata.owner', userId)
})
