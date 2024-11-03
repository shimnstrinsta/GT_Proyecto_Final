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
            

                <div className='full-screen-logo'>
                    <Image src={logo} fluid/>
                </div>


                <div className='container_item' id='button_container'>

                    <button className="btns_principal" id='proyects' onClick={() => navigate("/project")}>Proyectos</button>
                    <button className="btns_principal" id='hours' onClick={() => navigate("/supervisor/hour")}>Horas</button>
                    <button className="btns_principal" id='employees' onClick={() => navigate("/supervisor/employee")}>Empleados</button>
                </div>            


            <Summary/>
            <Footer />
        </div>
    );

}


