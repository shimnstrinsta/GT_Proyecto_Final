import React from 'react';
import { Link } from 'react-router-dom';
import LogInForm from '../components/LogInForm';
import '../assets/styles/login_style.css'


function LoginPage() {
  return (
    <div className='login-container'>
      <div className='login-card'>        
        <LogInForm />
        <p>¿No tenés cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
