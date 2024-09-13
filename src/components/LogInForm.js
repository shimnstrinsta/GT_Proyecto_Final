// LogInForm.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';

// Definimos la función handleLogInSubmit (aunque aún no está implementada)

function LogInForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogInSubmit = (event) => {
    setLoading(true)
    setTimeout(9999);

    event.preventDefault(); // Evitar que el formulario se recargue
    console.log("Formulario enviado");

    authService.login(email,password)
    .then(response =>{
      setLoading(false)
      if (response.success){
        setErrorMessage("")

        navigate("/home")
      }
      else{
        setErrorMessage(response.message)
      }
    })
    .catch(error =>{
      setLoading(false)
      setErrorMessage(error.message)
    })
  }
  

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {/* Añadimos el formulario */}
      <form onSubmit={handleLogInSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          name="email"
          value = {email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => setErrorMessage("pelotudoooooooooo poné bien el email")}
          />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value = {password}
          required
          onChange={(e) => setPassword(e.target.value)}
          onInvalid={(e) => setErrorMessage("pelotudoooooooooo poné bien la contraseña")}

          />

        <button type="submit" disabled = {loading}>
          {loading? "Cargando..." : "Logearse"}
        </button>
        {errorMessage && <p style = {{color:"red"}}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LogInForm;
