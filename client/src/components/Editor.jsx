import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';

const Editor = ({ tasks, title }) => {
  return (
    <Droppable droppableId={title} isDropDisabled={tasks.length > 0}>
      {(provided, snapshot) => {
        return (
          <section className="editor">
            <ul
              className={`editor-list__list  
              ${snapshot.draggingFromThisWith ? 'task-list--drag-source' : ''}
              ${snapshot.draggingOverWith ? 'task-list--drag-destination' : ''}
              `}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2>{title}</h2>

              {tasks.length === 0 ? (
                <span className="hint editor__hint">
                  drop card here to edit
                </span>
              ) : null}

              {tasks.map((task, index) =>
                index === 0 ? (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <Task
                          task={task}
                          provided={provided}
                          snapshot={snapshot}
                          editable={true}
                        />
                      );
                    }}
                  </Draggable>
                ) : null
              )}
              {provided.placeholder}
              <AddTask
                state={`${tasks.length > 0 ? 'disabled' : ''}
              }`}
              />
              <DeleteTask
                state={`${tasks.length === 0 ? 'disabled' : ''}
              }`}
              />
            </ul>
          </section>
        );
      }}
    </Droppable>
  );
};

export default Editor;
