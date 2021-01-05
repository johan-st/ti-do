import { Dispatch } from 'react'
import { ACTIONS } from './reducer'

const http = {
  fetchAll: (dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:5000/api/tasks')
      .then(raw => {
        return raw.json()
      })
      .then(json => {
        dispatch(ACTIONS.GOT_ITEMS(json))
      })
      .catch(err => console.error(err))
  },
  createItem : (title: string, dispatch: Dispatch<Action>):void => {
    fetch('http://localhost:5000/api/tasks', {
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
