import '../styles/Task.css';
import React from 'react';

function Task() {
  return (
    <div className="task">
      <div className="taskContent">
        <h2>Nom</h2>
        <p>Description</p>
        <h3>Category</h3>
        <h3>Priority</h3>
        <p> date max, date création, date update</p>
      </div>
    </div>
  );
}

export default Task;
