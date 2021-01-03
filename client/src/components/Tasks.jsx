import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Tasks = ({ tasks, title, compact }) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => {
        return (
          <section className={`task-list task-list--${title}`}>
            <h2>{title}</h2>
            <ul
              className={`task-list__list  
              ${snapshot.draggingFromThisWith ? 'task-list--drag-source' : ''}
              ${snapshot.draggingOverWith ? 'task-list--drag-destination' : ''}
              ${compact ? 'task-list--compact' : ''}
              `}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <Task
                        task={task}
                        provided={provided}
                        snapshot={snapshot}
                        compact={compact}
                      />
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </section>
        );
      }}
    </Droppable>
  );
};

export default Tasks;
