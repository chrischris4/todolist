import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ firstName, lastName }) {
  const [userConnected, setUserConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserConnected(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserConnected(false);
    navigate('/');
  };

  return (
    <div className="header">
      <div className="headerContent">
        <img
          className="headerImg"
          src="https://i.ibb.co/DD85Mvv/todo.png"
          alt=""
        />
        {userConnected && (
          <div className="headerUser">
            <h3>{`${firstName} ${lastName}`}</h3>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
