type User =
   {
      id: UserId
      name: UseName
      email?: Email
   }
type ListNode = {
   id: NodeId
   subNodes: ListNode[] | null
   metadata: Metadata
}

type Metadata = {
   owner: UserId
   readers: UserId[] | null
   writers: UserId[] | null
   admins: UserId[] | null
}

type UserId = string
type NodeId = string
type Email = string
type UserName = string
