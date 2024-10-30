import Header from '../components/Header';
import '../styles/Home.css';
import '../styles/Modal.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../common';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === 'signup') {
      const result = await createUser(formData);
      if (!result.error) {
        const loginResult = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        if (!loginResult.error) {
          navigate('/Dashboard');
        } else {
          console.error(
            "Erreur lors de la connexion après l'inscription:",
            loginResult.message
          );
        }
      } else {
        console.error(
          "Erreur lors de la création de l'utilisateur:",
          result.message
        );
      }
    } else {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      if (!result.error) {
        navigate('/Dashboard');
      } else {
        console.error('Erreur lors de la connexion:', result.message);
      }
    }
    closeModal();
  };

  return (
    <div className="home">
      <Header />
      <div className={`modalOverlay ${showModal ? 'showModal' : ''}`}>
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
                <form onSubmit={handleSubmit}>
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button>Continuer</button>
                </form>
              </>
            ) : (
              <>
                <h2>Se connecter</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button>Se connecter</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="homeImgContainer">
        <div className="homeOverlay"></div>
        <img
          src="https://i.ibb.co/W00zZQY/todo.jpg"
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
