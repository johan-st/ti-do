import { Metadata } from './'

type NodeId = string

type ListNode = {
   nodeId: NodeId
   rootNode: boolean
   completed: boolean
   title: string
   notes: string
   subNodes: NodeId[]
   metadata: Metadata
};

type ListNodeInput = {
   rootNode: boolean
   title: string
   notes: string
};

export { ListNode, NodeId, ListNodeInput }