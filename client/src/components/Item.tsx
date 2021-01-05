import React from 'react'
import './Item.css'

type ItemProps = {
  item: Item,
  children?: never[]
}

function Item(props: ItemProps): JSX.Element {
  const { item } = props
  const date = new Date(item.created).toISOString()
  const completed = item.completed ? true : false
  return (
    <div className='item'>
      {item.text}
        created: {date}
      <div className="item--complete">{completed ? 'DONE' : ''}</div>
    </div>
  )
}

export default Item
