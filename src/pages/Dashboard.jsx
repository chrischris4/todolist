import Header from '../components/Header';
import Task from '../components/Task';
import '../styles/Dashboard.css';
import '../styles/Modal.css';
import React, { useState, useEffect } from 'react';
import { getUserName, createTask, getAllTask } from '../common';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'En attente',
    priority: 'Moyenne',
    endTime: '',
  });
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  /////////USER FETCH//////////////////////////////////
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

  /////////TASK FETCH//////////////////////////////////

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAllTask();
      if (!response.error) {
        setTasks(response.events.tasks || []);
      } else {
        console.error(response.message);
      }
    };

    fetchTasks();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskData({
      name: '',
      description: '',
      category: '',
      status: 'En attente',
      priority: 'Moyenne',
      endTime: '',
    });
    setMessage('');
  };

  ///////////////////TASK FORM CREATE///////////////////////////////

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSelection = (type, value) => {
    setTaskData({ ...taskData, [type]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask(taskData);
    if (response.error) {
      setMessage(`Erreur: ${response.message}`);
    } else {
      setMessage('Tâche créée avec succès!');
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <Header firstName={userInfo.firstName} lastName={userInfo.lastName} />
      <div className="dashboardContent">
        <div className="dashboardTitle">
          <h2>Retrouvez toutes vos tâches ici</h2>
          <button onClick={() => openModal('createTask')}>
            Crée une tâche
          </button>
        </div>
        <div className="tasks">
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </div>

      <div className={`modalOverlay ${showModal ? 'showModal' : ''}`}>
        <div className={`modal ${showModal ? 'showModal' : ''}`}>
          <span
            className="material-symbols-rounded modalClose"
            onClick={closeModal}
          >
            close
          </span>
          <div className="modalContent">
            {modalType === 'createTask' ? (
              <>
                <h2>Crée une tâche</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="taskName">Nom</label>
                  <input
                    type="text"
                    name="name"
                    id="taskName"
                    value={taskData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="taskDescription">Description</label>
                  <textarea
                    name="description"
                    id="taskDescription"
                    value={taskData.description}
                    onChange={handleChange}
                    required
                  />
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
                        className={`taskStatus ${taskData.status === status ? 'selected' : ''}`}
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
                        className={`taskPriority ${taskData.priority === priority ? 'selected' : ''}`}
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
                  <button type="submit">Créer la tâche</button>
                </form>
                {message && <p>{message}</p>}
              </>
            ) : (
              <>{/* Modal pour modifier la tâche */}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
