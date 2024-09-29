import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-message">Oops... Parece que te perdiste.</h2>
        <p className="not-found-description">
          La página que estás buscando no existe o fue movida.
        </p>
        <Link to="/" className="not-found-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
