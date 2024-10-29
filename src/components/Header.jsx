import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="headerContent">
        <h2>Todolist</h2>
        <div className="headerUser">
          <h3>UserName</h3>
          <button>Se deconnecter</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
