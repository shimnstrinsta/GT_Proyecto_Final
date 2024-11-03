import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ListItem, ListHeader, ListContent, List } from 'semantic-ui-react';
import { summaryService } from '../services/SummaryService';

export default function Summary({employee_id = 0}) {
    Chart.register(...registerables);

    const [dataDay,setDataDay] = useState("Tu día más productivo es el");
    const [dataActivity,setDataActivity] = useState("Has realizado las siguientes tareas");
    const [dataProject,setDataProject] = useState("Tu projycto favorito es");    


    const [mostWorkedProject, setProject] = useState("");
    const [mostWorkedDay, setDay] = useState("");

    const [activities, setActivities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [hoursActivities, setHoursActivites] = useState([])
    const [hoursProjects, setHoursProjects] = useState([])
    const [hoursDay, setHoursDay] = useState([])

    useEffect(() => {
        console.log(employee_id)
        summaryService.dayWeek(employee_id)
            .then(response => {

                if (response.success) {
                    const rows_hours = new Array(7)
                    const most = { day: "", hours: 0 }


                    Array.from(response.days).forEach(element => {
                        const totalHoras = parseFloat(element.minutos_trabajo);
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
                        if (most.hours < totalHoras) {
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
        summaryService.project(employee_id)
            .then(response => {

                if (response.success) {
                    const rows_hours = []
                    const rows_projects = []
                    const most = { project: "", hours: 0 }


                    Array.from(response.projects).forEach(element => {
                        rows_projects.unshift(element.nombre)
                        rows_hours.unshift(element.totalHoras)
                        const totalHoras = parseFloat(element.totalHoras);

                        if (most.hours < totalHoras) {
                            most.hours = element.totalHoras
                            most.project = element.nombre
                        }

                    });

                    setProject(most.project)
                    setProjects(rows_projects);
                    setHoursProjects(rows_hours);
                }

                else {
                }

            })
            .catch(error => {

            })
    }, []);

    useEffect(() => {
        summaryService.activity(employee_id)
            .then(response => {

                if (response.success) {
                    const rows_hours = []
                    const rows_activities = []

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

    useEffect(()=>{
        if(localStorage.getItem("supervisor")){
            setDataDay("El día más productivo es")
            setDataActivity("Las tareas realizadas son")
            setDataProject("El proyecto más trabajado es")
        }
    },[])

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
        labels: projects,
        datasets: [
            {
                label: 'Horas',
                data: hoursProjects,
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

    // Projectos
    const dataTareas = {
        labels: activities,
        datasets: [
            {
                label: 'Cantidad de horas',
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

    if (mostWorkedDay == "") {
        return (<div></div>)
    }
    else {
        return (
            <div>
                <div className='container_item content_container'>
                    <div className='content_info'>
                        <h4>{dataDay}</h4>
                        <h1>{mostWorkedDay}</h1>
                    </div>
                    <div className='content_graph'><Bar data={data} options={options} /></div>
                </div>
                <div className='container_item content_container'>
                    <div className='content_graph'><Pie data={dataTareas} id='pie' /></div>
                    <div className='content_info'>
                        <h4>{dataActivity}</h4>
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
                        <h4>{dataProject}</h4>
                        <h1>{mostWorkedProject}</h1>
                    </div>
                    <div className='content_graph'><Bar data={dataProjects} options={optionsProjects} /></div>
                </div>
            </div>
        )
    }
} 