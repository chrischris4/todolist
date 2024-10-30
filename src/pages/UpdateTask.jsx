import React, { useState, useEffect } from 'react';
import { getTaskById, updateTask, getAllUsers, getUserName } from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/UpdateTask.css';
import Nav from '../components/Nav';

function UpdateTask() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
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
  const { id } = useParams();
  console.log('ID récupéré :', id);

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

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await getTaskById(id);
      if (!response.error) {
        setTaskData(response.task);
      } else {
        console.error(response.message);
      }
    };
    fetchTaskData();
  }, [id]);

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

  const handleUpdateTask = async (taskId, updatedTaskData) => {
    const response = await updateTask(taskId, updatedTaskData);
    if (!response.error) {
      setTaskData((prevTaskData) => ({
        ...prevTaskData,
        ...updatedTaskData,
      }));
      console.log('Tâche mise à jour avec succès');
      setMessage('Tâche mise à jour avec succès!');
    } else {
      console.error(
        'Erreur lors de la mise à jour de la tâche:',
        response.message
      );
      setMessage(`Erreur: ${response.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateTask(id, taskData);
    navigate('/Dashboard');
  };

  return (
    <div className="updateTask">
      <Header firstName={userInfo.firstName} lastName={userInfo.lastName} />
      <div className="updateTaskContent">
        <h2>Mettre à jour la tâche</h2>
        <form className="updateTaskForm" onSubmit={handleSubmit}>
          <div className="updateTaskFormPart">
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
          <div className="updateTaskFormPart">
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
                  className={`taskStatusOption ${
                    taskData.status === status ? 'selected' : ''
                  }`}
                  onClick={() => handleSelection('status', status)}
                >
                  {status}
                </div>
              ))}
            </div>
          </div>
          <button className="formBtn" type="submit">
            Mettre à jour
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Nav />
    </div>
  );
}

export default UpdateTask;
