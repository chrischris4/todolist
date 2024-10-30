import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/Dashboard'} element={<Dashboard />} />
        <Route path={'/CreateTask'} element={<CreateTask />} />
        <Route path={'/UpdateTask/:taskId'} element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
