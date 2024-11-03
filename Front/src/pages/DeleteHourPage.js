import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DeleteHourForm from '../components/DeleteHourForm';


function DeleteHourPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("supervisor")){
      navigate("/supervisor/home")
    }
  })

  return (
    <div>
      <Header />
      <DeleteHourForm />
    </div>
  );
}

export default DeleteHourPage;