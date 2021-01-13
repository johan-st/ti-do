const listPlaceholder: ListNode[] = 
   [
     {
       nodeId: '7ff0dfc4-89bf-413d-b8f7-1e0e8f0fcd00',
       title: 'Task 1',
       completed:false,
       active:false,
       subNodes:[
         {
           nodeId: 'd4ff5bdd-f6e4-47e7-847f-ae77903adf1d',
           title: 'SubTask 1a',
           completed:false,
           active:false,
           subNodes:[]
         },{
           nodeId: 'd4ff5bdd-f6e4-47e7-847f-ae77903adf1e',
           title: 'SubTask 1b',
           completed:true,
           active:false,
           subNodes:[]
         }]
     },
     {
       nodeId: 'd4ff5bdd-f6e4-47e7-847f-ae77903adf1c',
       title: 'Task 2',
       completed:false,
       active:false,
       subNodes:[]
     },
     
   ]

export { listPlaceholder }
