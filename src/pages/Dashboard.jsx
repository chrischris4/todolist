import Header from '../components/Header';
import Task from '../components/Task';
import '../styles/Dashboard.css';
import '../styles/Modal.css';
import React from 'react';
import { useState } from 'react';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboardContent">
        <div className="dashboardTitle">
          {' '}
          <h2>Retrouvez toutes vos tâches ici</h2>
          <button onClick={() => openModal('createTask')}>
            Ajouter une tâche{' '}
          </button>
        </div>
        <div className="tasks">
          <Task />
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
                <form>
                  <label htmlFor="">Nom</label>
                  <input type="text" name="taskName" id="taskName" />
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    name="taskDescription"
                    id="taskDescription"
                  />
                  <label htmlFor="">Catégorie</label>
                  <input type="" name="taskCategory" id="taskCategory" />
                  <label htmlFor="">Statut</label>
                  <input type="" name="taskStatut" id="taskStatut" />
                  <label htmlFor="">Date de fin</label>
                  <input type="" name="taskEndTime" id="taskEndTime" />
                  <button>Continuer</button>
                </form>
              </>
            ) : (
              <>
                <h2>Modifier une tâche</h2>
                <form>
                  <label htmlFor="">Nom</label>
                  <input type="text" name="taskName" id="taskName" />
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    name="taskDescription"
                    id="taskDescription"
                  />
                  <label htmlFor="">Catégorie</label>
                  <input type="" name="taskCategory" id="taskCategory" />
                  <label htmlFor="">Statut</label>
                  <input type="" name="taskStatut" id="taskStatut" />
                  <label htmlFor="">Date de fin</label>
                  <input type="" name="taskEndTime" id="taskEndTime" />
                  <button>Continuer</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
