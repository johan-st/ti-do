
type State = {
  lists: ListNode[]
}

type ListNode = {
   nodeId: NodeId
   completed: boolean
   title: string
   notes?: string
   subNodes: ListNode[]
};


type NodeId = string

type Action = { type: string, payload: unknown }
