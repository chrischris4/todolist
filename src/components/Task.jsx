import '../styles/Task.css';
import React from 'react';

function Task() {
  return (
    <div className="task">
      <div className="taskContent">
        <h2>Nom</h2>
        <p>Description</p>
        <h3 className="taskCategory">Category</h3>
        <h3 className="taskPriority">Priority</h3>
        <div className="taskDate">
          <p>Fin le 10/10/10</p>
          <p>mis a jour le 10/10/10</p>
          <p>crée le 10/10/10</p>
        </div>
        <p className="taskCreator">Create by Name</p>
      </div>
    </div>
  );
}

export default Task;
