import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { hourService } from '../services/HourService';
import '../assets/styles/insert_hour.css'


export default function InserHourForm() {
    const [proyecto, setProyecto] = useState('');
    const [timeBeggin, setTimeBeggin] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [activity, setActivity] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [proyects,setProyects] = useState()
    const [activities,setActivities] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const handleLogInSubmit = (event) => {    

        setLoading(true)
        setTimeout(9999);
    
        event.preventDefault();
         
        hourService.insert(proyecto,timeBeggin,timeEnd,activity,activityDescription)
            .then(response =>{
              setLoading(false)
              if (response.success){
                setErrorMessage("") 
                setProyecto("")
                setTimeBeggin("")
                setTimeEnd("")
                setActivity("")   
                setActivityDescription("")                                           
              }
              else{
                setErrorMessage(response.message)
              }
            })
            .catch(error =>{
              setLoading(false)
              setErrorMessage(error.message)
            })
    }

    useEffect(()=>{
        fetch(`http://localhost:3001/proyect`)
        .then(response => response.json())
        .then(proyects => {
            const proyect_name = [];

            proyects.forEach(element => {
                proyect_name.unshift(element.nombre);
            });

          setProyects(proyect_name)
        })
        .catch(error => {          
          return { success: false, message: "Error de insercion: " + error.message };
        });
    },[])

    useEffect(()=>{
        fetch(`http://localhost:3001/activity`)
        .then(response => response.json())
        .then(actividad => {
            const activity_name = [];

            actividad.forEach(element => {
                activity_name.unshift(element.nombre);
            });

            setActivities(activity_name)
        })
        .catch(error => {          
          return { success: false, message: "Error de insercion: " + error.message };
        });
    },[])


    return (
        <div className='insert-hour-container'>
            <h1>Registrar horas</h1>
            <form onSubmit={handleLogInSubmit}>
                <div className='form-container'>
                    <label htmlFor='proyecto' value='proyecto'>Proyecto</label>
                    <Autocomplete
                        id='proyecto'
                        disablePortal
                        options={proyects}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(event, newValue) => setProyecto(newValue)}
                    />

                    <label htmlFor='time_beggin'>Hora inicio</label>
                    <input id='time_beggin' type='time'
                    value={timeBeggin}
                    onChange={(e) => setTimeBeggin(e.target.value)}
                    ></input>

                    <label htmlFor='time_end'>Hora fin</label>
                    <input id='time_end' type='time' value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}></input>

                    <label htmlFor='activity'>Actividad</label>
                    <Autocomplete
                        id='activity'
                        disablePortal
                        options={activities}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}                        
                        onChange={(event, newValue) => setActivity(newValue)}
                    />

                    <label htmlFor='activity_description'>Resumen</label>
                </div>

                <textarea id='activity_description'
                                    value={activityDescription}
                                    onChange={(e) => setActivityDescription(e.target.value)}></textarea>
                <button id='btn_submit' type="submit">
                    {loading? "Cargando..." : "Registrar"}
                </button>      
                {errorMessage && <p style = {{color:"red"}}>{errorMessage}</p>}          
            </form>

        </div>
    );

}