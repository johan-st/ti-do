import { Dispatch } from 'react'
import { Msg } from './reducer'
import { ListNodeArraySchema } from './Joi'


const  Cmd = {
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
          Cmd.createNode('my tidos',true, dispatch)}
      })
      .catch(err => console.error(err))
  },
  createNode : (title: string, isRoot:boolean ,dispatch: Dispatch<Msg>):void => {
    const body = 
    isRoot
      ? JSON.stringify(
        { query: 'mutation createRootNode($title:String!) {  createRootNode(listNode:{title:$title}) { nodeId title notes subNodes{ nodeId }  } }',
          variables: {title}})
      : JSON.stringify(
        { query: 'mutation createChildNode($title:String!) {  createChildNode(listNode:{title:$title}) { nodeId title notes subNodes{ nodeId }  } }',
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
        dispatch(Msg.ITEM_ADDED(json, null))
      })
      .catch(err => console.error(err))
  }
}
export { Cmd }
