import React, { useState, useEffect } from 'react'
import { projectService } from '../services/ProjectService';
import '../assets/styles/project.css'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
    { id: "project", label: "Proyecto", minWidth: 120 },
    { id: "date_beggin", label: "Fecha de inicio", minWidth: 70 },
    { id: "date_end", label: "Fecha de fin", minWidth: 70 },
    { id: "description", label: "Descripción", minWidth: 250 },
];

function createData(
    project,
    date_beggin,
    date_end,
    description
) {
    return { project, date_beggin,date_end, description };
}


export default function Projects() {
    Chart.register(...registerables);
    const [projects, setProjects] = useState([])
    const [dateBeggin, setDateBeggin] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [errorMessage, setErrorMessage] = useState("")
    const [hoursProjects, setHoursProjects] = useState([])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        projectService.getAll()
            .then(response => {

                if (response.success) {
                    const rows_hours = []
                    const rows_projects = []
                    const rows_data = []

                    Array.from(response.projects).forEach(element => {
                        rows_projects.unshift(element.nombre)
                        rows_data.unshift(createData(element.nombre,element.fecha_inicio,element.fecha_fin,element.descripcion))
                        rows_hours.unshift(element.total_horas)

                    });

                    setRows(rows_data)
                    setProjects(rows_projects);
                    setHoursProjects(rows_hours);
                }

                else {
                }

            })
            .catch(error => {

            })
    }, []);

    const optionsProjects = {
        maintainAspectRatio: false,
        indexAxis: 'y', // Cambia la dirección de las barras a horizontal
        scales: {
            x: { // Escala 'x' ahora representa el eje horizontal
                beginAtZero: true,
            },
        },
    };

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


    const handleProyectSubmit = (event) => {
        setTimeout(9999);

        event.preventDefault();
        projectService.insert(name, dateBeggin, dateEnd, description)

            .then(response => {
                if (response.success) {
                    setName("")
                    setDescription("")
                    setErrorMessage("")
                }
                else {
                    setErrorMessage(response.message)
                }
            })
            .catch(error => {
                setErrorMessage(error.message)
            })

    }


    return (
        <div>
            <div className='project-info-container'>
                <div className='insert-hour-container'>

                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row.code}
                                                >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === "number"
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>


                </div>

                <div className='insert-hour-container content_graph' id='graph_project'>
                    <Bar data={dataProjects} options={optionsProjects} />
                </div>
            </div>

            <div className='insert-hour-container' id='insert-project'>
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
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </form>

            </div>

        </div>
    );

}