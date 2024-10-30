import '../styles/Task.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Task({ task }) {
  const navigate = useNavigate();

  const openUpdateTaskPage = () => {
    navigate(`/UpdateTask/${task._id}`);
  };

  const {
    name,
    description,
    category,
    priority,
    endTime,
    userId,
    creationTime,
    updateTime,
  } = task;
  const priorityClass = `priority-${priority.toLowerCase()}`;

  return (
    <div className="task">
      <div className="taskContent">
        <div className="taskTitle">
          <div className={`taskPriority ${priorityClass}`}></div>
          <h2>{name}</h2>
        </div>
        <p>{description}</p>
        <h3 className="taskCategory">{category}</h3>
        <div className="taskDates">
          <div className="taskDate">
            <p>Crée le :</p>
            <p> {new Date(creationTime).toLocaleDateString()}</p>
          </div>
          <div className="taskDate middleTaskDate">
            <p>Màj le : </p>
            <p>{new Date(updateTime).toLocaleDateString()}</p>
          </div>
          <div className="taskDate">
            <p>Fin le : </p>
            <p>{new Date(endTime).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="taskCreator">
          <p>Créé par :</p>
          <p> {userId}</p>
        </div>
        <div onClick={openUpdateTaskPage} className="updateTaskIcon">
          <span className="material-symbols-rounded editIcon">edit_square</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
