
type State = {
  lists: ListNode[]
  editor: ListNode | null
}

type ListNode = {
   nodeId: NodeId
   completed: boolean
   title: string
   notes?: string
   subNodes: ListNode[]
};


type NodeId = string

type Msg = { type: string, payload: unknown }
type Cmd = (a?:unknown ,b?:unknown ,c?:unknown, d?:unknown) => void
