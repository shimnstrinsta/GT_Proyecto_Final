import { Link } from 'react-router-dom';
import LogInForm from '../components/LogInForm';
import '../assets/styles/login_style.css'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/home")
    }
  })

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
