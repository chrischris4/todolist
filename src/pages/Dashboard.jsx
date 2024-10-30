import Header from '../components/Header';
import Task from '../components/Task';
import '../styles/Dashboard.css';
import '../styles/Modal.css';
import React, { useState, useEffect } from 'react';
import { getUserName, getAllTask } from '../common';
import Nav from '../components/Nav';

function Dashboard() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });

  const [tasks, setTasks] = useState([]);

  ////////////////////USER INFO//////////////////////////

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await getUserName();
      if (!userData.error) {
        setUserInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      }
    };
    fetchUserInfo();
  }, []);

  ///////////////////////GET TASK//////////////////////////

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAllTask();
      if (!response.error) {
        setTasks(response.tasks || []);
      } else {
        console.error(response.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <Header firstName={userInfo.firstName} lastName={userInfo.lastName} />
      <div className="dashboardContent">
        <h2>Retrouvez toutes vos tâches ici</h2>

        <div className="tasks">
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </div>

      <Nav />
    </div>
  );
}

export default Dashboard;
