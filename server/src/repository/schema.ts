import { buildSchema } from 'graphql'

export const schema = buildSchema(`
type Query {
  user(userId: String!): User
  node(nodeId:String!):ListNode
  rootNodes(userId:String!):[ListNode]

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
  subNodes: [String!]
  metadata: Metadata!
  }

type Metadata 
 {
  owner: String!
  readers: [String!]
  writers: [String!]
  admins: [String!]
  }
`)