import React, { useContext } from 'react';
import { TASK_CHANGED } from '../reducer';
import { millisToString } from '../helpers';
import { GlobalContext } from '../GlobalContext';

const Task = ({ task, provided, snapshot, compact, editable }) => {
  const { dispatch } = useContext(GlobalContext);
  const onChangeHandler = e => {
    dispatch(TASK_CHANGED({ ...task, title: e.target.value }));
  };

  if (compact) {
    return (
      <li
        className={`card  
              ${snapshot.isDragging ? 'card--dragging' : ''}
              ${task.blocked ? 'card--blocked' : ''}
              ${compact ? 'card--compact' : ''}
              `}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <h2>
          {task.blocked ? (
            <span className="card__header-notice">blocked</span>
          ) : null}
          {task.title}
        </h2>
      </li>
    );
  }
  if (editable) {
    return (
      <li
        className={`card  
              ${snapshot.isDragging ? 'card--dragging' : ''}
              ${task.blocked ? 'card--blocked' : ''}
              `}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <h2>
          <input type="text" value={task.title} onChange={onChangeHandler} />
        </h2>
        {/* <p>id:{task.id}</p> */}
        {/* <p>{task.desc}</p> */}
        {task.blocked ? <p>:blocked:</p> : null}
        <p>created:{millisToString(task.created)}</p>
        {task.completed ? <p>done:{millisToString(task.completed)}</p> : null}
        <div>scheduled:{task.scheduled.length} times</div>
      </li>
    );
  }

  return (
    <li
      className={`card  
              ${snapshot.isDragging ? 'card--dragging' : ''}
              ${task.blocked ? 'card--blocked' : ''}
              `}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <h2>{task.title}</h2>
      {/* <p>id:{task.id}</p> */}
      {/* <p>{task.desc}</p> */}
      {task.blocked ? <p>:blocked:</p> : null}
      <p>created:{millisToString(task.created)}</p>
      {task.completed ? <p>done:{millisToString(task.completed)}</p> : null}
      <div>scheduled:{task.scheduled.length} times</div>
    </li>
  );
};

export default Task;

//   id: 'MAYBE ID',
//   title: 'STRING',
//   desc: 'STRING',
//   blocked: 'BOOLEAN',
//   created: 'DATE',
//   completed: 'DATE',
//   scheduled: 'LIST DATE',
