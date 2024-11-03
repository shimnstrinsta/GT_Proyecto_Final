import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import '../assets/styles/login_style.css'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/home")
    }
  })

  return (
    <div className='login-container'>
      <div className='login-card'>        
        <RegisterForm />
        <p>¿Ya tenés una cuenta? <Link to="/">Inicia sesión</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
