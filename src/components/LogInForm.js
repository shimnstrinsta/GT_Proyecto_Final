// LogInForm.js
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';


function LogInForm() {

  const [credential, setCredential] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()  

  const handleLogInSubmit = (event) => {
    setLoading(true)
    setTimeout(9999);

    event.preventDefault(); // Evitar que el formulario se recargue    

    authService.login(credential,password)
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
        <label htmlFor="credential">Nombre o email:</label>
        <input 
          type="credential"
          id="credential"
          name="credential"
          value = {credential}
          required
          onChange={(e) => setCredential(e.target.value)}
          onInvalid={(e) => setErrorMessage("Credential inválido")}
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
