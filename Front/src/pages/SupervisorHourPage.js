import HourSupervisor from '../components/HourSupervisor'
import Header from '../components/Header'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupervisorHourPage() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("supervisor")){
        navigate("/home")
      }
    })

    return(
        <div>
            <Header/>
            <HourSupervisor/>            
        </div>
    );

}