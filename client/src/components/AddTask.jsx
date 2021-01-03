import React, { useContext } from 'react';
import { TASK_ADDED } from '../reducer';
import { GlobalContext } from '../GlobalContext';
import { createTask } from '../http';

const AddTask = ({ state }) => {
  const onSubmitHandler = e => {
    e.preventDefault();
    createTask('new task', res => {
      dispatch(TASK_ADDED(res));
    });
  };
  const formClass = 'add-task';
  const buttonClass = `button add-task__button ${
    state ? 'add-task__button--' + state : ''
  }`;
  const { dispatch } = useContext(GlobalContext);
  return (
    <form className={formClass} onSubmit={onSubmitHandler}>
      <button className={buttonClass}>add new task</button>
    </form>
  );
};

export default AddTask;
