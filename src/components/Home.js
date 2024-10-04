import React, { useState,useContext,useEffect } from 'react';
import Header from './Header'
import logo from "../img/logoTransparent.png"
import { GridColumn, Grid,Image } from 'semantic-ui-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Chart from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

import '../assets/styles/home.css'

export default function Home() {
  const navigate = useNavigate();  
  const { isAuthenticated } = useContext(userContext);
  const [mostWorkedProject,setProject] = useState("JARVIS");
  const [mostWorkedDay,setDay] = useState("Viernes");

  useEffect (() => {
    if(!isAuthenticated){
      navigate("/");
      return () => {};
    }
  },[isAuthenticated]);

  // Horas
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Horas',
        data: [300, 500, 400, 700, 200, 300, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Tareas
  const dataProjects = {
    labels: ['Jarvis', 'TPI01', 'Entropía', 'TPIF', 'GTimesheet',],
    datasets: [
      {
        label: 'Horas',
        data: [300, 500, 400, 700, 200],
        backgroundColor: 'rgba(102, 181, 102, 0.6)',
      },
    ],
  };

  const optionsProjects = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Proyectos

  const dataTareas = {
    labels: ['Análisis', 'Documentación', 'Programación', 'Diseño', 'Testeo'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  
  return (
    <div>      
      <Header/>

      <div className='container_item' id='container_logo'>
        <Image src={logo}/>  
      </div>

      <div className='container_item' id= 'button_container'>

      <Card sx={{ maxWidth: 400 }} className='button_item'>
        <CardActionArea>
        <CardMedia component="img" height="170" image="https://cdn.pixabay.com/photo/2016/11/29/07/10/hand-1868015_640.jpg" alt="registrar horas"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Registrar horas
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Ingresa nuevas horas de trabajo
            </Typography>
            <button className='button_item_select' onClick={() => navigate("/insert-hour")}>Ingresar</button>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 400 }} className='button_item'>
        <CardActionArea>
        <CardMedia component="img" height="170" image="https://png.pngtree.com/thumb_back/fh260/background/20220103/pngtree-time-sheet-timesheet-text-employee-photo-image_2644421.jpg" alt="consultar horas"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Consultar horas
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Revisa tu historial de horas trabajadas
            </Typography>
            <button className='button_item_select' onClick={() => navigate("/")}>Buscar</button>
          </CardContent>
        </CardActionArea>
      </Card>

      </div>

      <div className='container_item content_container'>        
        <div className='content_info'>
          <h4>Tu día más productivo es el</h4>
          <h1>{mostWorkedDay}</h1>
        </div>
        <div className='content_graph'><Bar data={data} options={options} /></div>        
      </div>
      <div className='container_item content_container'>        
        <div className='content_graph'><Pie data={dataTareas} id='pie'/></div>
        <div className='content_info'>
          <h4>Has realizado las siguientes tareas</h4>
          <ul>            
            <li>Análisis</li>
            <li>Diseño</li>
            <li>Testeo</li>
          </ul>
        </div>
      </div>

      <div className='container_item content_container'>        
        <div className='content_info'>
          <h4>Tu proyecto favorito es</h4>
          <h1>{mostWorkedProject}</h1>
        </div>
        <div className='content_graph'><Bar data={dataProjects} options={optionsProjects} />;</div>        
      </div>
    </div>
  );
}


