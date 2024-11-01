import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import '../assets/styles/login_style.css'


function RegisterPage() {
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
