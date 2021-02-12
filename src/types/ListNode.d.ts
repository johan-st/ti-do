import { Metadata } from './'

type NodeId = string

type ListNode = {
   nodeId: NodeId
   rootNode: boolean
   completed: boolean
   title: string
   notes?: string
   subNodes: (string | ListNode)[]
   metadata: Metadata
};


type ListNodeInput = {
   title: string
   notes?: string
};

export { ListNode, NodeId, ListNodeInput }