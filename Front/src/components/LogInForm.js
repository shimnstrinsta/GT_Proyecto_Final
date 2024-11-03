import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login_style.css';
import { authService } from '../services/AuthService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LogInForm() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para la visibilidad de la contraseña
  const [isFocused, setIsFocused] = useState(false); 

  const navigate = useNavigate();

  const handleLogInSubmit = (event) => {
    setLoading(true);
    setTimeout(9999);

    event.preventDefault();
    authService.login(credential, password)
      .then(response => {
        setLoading(false);
        if (response.success) {
          setErrorMessage("");
          if (response.supervisor) {
            navigate("/supervisor/home");
            localStorage.setItem("supervisor", true);
          } else {
            navigate("/home");
          }
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
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogInSubmit}>
        <label htmlFor="credential">Nombre o email:</label>
        <input
          type="text"
          id="credential"
          name="credential"
          value={credential}
          required
          onChange={(e) => setCredential(e.target.value)}
          onInvalid={(e) => setErrorMessage("Credential inválido")}
        />

        <label htmlFor="password">Contraseña:</label>
        <div className={`pass_container focus_${isFocused}`}  style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type={showPassword ? "text" : "password"} // Muestra u oculta la contraseña
            id="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(e) => setErrorMessage("Contraseña inválida")}
            style={{ flex: 1 }} // Para que ocupe todo el espacio posible
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="button"
            id='icon_pass'
            onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic            
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
          
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LogInForm;
