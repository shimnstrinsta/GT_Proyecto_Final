import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { projectService } from '../services/ProjectService';
import '../assets/styles/project.css'


export default function Projects() {

    const [proyects, setProyects] = useState([])
    const [dateBeggin, setDateBeggin] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [errorMessage, setErrorMessage] = useState("")

    const handleProyectSubmit = (event) => {
        setTimeout(9999);

        event.preventDefault();
        projectService.insert(name,dateBeggin,dateEnd,description)

            .then(response => {            
                if(response.success){
                    setName("")
                    setDescription("")
                    setErrorMessage("")
                }   
                else{
                    setErrorMessage(response.message)
                  }
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
            
    }

    useEffect(() => {
        fetch(`http://localhost:3001/project`)
            .then(response => response.json())
            .then(proyects => {
                setProyects(proyects)
            })
    }, [])


    return (
        <div>
            <div className='project-info-container'>
                <div className='insert-hour-container'>




                </div>

                <div className='insert-hour-container'>




                </div>
            </div>

            <div className='insert-hour-container'>
                <h1>Nuevo</h1>

                <form onSubmit={handleProyectSubmit}>
                    <div className='form_container'>
                        <label htmlFor='name'>Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />


                        <label htmlFor='date_beggin'>Fecha de inicio</label>
                        <input id='date_beggin' type='date'
                            value={dateBeggin}
                            onChange={(e) => setDateBeggin(e.target.value)}
                        ></input>

                        <label htmlFor='date_beggin'>Fecha final</label>
                        <input id='date_beggin' type='date'
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                        ></input>

                        <label htmlFor='description'>Descripción</label>
                    </div>
                    <textarea id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button type='submit'>Registrar</button>
                    {errorMessage && <p style = {{color:"red"}}>{errorMessage}</p>}   
                </form>

            </div>

        </div>
    );

}