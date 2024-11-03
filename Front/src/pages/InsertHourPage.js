import Header from '../components/Header';
import InsertHourForm from '../components/InsertHourForm'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function InsertPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("supervisor")){
      navigate("/supervisor/home")
    }
  })
  
  return (
    <div>
      <div>        
        <Header/>
        <InsertHourForm/>
      </div>
    </div>
  );
}

export default InsertPage;
