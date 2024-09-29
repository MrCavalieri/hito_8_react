import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="fondo-registro">
      <h1 className="titulo">¡Bienvenido!</h1>
      <div className="formularios">
        <div className="profile-container">
          <p className="profile-email">
            <strong>Email:</strong> {user.email}
          </p>
          <button className="btn btn-dark" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
