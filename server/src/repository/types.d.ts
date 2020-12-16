type User =
   {
      id: UserId
      name: UseName
      email?: Email
   }
type ListNode = {
   id: NodeId
   subNodes: ListNode[]
   metadata: Metadata
}

type Metadata = {
   owner: UserID
   readers: UserID[]
   writers: UserID[]
   admins: UserID[]
}

type UserId = string
type NodeId = string
type Email = string
type UserName = string
