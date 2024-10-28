import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="headerContent">
        <h2>Todolist</h2>
        <nav>
          <ul>
            <li>Se connecter</li>
            <li>Crée un compte</li>
            <li>Tâches</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
