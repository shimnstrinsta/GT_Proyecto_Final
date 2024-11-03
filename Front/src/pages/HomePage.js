import Home from '../components/Home'
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("supervisor")){
        navigate("/supervisor/home")
      }
    })

    return(
        <div>
            <Home/>
        </div>
    );

}