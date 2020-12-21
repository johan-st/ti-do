import { Metadata } from './'

type NodeId = string

type ListNode = {
   nodeId: NodeId
   rootNode: boolean
   completed: boolean
   title: string
   notes?: string
   subNodes: ListNode[] | string[]
   metadata: Metadata
};


type ListNodeInput = {
   title: string
   notes?: string
};

export { ListNode, NodeId, ListNodeInput }