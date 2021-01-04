import React, { useContext } from 'react'
import { actions } from '../reducer'
import { GlobalContext } from '../GlobalContext'

const DeleteTask = ({ state }) => {
  const { dispatch } = useContext(GlobalContext)
  const onSubmitHandler = e => {
    e.preventDefault()
    dispatch(actions.DELETE_TASK())
  }
  const formClass = 'add-task'
  const buttonClass = `button add-task__button ${state ? 'add-task__button--' + state : ''
    }`
  return (
    <form className={formClass} onSubmit={onSubmitHandler}>
      <button className={buttonClass}>DELETE</button>
    </form>
  )
}

export default DeleteTask
