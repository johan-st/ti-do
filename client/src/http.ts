import { Dispatch } from 'react'
import { ACTIONS } from './reducer'
import {ListNodeArraySchema} from './Joi'


const  http = {
  fetchRoots:  (dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:3001/gql',
      {method:'POST',
        headers: { 'Content-Type': 'application/json' },
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
              dispatch(ACTIONS.GOT_ITEMS(json.data.rootNodes))
            })
            .catch(err=>{console.error(err)}
            )}
        else {
          http.createNode('my tidos', dispatch)        }
      })
      .catch(err => console.error(err))
  },
  createNode : (title: string, dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:3001/gql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mutation: `{
        createRootNode(listNode:{title:$title}) {
          nodeId
          title
          notes
          subNodes{
            nodeId
          }`,
        variables:{title}}),
    })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        dispatch(ACTIONS.ITEM_ADDED(json))
      })
      .catch(err => console.error(err))
  }
}
export { http }
