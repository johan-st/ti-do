import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext';
import { fetchAll } from '../http';
import Tasks from './Tasks';
import Editor from './Editor';
import AddTask from './AddTask';
import { GOT_TASKS } from '../reducer';

const Planing = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchAll(res => {
      dispatch(GOT_TASKS(res));
    });
  }, [dispatch]);
  return (
    <div className="planner">
      <Editor tasks={state.editor} title="editor" />
      <section className="planner__task-board">
        <Tasks tasks={state.backlog} title="backlog" compact={true} />
        <Tasks tasks={state.today} title="today" />
      </section>
      <Link className="CTA" to="/users">
        Get Going
      </Link>
    </div>
  );
};

export default Planing;
