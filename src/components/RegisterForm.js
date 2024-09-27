import React, { useState } from 'react';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';




function RegisterForm() {  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const  handleRegisterSubmit = (event) => {
    event.preventDefault();
  
      setLoading(true)
      setTimeout(9999);      
      authService.register(email,password)
      .then(response =>{
        setLoading(false)
        if (response.success){
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
      <h1>Registrarse</h1>
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          name="email"
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => setErrorMessage("Email inválido")}

        />
        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password"
          id="password" 
          name="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInvalid={(e) => setErrorMessage("Contraseña inválida")}

        />
        <button type="submit" disabled = {loading}>
          {loading? "Cargando..." : "Registrarse"}
        </button>
        {errorMessage && <p  style = {{color:"red"}} >{errorMessage}</p>}

      </form>
    </div>
  );
}

export default RegisterForm;
