import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import '../assets/styles/insert_hour.css'

const proyectos = ['JarvisAMC', 'TPIO1', 'GTimesheet', "Entropia"]
const actividades = ['Diseño', 'Análisis', 'Testeo', "Codificacion"]

export default function HomePage() {
    return (
        <div className='insert-hour-container'>
            <h1>Registrar horas</h1>
            <form>
                <div className='form-container'>
                    <label for='proyecto' value='proyecto'>Proyecto</label>
                    <Autocomplete
                        id='proyecto'
                        disablePortal
                        options={proyectos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <label for='time_beggin'>Hora inicio</label>
                    <input id='time_beggin' type='time'></input>

                    <label for='time_end'>Hora fin</label>
                    <input id='time_end' type='time'></input>

                    <label for='activity'>Actividad</label>
                    <Autocomplete
                        id='activity'
                        disablePortal
                        options={actividades}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <label for='activity_description'>Resumen</label>
                </div>

                <textarea id='activity_description'></textarea>
                <input id='btn_submit' type='submit' value='Registrar' />
            </form>

        </div>
    );

}