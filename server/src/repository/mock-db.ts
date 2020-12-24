import { GraphQLError } from 'graphql'
import { User, Email, ListNode, UserId, NodeId } from '../types'

import * as mongo from 'mongodb'
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
export class MockDataWrapper {
  private static url: string = url
  client: mongo.MongoClient
  users: mongo.Collection | undefined
  nodes: mongo.Collection | undefined
  options: mongo.MongoClientOptions
  constructor() {
    this.options = options
    this.client = new MongoClient(MockDataWrapper.url, this.options)
  }
  async connect(): Promise<void> {
    return new Promise((resolve) => {
      resolve()
    })
  }
  async userByEmail(email: Email): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find((u) => { u.email === email })
      if (user) {
        resolve(user)
      } else { reject(new GraphQLError('failed to get user by email')) }
    })
  }
  async userById(userId: UserId): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find((u) => u.userId === userId)
      if (user) {
        resolve(user)
      } else { reject(new GraphQLError('failed to get user by userId')) }
    })
  }
  async nodeById(nodeId: NodeId): Promise<ListNode> {
    return new Promise((resolve, reject) => {
      const node = mockNodes.find((n) => n.nodeId === nodeId)
      if (node) {
        resolve(node)
      } else {
        reject(new GraphQLError('failed to get node by nodeId'))
      }
    })
  }
  async rootsByOwner(ownerId: UserId): Promise<ListNode[]> {
    return new Promise((resolve, reject) => {
      const nodes = mockNodes.filter((n) => n.rootNode && n.metadata.owner === ownerId)
      if (nodes) {
        resolve(nodes)
      } else { reject(('rootsByOwner rejected')) }
    })
  }
  async addListNode(listNode: ListNode): Promise<ListNode> {
    return new Promise((resolve) => {
      mockNodes.push(listNode)
      resolve(this.nodeById(listNode.nodeId))
    })
  }
  async updateListNode(listNode: ListNode): Promise<ListNode> {
    return new Promise((resolve) => {
      const index = mockNodes.findIndex(n => n.nodeId === listNode.nodeId)
      mockNodes[index] = listNode
      resolve(this.nodeById(listNode.nodeId))
    })
  }
  deleteNode(nodeId: NodeId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = mockNodes.findIndex(n => n.nodeId === nodeId)
      if (index) {
        mockNodes.splice(index, 1)
        resolve(true)
      } else { reject(new GraphQLError('could not remove node')) }
    })
  }

  close(): void {
    console.log('close() called on MOCK dataWrapper')
  }
}

// MOCK DATA
export const mockUsers: User[] = [{
  userId: '12345678-1234-1234-1234-123456789abc',
  fullName: 'Johan Strand',
  email: 'johan@styldesign.se',
  passwordHash: '72d0585274e2780a551e154eef8217121cf3b35ef2bd65efc9695580fdc51695576ba38f5846d039fbfa97994e0f56b048466d073e52a3c169fee63844e0c00d',
  hashType: 'SHA512',
  hashSalt: 'rYFmMHFM3oCWMETL',
  tagline: 'first man on the baloon',
  avatar: 'https://avatars.dicebear.com/4.1/api/avataaars/jayMan.svg'
}]

const mockNodes: ListNode[] = []