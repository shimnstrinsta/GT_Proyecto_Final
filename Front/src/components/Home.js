import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import logo from "../img/logoTransparent.png"
import { ListItem, ListHeader, ListContent, List, GridColumn, Grid, Image } from 'semantic-ui-react';
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
import { summaryService } from '../services/SummaryService';

import '../assets/styles/home.css'
import '../assets/styles/main.css'

export default function Home() {
  const navigate = useNavigate();
  const [mostWorkedProject, setProject] = useState("");
  const [mostWorkedDay, setDay] = useState("");

  const [activities, setActivities] = useState([]);
  const [proyects, setProjects] = useState([]);
  const [hoursActivities, setHoursActivites] = useState([])
  const [hoursProyects, setHoursProyects] = useState([])
  const [hoursDay, setHoursDay] = useState([])

  const [user, setUser] = useState(() => {
    return localStorage.getItem("user");
  })

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    summaryService.dayWeek()
      .then(response => {

        if (response.success) {
          const rows_hours = new Array(7)
          const most = { day: "", hours: 0 }


          Array.from(response.days).forEach(element => {

            switch (element.dia_semana) {
              case "Lunes":
                rows_hours[0] = parseInt(element.minutos_trabajo / 60)
                break
              case "Martes":
                rows_hours[1] = parseInt(element.minutos_trabajo / 60)
                break
              case "Miércoles":
                rows_hours[2] = parseInt(element.minutos_trabajo / 60)
                break
              case "Jueves":
                rows_hours[3] = parseInt(element.minutos_trabajo / 60)
                break
              case "Viernes":
                rows_hours[4] = parseInt(element.minutos_trabajo / 60)
                break
              case "Sábado":
                rows_hours[5] = parseInt(element.minutos_trabajo / 60)
                break
              case "Domingo":
                rows_hours[6] = parseInt(element.minutos_trabajo / 60)
                break

            }
            if (most.hours < element.minutos_trabajo) {
              most.hours = element.minutos_trabajo
              most.day = element.dia_semana
            }

          });
          setDay(most.day)

          setHoursDay(rows_hours)
        }
        else {
        }

      })
      .catch(error => {

      })
  }, []);

  useEffect(() => {
    summaryService.proyect()
      .then(response => {

        if (response.success) {
          const rows_hours = []
          const rows_proyects = []
          const most = { project: "", hours: 0 }


          Array.from(response.proyects).forEach(element => {
            rows_proyects.unshift(element.nombre)
            rows_hours.unshift(element.totalHoras)        
            
            if (most.hours < element.totalHoras) {
              most.hours = element.totalHoras
              most.project = element.nombre
            }

          });

          
          setProject(most.project)
          setProjects(rows_proyects);
          setHoursProyects(rows_hours);
        }

        else {
        }

      })
      .catch(error => {

      })
  }, []);

  useEffect(() => {
    summaryService.activity()
      .then(response => {

        if (response.success) {
          const rows_hours = []
          const rows_activities = []          

          console.log(response.activities)
          Array.from(response.activities).forEach(element => {
            rows_activities.unshift(element.nombre)
            rows_hours.unshift(element.totalHoras)                  

          });                    
          setActivities(rows_activities);
          setHoursActivites(rows_hours);
        }

        else {
        }

      })
      .catch(error => {

      })
  }, []);

  

  // Horas
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Horas',
        data: hoursDay,
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
    labels: proyects,
    datasets: [
      {
        label: 'Horas',
        data: hoursProyects,
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
    labels: activities,
    datasets: [
      {
        label: '# of Votes',
        data: hoursActivities,
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

        <div className='container_item content_container'>
          <div className='content_info'>
            <h4>Tu día más productivo es el</h4>
            <h1>{mostWorkedDay}</h1>
          </div>
          <div className='content_graph'><Bar data={data} options={options} /></div>
        </div>
        <div className='container_item content_container'>
          <div className='content_graph'><Pie data={dataTareas} id='pie' /></div>
          <div className='content_info'>
            <h4>Has realizado las siguientes tareas</h4>
            <List animated verticalAlign='middle'>
              {activities.map((actividad, index) => (
                <ListItem key={index}>
                  <ListContent>
                    <ListHeader>{actividad}</ListHeader>
                  </ListContent>
                </ListItem>
              ))}

            </List>
          </div>
        </div>

        <div className='container_item content_container'>
          <div className='content_info'>
            <h4>Tu proyecto favorito es</h4>
            <h1>{mostWorkedProject}</h1>
          </div>
          <div className='content_graph'><Bar data={dataProjects} options={optionsProjects} /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


