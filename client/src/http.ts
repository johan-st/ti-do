import { Dispatch } from 'react'
import { ACTIONS } from './reducer'

const http = {
  fetchAll: (dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:3001/gql',
      {method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: '{  myProfile{    fullName    userId  }}'
          // operationName: '...',
          // variables: { 'myVariable': 'someValue' }
        })
      })
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        console.log(json.data)
        if
        dispatch(ACTIONS.GOT_ITEMS(json.data))
      })
      .catch(err => console.error(err))
  },
  createItem : (title: string, dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:3001/gql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
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
