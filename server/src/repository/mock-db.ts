import { User, Email, ListNode, UserId, NodeId } from '../types'

export class MockDataWrapper {
  constructor() {
    console.log('using MOCK database')
  }
  async userByEmail(email: Email): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find((u) => { u.email === email })
      if (user) {
        resolve(user)
      } else { reject() }
    })
  }
  async userById(id: UserId): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find((u) => { u.userId === id })
      if (user) {
        resolve(user)
      } else { reject() }
    })
  }
  async nodeById(id: NodeId): Promise<ListNode> {
    return new Promise((resolve, reject) => {
      const user = mockNodes.find((n) => { n.nodeId === id })
      if (user) {
        resolve(user)
      } else { reject() }
    })
  }
  async rootsByOwner(ownerId: UserId): Promise<ListNode[]> {
    return new Promise((resolve, reject) => {
      const nodes = mockNodes.filter((n) => { n.nodeId === ownerId })
      if (nodes) {
        resolve(nodes)
      } else { reject() }
    })
  }
  async addListNode(listNode: ListNode): Promise<ListNode | undefined> {
    return new Promise((resolve) => {
      mockNodes.push(listNode)
      resolve(listNode)
    })
  }
  async updateListNode(listNode: ListNode): Promise<ListNode | undefined> {
    return new Promise((resolve) => {
      const index = mockNodes.findIndex(n => n.nodeId === listNode.nodeId)
      mockNodes[index] = listNode
      resolve(listNode)
    })
  }
  close(): void {
    console.log('Close called on mock database')
  }
}

// MOCK DATA
const mockUsers: User[] = [{
  userId: 'dc79214a-25f5-441c-a527-02a2ba38c4f4',
  fullName: 'Johan Strand',
  email: 'johan@styldesign.se',
  passwordHash: '72d0585274e2780a551e154eef8217121cf3b35ef2bd65efc9695580fdc51695576ba38f5846d039fbfa97994e0f56b048466d073e52a3c169fee63844e0c00d',
  hashType: 'SHA512',
  hashSalt: 'rYFmMHFM3oCWMETL',
  tagline: 'first man on the baloon',
  avatar: 'https://avatars.dicebear.com/4.1/api/avataaars/jayMan.svg'
}]
const mockNodes: ListNode[] = []