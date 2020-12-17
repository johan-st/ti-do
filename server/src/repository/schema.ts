import { buildSchema } from 'graphql'

export const schema = buildSchema(`
type Query {
  user(email: String! hash: String!): User
  rootLists(userId:String!):[ListNode]
}
type User 
  {
  id: String!
  name: String!
  hash: String!
  email: String!
  }
   
type ListNode
 {
  id: String!
  rootNode: Boolean!
  subNodes: [ListNode!]
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


