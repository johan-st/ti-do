import { buildSchema } from 'graphql'

export const schema = buildSchema(`
type Query {
  user(userId: String!): User
  node(nodeId:String!):ListNode
  rootNodes(userId:String!):[ListNode]
}
type Mutation {
  createListNode(listNode: ListNodeInput!):ListNode
}
type User 
{
  userId: String!
  fullName: String!
  email: String!
  passwordHash: String!
  hashSalt: String!
  tagline: String!
  avatar: String!
}

type ListNode
 {
  nodeId: String!
  rootNode: Boolean!
  completed: Boolean!
  title: String!
  notes: String
  subNodes: [String!]
  metadata: Metadata!
  }
input ListNodeInput 
 {
  rootNode: Boolean!
  title: String!
  notes: String
  }
type Metadata 
 {
  owner: String!
  readers: [String!]
  writers: [String!]
  admins: [String!]
  }
`)