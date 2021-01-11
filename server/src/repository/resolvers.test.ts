/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv'
import * as uuid from 'uuid'
dotenv.config()
import { root } from './resolvers'
import { MockDataWrapper } from './MockDataWrapper'
import { DataWrapper } from './DataWrapper'
import { ResolverContext, ValidAuthentication, ListNode, User } from '../types'

let db: DataWrapper

process.on('beforeExit', () => { db.close() })
// const auth: ValidAuthentication = { isValid: true, userId: uuid.v4() }
const auth: ValidAuthentication = { isValid: true, userId: '12345678-1234-1234-1234-123456789abc' }
let context: ResolverContext
let values: undefined | 
{
  nodes: ListNode[],
  fullRoot: ListNode,
  user: User
}
beforeAll(async () => {
  // [ARRANGE]
  if (process.env.MOCK_DATA) {
    console.log('USING MOCK DB')
    db = new MockDataWrapper()
  } else {
    console.log('USING PROD DB')
    db = new DataWrapper()
  }
  await db.connect()
  context = { auth, db }
  console.log(context.auth)
  
  const rootNode = await root.createRootNode({
    listNode: { title: 'ROOT', notes: 'should not persist after test is completed' }
  }, context)
  const user = await root.user({ userId: auth.userId }, context)
  const childNode1 = await root.createChildNode({
    listNode: { title: 'LEAF', notes: 'should not persist after test is completed' },
    parentId: rootNode.nodeId
  }, context)
  
  const childNode2 = await root.createChildNode({
    listNode: { title: 'LEAF', notes: 'should not persist after test is completed' },
    parentId: rootNode.nodeId
  }, context)
  values = {
    nodes: [childNode1, childNode2],
    fullRoot: { ...rootNode, subNodes: [childNode1, childNode2] },
    user: user
  }
})
afterAll(async () => {
  const res = await context.db.nodes?.deleteMany({ 'metadata.owner': auth.userId })
  console.log('cleanup deletedCount:', res?.deletedCount)
  db.close()
})
// afterEach(async () => {
//   const res = await context.db.nodes?.find({}).toArray()
//   console.log(res)

// })
test('NEW ROOT: should create and return a root node', async () => {
  // [ASSERT]
  // TODO: these can be better
  expect.assertions(7)

  expect(values.fullRoot.nodeId).toBeDefined()
  expect(values.fullRoot.completed).toBeDefined()
  expect(values.fullRoot.title).toBeDefined()
  expect(values.fullRoot.notes).toBeDefined()
  expect(values.fullRoot.rootNode).toBeDefined()
  expect(values.fullRoot.subNodes).toBeDefined()
  expect(values.fullRoot.completed).toBeDefined()
})
test('NEW CHILD: should create, attatch to parent and return a child node', async () => {
  // [ASSERT]
  // TODO: these can be better
  expect.assertions(14)
  expect(values.nodes[0].nodeId).toBeDefined()
  expect(values.nodes[0].completed).toBeDefined()
  expect(values.nodes[0].title).toBeDefined()
  expect(values.nodes[0].notes).toBeDefined()
  expect(values.nodes[0].rootNode).toBeDefined()
  expect(values.nodes[0].subNodes).toBeDefined()
  expect(values.nodes[0].completed).toBeDefined()
  expect(values.nodes[1].nodeId).toBeDefined()
  expect(values.nodes[1].completed).toBeDefined()
  expect(values.nodes[1].title).toBeDefined()
  expect(values.nodes[1].notes).toBeDefined()
  expect(values.nodes[1].rootNode).toBeDefined()
  expect(values.nodes[1].subNodes).toBeDefined()
  expect(values.nodes[1].completed).toBeDefined()
})

test('USER: should return users own Profile if authenticated', async () => {
  // [ACT]
  const user = await root.myProfile({}, context)
  // [ASSERT]
  expect.assertions(1)
  expect(user).toMatchObject<User>(values.user)
})

test('NODE: should return node by ID if authorized', async () => {
  // [ACT]
  const roots = await root.node({ nodeId: values.fullRoot.nodeId }, context)
  // [ASSERT] 
  expect.assertions(1)
  expect(roots).toMatchObject<ListNode>(values.fullRoot)
})

test('ROOTS: should return an authenticated users root nodes', async () => {
  // [ACT]
  const expectedRootWithChildren: ListNode = {
    ...values.fullRoot, subNodes: [values.nodes[0].nodeId, values.nodes[1].nodeId]
  }
  const myRoots = await root.rootNodes({}, context)
  // [ASSERT]
  expect.assertions(1)
  expect(myRoots).toMatchObject<ListNode[]>([expectedRootWithChildren])
})

test('(IN)COMPLETE: should mark a node as completed or incompleted and return it', async () => {
  // [ACT]
  const complete1 = await root.markNodeComplete({ nodeId: values.nodes[0].nodeId }, context)
  const complete2 = await root.markNodeComplete({ nodeId: values.nodes[1].nodeId }, context)
  const incomplete1 = await root.markNodeIncomplete({ nodeId: values.nodes[0].nodeId }, context)
  const incomplete2 = await root.markNodeIncomplete({ nodeId: values.nodes[1].nodeId }, context)
  // [ASSERT]
  // expect.assertions(4)
  expect(complete1).toHaveProperty('completed', true)
  expect(complete2).toHaveProperty('completed', true)
  expect(incomplete1).toHaveProperty('completed', false)
  expect(incomplete2).toHaveProperty('completed', false)
})
test('META READER: should return node with user added or removed as reader when appropriate', async () => {
  // [ACT]
  const added = await root.addReader({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  const removed = await root.removeReader({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  // [ASSERT]
  expect.assertions(2)
  expect(added).toHaveProperty('metadata.readers', [values.user.userId])
  expect(removed).toHaveProperty('metadata.readers', [])
})
test('META WRITER: should return node with user added or removed as writer when appropriate', async () => {
  // [ACT]
  const added = await root.addWriter({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  const removed = await root.removeWriter({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  // [ASSERT]
  expect.assertions(2)
  expect(added).toHaveProperty('metadata.writers', [values.user.userId])
  expect(removed).toHaveProperty('metadata.writers', [])
})

test('META ADMIN: should return node with user added or removed as admin when appropriate', async () => {
  // [ACT]
  const added = await root.addAdmin({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  const removed = await root.removeAdmin({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
  // [ASSERT]
  expect.assertions(2)
  expect(added).toHaveProperty('metadata.admins', [values.user.userId])
  expect(removed).toHaveProperty('metadata.admins', [])
})

test('DELETE: return a node that henceforth can not be found', async () => {
  // [ACT]
  const deleted = await root.deleteNode({ nodeId: values.nodes[1].nodeId }, context)
  if (deleted === undefined) {
    throw new Error('failed on delete')
  }
  const tryDeleted = root.node({ nodeId: deleted.nodeId }, context)
  // [ASSERT]
  expect.assertions(2)
  expect(deleted).toMatchObject<ListNode>(values.nodes[1])
  await expect(tryDeleted).rejects.toThrow(`Could not authorize read on nodeId:${deleted.nodeId}`)
})
test('TRANSFER OWNERSHIP: should return node with new OWNER', async () => {
  // [ARRANGE]
  const newOwner = { ...values.user, userId: uuid.v4() }
  const newOwnerContext = { ...context, auth: { ...context.auth, userId: newOwner.userId } }
  // [ACT]
  const postTransfer = await root.transferOwnership({ nodeId: values.fullRoot.nodeId, userId: newOwner.userId }, context)
  const newOwnerRoots = await root.rootNodes({}, newOwnerContext)
  // [ASSERT]
  expect.assertions(1)
  expect(postTransfer).toMatchObject<ListNode>(newOwnerRoots[0])
  await context.db.nodes?.deleteMany({ 'metadata.owner': newOwner.userId })

})
