import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useUser } from "../components/UserContext";

const Navbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="barraNavegacion">
      <div className="textoNavBar">
        <p>Pizzeria Mamma Mia!</p>
      </div>
      <ul className="contentNavBar">
        <li className="navItem">
          <Link to="/" className="boton">
            🏠 Home
          </Link>
        </li>
        {token ? (
          <>
            <li className="navItem">
              <Link to="/profile" className="boton">
                👤 Perfil
              </Link>
            </li>
            <li className="navItem">
              <button onClick={handleLogout} className="boton">
                🔓 Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navItem">
              <Link to="/login" className="boton">
                🔑 Iniciar sesión
              </Link>
            </li>
            <li className="navItem">
              <Link to="/register" className="boton">
                📝 Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
      <button className="botonCarro" onClick={() => navigate("/cart")}>
        🛒 Total: ${total.toLocaleString()}
      </button>
    </nav>
  );
};

export default Navbar;
