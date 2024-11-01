import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import logo from "../img/logoTransparent.png"
import { Image } from 'semantic-ui-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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

          <Card sx={{ maxWidth: 400 }} className='button_item'>
            <CardMedia component="img" height="170" image="https://cdn.pixabay.com/photo/2016/11/29/07/10/hand-1868015_640.jpg" alt="registrar horas" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Registrar horas
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Ingresa nuevas horas de trabajo
              </Typography>
              <button className='button_item_select' onClick={() => navigate("/hour/insert")}>Ingresar</button>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 400 }} className='button_item'>
            <CardMedia component="img" height="170" image="https://png.pngtree.com/thumb_back/fh260/background/20220103/pngtree-time-sheet-timesheet-text-employee-photo-image_2644421.jpg" alt="consultar horas" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Consultar horas
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Revisa tu historial de horas trabajadas
              </Typography>
              <button className='button_item_select' onClick={() => navigate("/hour")}>Buscar</button>
            </CardContent>
          </Card>

        </div>
      </div>

      <Summary />
      <Footer />
    </div>
  );
  
}


