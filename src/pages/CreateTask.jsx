import React, { useState, useEffect } from 'react';
import { createTask, getAllUsers } from '../common';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/CreateTask.css';
import { getUserName } from '../common';
import Nav from '../components/Nav';

function CreateTask() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });

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

  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'En attente',
    priority: 'Moyenne',
    endTime: '',
    userConcerned: [],
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  /////////////////////////GET USER FOR FORM///////////////////////////////////
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (!response.error) {
        setUsers(response.users);
      } else {
        console.error(response.message);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSelection = (type, value) => {
    setTaskData({ ...taskData, [type]: value });
  };

  const handleUserSelect = (e) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTaskData({ ...taskData, userConcerned: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask(taskData);
    if (response.error) {
      setMessage(`Erreur: ${response.message}`);
    } else {
      setMessage('Tâche créée avec succès!');
      navigate('/Dashboard');
    }
  };

  return (
    <div className="createTask">
      <Header firstName={userInfo.firstName} lastName={userInfo.lastName} />
      <div className="createTaskContent">
        <h2>Crée une tâche</h2>
        <form className="createTaskForm" onSubmit={handleSubmit}>
          <div className="createTaskFormPart">
            <label htmlFor="taskName">Nom</label>
            <input
              type="text"
              name="name"
              id="taskName"
              value={taskData.name}
              onChange={handleChange}
              required
            />
            <label>Utilisateurs concernés</label>
            <select
              multiple
              value={taskData.userConcerned}
              onChange={handleUserSelect}
            >
              <option value="">Aucun utilisateur</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            <label htmlFor="taskDescription">Description</label>
            <textarea
              name="description"
              id="taskDescription"
              value={taskData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="createTaskFormPart">
            <label htmlFor="taskCategory">Catégorie</label>
            <input
              type="text"
              name="category"
              id="taskCategory"
              value={taskData.category}
              onChange={handleChange}
            />
            <label>Statut</label>
            <div className="taskStatusOptions">
              {['En attente', 'En cours', 'Fini'].map((status) => (
                <div
                  key={status}
                  className={`taskStatusOption ${taskData.status === status ? 'selected' : ''}`}
                  onClick={() => handleSelection('status', status)}
                >
                  {status}
                </div>
              ))}
            </div>

            <label>Priorité</label>
            <div className="taskPriorityOptions">
              {['Basse', 'Moyenne', 'Haute'].map((priority) => (
                <div
                  key={priority}
                  className={`taskPriorityOption ${taskData.priority === priority ? 'selected' : ''}`}
                  onClick={() => handleSelection('priority', priority)}
                >
                  {priority}
                </div>
              ))}
            </div>

            <label htmlFor="taskEndTime">Date de fin</label>
            <input
              type="date"
              name="endTime"
              id="taskEndTime"
              value={taskData.endTime}
              onChange={handleChange}
            />
          </div>
          <button className="formBtn" type="submit">
            Créer la tâche
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Nav />
    </div>
  );
}

export default CreateTask;
