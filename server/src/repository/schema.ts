import { buildSchema } from 'graphql'

export const schema = buildSchema(`
type User 
   {
      id: String!
      name: String!
      email: String
   }
type ListNode
 {
   id: String!
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

// scalar UserId
// scalar NodeId
// scalar Email
// scalar UserName

