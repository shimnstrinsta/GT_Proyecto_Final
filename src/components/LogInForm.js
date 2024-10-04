// LogInForm.js
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';


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

    authService.login(email,password)
    .then(response =>{
      setLoading(false)
      if (response.success){
        setErrorMessage("")        
        navigate("/home");
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
      <form onSubmit={handleLogInSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          name="email"
          value = {email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => setErrorMessage("Email inválido")}
          />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value = {password}
          required
          onChange={(e) => setPassword(e.target.value)}
          onInvalid={(e) => setErrorMessage("Contraseña inválida")}

          />

        <button type="submit" disabled = {loading}>
          {loading? "Cargando..." : "Iniciar"}
        </button>
        {errorMessage && <p style = {{color:"red"}}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LogInForm;
