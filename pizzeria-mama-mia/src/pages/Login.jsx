import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Ambos campos son obligatorios");
    } else if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
    } else {
      try {
        await login(email, password);
        setError("");
        setEmail("");
        setPassword("");
        navigate("/profile");
      } catch (err) {
        setError("Datos inválidos");
      }
    }
  };

  return (
    <div className="fondo-registro">
      <h1 className="titulo">Mi Cuenta</h1>
      <div className="formularios">
        <form onSubmit={handleLogin} className="inputs-generica">
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="input-style"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-style"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="boton">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
