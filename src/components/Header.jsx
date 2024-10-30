import { useState, useEffect } from 'react';
import '../styles/Header.css';

function Header({ firstName, lastName }) {
  const [userConnected, setUserConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserConnected(true);
    }
  }, []);

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
            <h3>{`${firstName}`}</h3> <h3>{`${lastName}`}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
