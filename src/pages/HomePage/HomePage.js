import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import logo from "../../img/logoTransparent.png"
import { Image } from 'semantic-ui-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Chart from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

import './HomePage.css'




function HomePage() {
  const [mostWorkedProject,setProject] = useState("");
  const [mostWorkedDay,setDay] = useState("");

  // Horas
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 500, 400, 700, 200, 300],
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

  // Proyectos

  const dataProject = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
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
      <div className='container_item button_container'>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
      </div>

      <div className='container_item content_container'>        
        <div className='content_info'><h4>Has trabajado mas horas el día {mostWorkedDay}</h4></div>
        <div className='content_graph'><Bar data={data} options={options} /></div>        
      </div>

      <div className='container_item content_container'>        
        <div className='content_graph'><Bar data={data} options={options} />;</div>        
        <div className='content_info'><h4>Has pasado más tiempo en el proyecto {mostWorkedProject}</h4></div>
      </div>

      <div className='container_item content_container'>        
        <div className='content_info'><h4>Has realizado las siguientes tareas</h4></div>
        <div className='content_graph pie'><Pie data={dataProject} /></div>
      </div>

    </div>
  );
}

export default HomePage;
