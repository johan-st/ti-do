
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
  lists: mongo.Collection | undefined
  options: mongo.MongoClientOptions
  constructor() {
    this.options = options
    this.client = new MongoClient(DataWrapper.url, this.options)
    this.client.connect()
      .then(() => {
        console.log('mongo connected')
        this.users = this.client.db('tido').collection('users')
        this.lists = this.client.db('tido').collection('lists')
      })
      .catch(err => console.dir(err))
  }

  async userByEmail(email: Email): Promise<User> {
    const user = await this.users?.findOne({ email })
    return user
  }
  async userById(nodeId: UserId): Promise<User> {
    const user = await this.users?.findOne({ userId: nodeId })
    return user
  }
  async nodeById(nodeId: NodeId): Promise<ListNode> {
    console.log(10)
    const list = await this.lists?.findOne({ nodeId: nodeId })
    console.log(list)
    return list
  }
  async rootsByOwner(ownerId: UserId): Promise<ListNode[]> {
    const listNodes = await this.lists?.find({ rootNode: true, 'metadata.owner': ownerId }).toArray()
    // TODO: row below ok?
    return (listNodes as ListNode[])
  }
  async addListNode(listNode: ListNode): Promise<ListNode> {
    const r = await this.lists?.insertOne(listNode)
    if (r?.result.ok) {
      return listNode
    }
    throw new Error('Could not add node')
  }
  async updateListNode(listNode: ListNode): Promise<ListNode> {
    const r = await this.lists?.findOneAndUpdate({ nodeId: listNode.nodeId }, listNode)
    console.log(r)
    if (r) {
      return listNode
    }
    throw new Error('Could not update node')
  }
  deleteNode(nodeId: NodeId): void {
    this.lists?.findOneAndDelete({ nodeId })
  }
  close(): void {
    this.client.close()
  }
}
