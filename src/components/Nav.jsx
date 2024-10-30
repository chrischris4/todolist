import '../styles/Nav.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Nav() {
  const [userConnected, setUserConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserConnected(true);
    }
  }, []);

  const openCreateTaskPage = () => {
    navigate('/CreateTask');
  };

  const goBackDashboard = () => {
    navigate('/Dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserConnected(false);
    navigate('/');
  };

  return (
    <div className="nav">
      <div className="navContent">
        {(location.pathname === '/Dashboard' ||
          location.pathname === '/UpdateTask') && (
          <button onClick={openCreateTaskPage}>Créer une tâche</button>
        )}

        {location.pathname !== '/Dashboard' && (
          <button onClick={goBackDashboard}>Retour</button>
        )}

        {userConnected && (
          <button className="navLogout" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
