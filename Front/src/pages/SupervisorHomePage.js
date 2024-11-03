import HomeSupervisor from '../components/HomeSupervisor'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupervisorHomePage() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("supervisor")){
        navigate("/home")
      }
    })

    return(
        <div>
            <HomeSupervisor/>
        </div>
    );

}