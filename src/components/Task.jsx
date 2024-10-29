import '../styles/Task.css';
import React from 'react';

function Task({ task }) {
  const { name, description, category, priority, endTime, creator } = task;

  return (
    <div className="task">
      <div className="taskContent">
        <h2>{name}</h2>
        <p>{description}</p>
        <h3 className="taskCategory">Catégorie : {category}</h3>
        <h3 className="taskPriority">Priorité : {priority}</h3>
        <div className="taskDate">
          <p>Fin le : {new Date(endTime).toLocaleDateString()}</p>
        </div>
        <p className="taskCreator">Créé par : {creator}</p>
      </div>
    </div>
  );
}

export default Task;
