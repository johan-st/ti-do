import { Metadata } from './'


export type ListNode = {
   nodeId: NodeId
   rootNode: boolean
   completed: boolean
   title: string
   notes: string
   subNodes: NodeId[]
   metadata: Metadata
};

export type NodeId = string