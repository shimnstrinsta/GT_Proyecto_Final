import React, { useState } from 'react';
import '../assets/styles/login_style.css'
import { authService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';




function RegisterForm() {
  // Estado para manejar el checkbox seleccionado
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedRole(id);
  };

  const  handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (selectedRole === ""){
      setErrorMessage("Pelotudooooooooo seleccioná algún rol")
    }
    else{
      console.log("Formulario de registro enviado")
      setLoading(true)
      setTimeout(9999);
      console.log(selectedRole)
      authService.register(email,password,selectedRole)
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
          onInvalid={(e) => setErrorMessage("pelotudoooooooooo poné bien el email")}

        />
        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password"
          id="password" 
          name="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInvalid={(e) => setErrorMessage("pelotudoooooooooo poné bien la contraseña")}

        />
        <div className="checkbox-container">
          <label htmlFor="supervisor">
           
            Supervisor
          </label>
          <input
              type="checkbox"
              id="supervisor"
              name="role"
              checked={selectedRole === 'supervisor'}
              value={selectedRole}
              onChange={handleCheckboxChange}
            />
          <label htmlFor="empleado">
           
            Empleado
          </label>
          <input
              type="checkbox"
              id="empleado"
              name="role"
              value={selectedRole}
              checked={selectedRole === 'empleado'}
              onChange={handleCheckboxChange}
            />
        </div>
        <button type="submit" disabled = {loading}>
          {loading? "Cargando..." : "Registrarse"}
        </button>
        {errorMessage && <p  style = {{color:"red"}} >{errorMessage}</p>}

      </form>
    </div>
  );
}

export default RegisterForm;
