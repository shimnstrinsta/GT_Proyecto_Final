import Header from '../components/Header';
import ManageHour from '../components/ManageHour'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ManageHourPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("supervisor")){
      navigate("/supervisor/home")
    }
  })  
  
  return (
    <div>
        <Header/>
        <ManageHour/>
    </div>
  );
}

export default ManageHourPage;
