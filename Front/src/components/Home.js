import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import logo from "../img/logoTransparent.png"
import { Image } from 'semantic-ui-react';

import { useNavigate } from 'react-router-dom';
import Summary from './Summary'

import '../assets/styles/home.css'
import '../assets/styles/main.css'

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user");
  })

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);


  return (
    <div>
      <Header />

      <div className='container'>

        <div className='container_item' id='container_logo'>
          <Image src={logo} />
        </div>


        <div className='container_item' id='button_container'>

          <button id='insert_hour' onClick={() => navigate("/hour/insert")}>Registrar horas</button>
          <button id='get_hour' onClick={() => navigate("/hour")}>Consultar horas</button>
          
        </div>
      </div>


      <Summary  employee_id = {localStorage.getItem("id_user")}/>
      <Footer />
    </div>
  );
  
}


