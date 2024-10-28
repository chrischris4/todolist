import Header from '../components/Header';
import Task from '../components/Task';
import '../styles/Dashboard.css';
import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="tasks">
        <Task />
      </div>
    </div>
  );
}

export default Dashboard;
