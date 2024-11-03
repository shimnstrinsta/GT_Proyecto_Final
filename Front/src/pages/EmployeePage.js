import Employee from '../components/Employee'
import Header from '../components/Header'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeePage() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("supervisor")){
        navigate("/home")
      }
    })
    return(
        <div>
            <Header/>
            <Employee/>
        </div>
    );

}