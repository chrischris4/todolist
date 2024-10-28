import Header from '../components/Header';
import '../styles/Home.css';
import '../styles/Modal.css';
import React from 'react';
import { useState } from 'react';

function Home() {
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
    <div className="home">
      <Header />
      <div className={`modal ${showModal ? 'showModal' : ''}`}>
        <span
          className="material-symbols-rounded modalClose"
          onClick={closeModal}
        >
          close
        </span>
        <div className="modalContent">
          {modalType === 'signup' ? (
            <>
              <h2>Crée un compte</h2>
              <form>
                <label htmlFor="">Nom</label>
                <input type="text" name="lastName" id="lastName" />
                <label htmlFor="">Prénom</label>
                <input type="text" name="firstName" id="firstName" />
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="">Mot de passe</label>
                <input type="password" name="password" id="password" />
                <button>Continuer</button>
              </form>
            </>
          ) : (
            <>
              <h2>Se connecter</h2>
              <form>
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="">Mot de passe</label>
                <input type="password" name="password" id="password" />
                <button>Se connecter</button>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="homeImgContainer">
        <div className="homeOverlay"></div>
        <img
          src="https://i.ibb.co/DLyDM81/agenda.jpg"
          alt=""
          className="homeImg"
        />
      </div>
      <div className="homeAbout">
        <h2>Une organisation facile et rapide</h2>
        <h3>Rejoignez Todolist !</h3>
        <div className="homeBtns">
          <button onClick={() => openModal('signup')}>Crée un compte</button>
          <button onClick={() => openModal('login')}>Se connecter</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
