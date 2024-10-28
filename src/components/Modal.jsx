import '../styles/Modal.css';

function Modal() {
  return (
    <div className="modal">
      <span className="material-symbols-rounded modalClose">close</span>

      <div className="modal">
        <h2>Crée un compte</h2>
        <form>
          <label htmlFor="">E mail</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="">Mot de passe</label>
          <input type="text" name="password" id="password" />
          <button>Continuer</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
