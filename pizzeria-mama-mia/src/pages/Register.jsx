import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const validarCorreo = (email) => {
    const partesCorreo = email.split("@");
    return partesCorreo.length === 2 && partesCorreo[1].includes(".");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
    } else if (!validarCorreo(email)) {
      setError("Correo inválido. Debe contener un punto después de '@'.");
    } else if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
    } else if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      try {
        await register(email, password);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/profile");
      } catch (err) {
        if (err.message === "Usuario existente") {
          setError("El correo ya está registrado. Prueba con otro.");
        } else {
          setError("Error al registrar. Intenta nuevamente.");
        }
      }
    }
  };

  return (
    <div className="fondo-registro">
      <h1 className="titulo">¡Regístrate!</h1>
      <div className="formularios">
        <form onSubmit={handleRegister} className="inputs-generica">
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
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="input-style"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="boton">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
