import React, { useContext } from 'react'
import { TASK_ADDED } from '../reducer'
import { GlobalContext } from '../GlobalContext'
import { createItem } from '../http'

type BtnProps =
  {
    btnState: string
  }
const AddItem = (props: BtnProps): JSX.Element => {
  const { dispatch } = useContext(GlobalContext)
  const onSubmitHandler = (e: Event) => {
    e.preventDefault()
    createItem('new item', res => {
      dispatch(TASK_ADDED(res))
    })
  }
  const formClass = 'add-task'
  const buttonClass = `button add-task__button ${props.btnState ? 'add-task__button--' + props.btnState : ''}`
  return (
    <form className={formClass} onSubmit={onSubmitHandler}>
      <button className={buttonClass}>add new task</button>
    </form>
  )
}

export default AddItem
