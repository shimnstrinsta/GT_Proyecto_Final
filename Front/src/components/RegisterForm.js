import React, { useState } from 'react';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';




function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    authService.register(name, lastName, email, password)
      .then(response => {
        setLoading(false);
        if (response.success) {
          setErrorMessage("")        
           
          navigate("/home");
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInvalid={(e) => setErrorMessage("Contraseña inválida")}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
