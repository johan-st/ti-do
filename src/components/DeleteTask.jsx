import React, { useContext } from 'react';
import { DELETE_TASK } from '../reducer';
import { GlobalContext } from '../GlobalContext';

const DeleteTask = ({ state }) => {
  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(DELETE_TASK());
  };
  const formClass = 'add-task';
  const buttonClass = `button add-task__button ${
    state ? 'add-task__button--' + state : ''
  }`;
  const { dispatch } = useContext(GlobalContext);
  return (
    <form className={formClass} onSubmit={onSubmitHandler}>
      <button className={buttonClass}>DELETE</button>
    </form>
  );
};

export default DeleteTask;
