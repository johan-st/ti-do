import { Metadata } from './'


export type ListNode = {
   nodeId: NodeId
   rootNode: boolean
   subNodes: NodeId[]
   metadata: Metadata
};

export type NodeId = string