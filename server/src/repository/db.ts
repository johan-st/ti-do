
import * as mongo from 'mongodb'
import { User, Email, ListNode, UserId, NodeId } from '../types'
const MongoClient = mongo.MongoClient
const mongoUser = process.env.MONGO_USER || ''
const mongoPass = process.env.MONGO_PW || ''
const url = 'mongodb+srv://cluster0.nq5ro.mongodb.net/'
const options: mongo.MongoClientOptions = {
  appname: 'ti-do',
  authSource: 'admin',
  wtimeout: 2000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: mongoUser,
    password: mongoPass
  }
}

export class DataWrapper {
  private static url: string = url
  client: mongo.MongoClient
  users: mongo.Collection | undefined
  nodes: mongo.Collection | undefined
  options: mongo.MongoClientOptions
  constructor() {
    this.options = options
    this.client = new MongoClient(DataWrapper.url, this.options)
  }
  async connect(): Promise<void> {
    return this.client.connect()
      .then(() => {
        console.log('mongo connected')
        this.users = this.client.db('tido').collection('users')
        this.nodes = this.client.db('tido').collection('nodes')
      })
  }
  async userByEmail(email: Email): Promise<User> {
    const user = await this.users?.findOne({ email })
    return user
  }
  async userById(userId: UserId): Promise<User> {
    const user = await this.users?.findOne({ userId: userId })
    return user
  }
  async nodeById(nodeId: NodeId): Promise<ListNode> {
    const list = await this.nodes?.findOne({ nodeId: nodeId })
    return list
  }
  async rootsByOwner(ownerId: UserId): Promise<ListNode[]> {
    const listNodes = await this.nodes?.find({ rootNode: true, 'metadata.owner': ownerId }).toArray()
    // TODO: row below ok?
    return (listNodes as ListNode[])
  }
  async addListNode(listNode: ListNode): Promise<ListNode> {
    const r = await this.nodes?.insertOne(listNode)
    if (r?.result.ok) {
      return listNode
    }
    throw new Error('Could not add node')
  }
  async updateListNode(listNode: ListNode): Promise<ListNode> {
    const r = await this.nodes?.replaceOne({ nodeId: listNode.nodeId }, listNode)
    if (r) {
      return listNode
    }
    throw new Error('Could not update node')
  }
  async deleteNode(nodeId: NodeId): Promise<boolean> {
    const r = await this.nodes?.findOneAndDelete({ nodeId })
    return r?.ok ? true : false
  }

  close(): void {
    this.client.close()
  }
}
