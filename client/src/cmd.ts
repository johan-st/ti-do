import { Dispatch } from 'react'
import { Msg } from './reducer'
import { ListNodeArraySchema } from './Joi'


const  CMD = {
  fetchRoots:  (dispatch: Dispatch<Msg>):void => {
    fetch('http://localhost:3001/gql',
      {method:'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          query: `{
          rootNodes {
            nodeId
            title
            notes
            completed
            subNodes {
              nodeId
              title
              notes
              completed
            }
          }
        }`
        })
      })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        if (json.data.rootNodes?.length !== 0){
          ListNodeArraySchema.validateAsync(json.data?.rootNodes)
            .then(() =>{
              dispatch(Msg.GOT_ITEMS(json.data.rootNodes))
            })
            .catch(err=>{console.error(err)}
            )}
        else {
          CMD.createNode('my tidos',true, dispatch)}
      })
      .catch(err => console.error(err))
  },
  createNode : (title: string, isRoot:boolean ,dispatch: Dispatch<Msg>):void => {
    const body = 
    isRoot
      ? JSON.stringify(
        { query: 'mutation ($title:String!) {  createRootNode(listNode:{title:$title}) { nodeId title notes subNodes{ nodeId }  } }',
          variables: {title}})
      : JSON.stringify(
        { query: 'mutation ($title:String!) {  createChildNode(listNode:{title:$title}) { nodeId title notes subNodes{ nodeId }  } }',
          variables: {title}})

    fetch('http://localhost:3001/gql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },      
      body
    })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        if (json.errors) {
          throw new Error(json)
          
        }
        console.log('################',json)
        if(json.data.createRootNode){
          dispatch(Msg.ITEM_ADDED(json.data.createRootNode, null))
        } else {
          dispatch(Msg.ITEM_ADDED(json.data.createChildNode, null))
        }
      })
      .catch(err => console.error(err))
  },
  toggleDone : (node:ListNode ,dispatch: Dispatch<Msg>):void => {
    console.log(node)
    dispatch(Msg.ITEM_CHANGED({...node, completed: !node.completed}))

    let body:string
    if (node.completed) {
      body =  JSON.stringify(
        { query: 'mutation ($nodeId:String!) {markNodeIncomplete(nodeId:$nodeId) { nodeId title notes subNodes{ nodeId }}}',
          variables: {nodeId: node.nodeId}})

    } else {
      body =  JSON.stringify(
        { query: `mutation done($nodeId:String!) {
          markNodeComplete(nodeId:$nodeId) { 
            nodeId 
            title 
            notes 
            subNodes{ 
              nodeId 
            }}}`,
        variables: {nodeId: node.nodeId}})
    }
    console.log(body)
    
    fetch('http://localhost:3001/gql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },      
      body
    })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        if (json.errors) {
          throw new Error(json)
        }
        dispatch(Msg.ITEM_CHANGED(json))
      })
      .catch(err => console.error(err))
  },
  updateNode : (newNode:ListNode ,dispatch: Dispatch<Msg>):void => {
    const body =  JSON.stringify(
      { query: 'mutation ($node:String!) {  updateNode(node:{node:$node}) { nodeId title notes subNodes{ nodeId }  } }',
        variables: {newNode}})

    fetch('http://localhost:3001/gql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },      
      body
    })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        if (json.errors) {
          throw new Error(json)
          
        }
        dispatch(Msg.ITEM_ADDED(json, null))
      })
      .catch(err => console.error(err))
  }
}
export { CMD  }
