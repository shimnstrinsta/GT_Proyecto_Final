
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { hourService } from '../services/HourService';
import img from "../img/no_hour.png";

import DeleteIcon from '@mui/icons-material/Delete';
import "../assets/styles/hour.css"



function createData(hour) {
    if (!hour.id_detalle) {
        return null;
    }

    const baseData = {
        id: hour.id_detalle,
        project: hour.proyecto?.nombre || '',
        date: hour.fecha,
        time_init: hour.hora_inicio_trabajo,
        time_end: hour.hora_fin_trabajo,
        total: formatTotal(hour.total),
        activity: hour.actividad?.nombre || '',
        description: hour.descripcion_hora_trabajo,
        originalHour: hour
    };

    // Para supervisor, mantener el mismo ID al extender
    if (hour.empleado) {
        const supervisorData = {
            ...baseData,
            id: hour.id_detalle, // Asegurarse de que el ID se mantenga
            photo: hour.empleado.ruta_foto || '',
            employee_name: `${hour.empleado.nombre || ''} ${hour.empleado.apellido || ''}`.trim()
        };
        return supervisorData;
    }

    return baseData;
}

function formatTotal(minutes) {
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
    const remainingMinutes = (minutes % 60).toString().padStart(2, '0');
    return `${hours}:${remainingMinutes}`;
}

export default function HourSupervisor() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [hours, setHours] = useState([]);
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null);
    const [hourToDelete, setHourToDelete] = useState(null);
    const [proyects, setProyects] = useState([]);
    const [activities, setActivities] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const [editData, setEditData] = useState({
        proyecto: '',
        timeBeggin: '',
        timeEnd: '',
        activity: '',
        activityDescription: ''
    });

    const isSupervisor = JSON.parse(localStorage.getItem('supervisor'));

    useEffect(() => {
        loadHours();
        loadProyects();
        loadActivities();
    }, []);

    const loadHours = async () => {
        try {
            const serviceMethod = isSupervisor ? hourService.getAllHours : hourService.get;
            const response = await serviceMethod();
            
            if (response.success && response.hours) {
                const rows_hours = response.hours
                    .filter(hour => hour && hour.proyecto) // Asegurarse de que los datos son válidos
                    .map(hour => createData(hour));
                
                if (rows_hours.length === 0) {
                    setErrorMessage("No se encontraron registros de horas");
                }
                
                setRows(rows_hours);
                setHours(response.hours);
            } else {
                setErrorMessage("Error al cargar las horas: " + (response.message || "No hay datos disponibles"));
            }
        } catch (error) {
            console.error("Error loading hours:", error);
            setErrorMessage("Error al cargar las horas: " + error.message);
        }
    };


    const loadProyects = () => {
        fetch(`http://localhost:3001/project`)
            .then(response => response.json())
            .then(proyects => {
                setProyects(proyects.map(p => p.nombre));
            });
    };

    const loadActivities = () => {
        fetch(`http://localhost:3001/activity`)
            .then(response => response.json())
            .then(activities => {
                setActivities(activities.map(a => a.nombre));
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const handleUpdate = (event) => {
        event.preventDefault();
        setLoading(true);

        hourService.update(selectedHour.id_detalle, editData) // Cambiado de selectedHour.id a selectedHour.id_detalle
            .then(response => {
                if (response.success) {
                    setOpenModal(false);
                    loadHours();
                    setErrorMessage("");
                } else {
                    setErrorMessage(response.message);
                }
            })
            .catch(error => {
                setErrorMessage("Error al actualizar: " + error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    const handleDelete = (row) => {

        setHourToDelete({
            id: row.id,
            project: row.project,
            date: row.date,
            total: row.total,
            originalHour: row.originalHour
        });
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setLoading(true);
        if (!hourToDelete?.originalHour?.id_detalle) {
            setErrorMessage("ID de registro no válido");
            setLoading(false);
            setOpenDeleteModal(false);
            setHourToDelete(null);
            return;
        }
        hourService.delete(hourToDelete.originalHour.id_detalle) // Cambiado para usar el ID correcto del objeto original
            .then(response => {
                if (response.success) {
                    loadHours();
                    setOpenDeleteModal(false);
                    setErrorMessage("");
                } else {
                    setErrorMessage(response.message);
                }
            })
            .catch(error => {
                setErrorMessage("Error al eliminar: " + error.message);
            })
            .finally(() => {
                setLoading(false);
                setOpenDeleteModal(false);
                setHourToDelete(null);
            });
    };


    const ActionButtons = ({ row, onEdit, onDelete }) => (
        isSupervisor ?
            <>
                <button style={{"maxWidth": "fit-content"}} onClick={() => onDelete(row)} className="delete-button">
                    <DeleteIcon />
                </button>
            </>
            :
            <>
                <button onClick={() => onEdit(row)} className="edit-button">                    
                </button>
                <button onClick={() => onDelete(row)} className="delete-button">
                    <DeleteIcon />
                </button>
            </>

    );

    const columns = isSupervisor ? [
        
        { 
            id: "photo", 
            label: "Foto", 
            minWidth: 20, 
            align: "center",
            render: (row) => row.photo ? (
                <img 
                    src={row.photo} 
                    alt="Empleado" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
            ) : "Sin foto"
        },
        { id: "employee_name", label: "Nombre", minWidth: 70, align: "center" },
        { id: "project", label: "Proyecto", minWidth: 120, align: "center" },
        { id: "date", label: "Fecha", minWidth: 70, align: "center" },        
        { id: "time_init", label: "Hora inicio", minWidth: 70, align: "center" },
        { id: "time_end", label: "Hora fin", minWidth: 70, align: "center" },
        { id: "total", label: "Total (hrs)", minWidth: 70, align: "center" },
        { id: "activity", label: "Actividad", minWidth: 100, align: "center" },
        { id: "description", label: "Resumen", minWidth: 250, align: "center" },
        {
            id: "actions",
            label: "Acciones",
            minWidth: 10,
            maxWidth: 10,
            align: "center",
            render: (row) => (
                <ActionButtons
                    row={row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        }
    ] : [
        { id: "project", label: "Proyecto", minWidth: 120, align: "center" },
        { id: "date", label: "Fecha", minWidth: 70, align: "center" },
        { id: "time_init", label: "Hora inicio", minWidth: 70, align: "center" },
        { id: "time_end", label: "Hora fin", minWidth: 70, align: "center" },
        { id: "total", label: "Total (hrs)", minWidth: 70, align: "center" },
        { id: "activity", label: "Actividad", minWidth: 100, align: "center" },
        { id: "description", label: "Resumen", minWidth: 250, align: "center" },
        {
            id: "actions",
            label: "Acciones",
            minWidth: 10,
            maxWidth: 10,
            align: "center",
            render: (row) => (
                <ActionButtons
                    row={row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        }
    ];


    const handleEdit = (row) => {
        setSelectedHour(row.originalHour);
        setEditData({
            proyecto: row.project,
            timeBeggin: row.time_init,
            timeEnd: row.time_end,
            activity: row.activity,
            activityDescription: row.description
        });
        setOpenModal(true);
    };

    if (rows.length === 0) {
        return (
            <div className="no_hour">
                <img src={img} alt="No hay horas registradas" />
                <h1>Todavía no tienes horas registradas</h1>
            </div>
        );
    }

    return (
        <div className="hour_container">
            <h1>Gestionar horas</h1>
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
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>  {/* Usa `row.id` como clave */}
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} className='table-cell'>
                                            {column.render ? column.render(row) : row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                ))}
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
                <div style={{ padding: '16px', textAlign: 'right' }}>
                </div>
            </Paper>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box className="modal-container">
                    <h2>Editar Hora</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-grid">
                            <label>Proyecto:</label>
                            <Autocomplete
                                value={editData.proyecto}
                                onChange={(event, newValue) => setEditData({ ...editData, proyecto: newValue })}
                                disableClearable
                                options={proyects}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />

                            <label>Hora de Inicio:</label>
                            <TextField
                                type="time"
                                value={editData.timeBeggin}
                                onChange={(e) => setEditData({ ...editData, timeBeggin: e.target.value })}
                                variant="outlined"
                            />

                            <label>Hora de Fin:</label>
                            <TextField
                                type="time"
                                value={editData.timeEnd}
                                onChange={(e) => setEditData({ ...editData, timeEnd: e.target.value })}
                                variant="outlined"
                            />

                            <label>Actividad:</label>
                            <Autocomplete
                                value={editData.activity}
                                onChange={(event, newValue) => setEditData({ ...editData, activity: newValue })}
                                options={activities}
                                disableClearable
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />

                            <label>Descripción:</label>
                            <textarea
                                value={editData.activityDescription}
                                onChange={(e) => setEditData({ ...editData, activityDescription: e.target.value })}
                            />
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <div className="button-container">
                            <button type="button" disabled={loading} onClick={() => setOpenModal(false)}>{loading ? 'Esperando...' : 'Cancelar'}</button>
                            <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
            >
                <Box className="confirm-modal-container">
                    <h2>Confirmar eliminación</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleConfirmDelete();
                    }}>
                        <div className="confirm-modal-content">

                            {hourToDelete && (

                                <div className="confirm-modal-details">
                                    <p>
                                        {
                                        isSupervisor ? 
                                            "¿Está seguro que desea eliminar este registro de horas de " + hourToDelete.originalHour.actividad.nombre + ", realizado por "+ hourToDelete.originalHour.empleado.nombre + "?"

                                        :
                                            "¿Está seguro que desea eliminar este registro de horas de " + hourToDelete.originalHour.actividad.nombre + " ?"
                                        }
                                    </p>

                                    <p><strong>Proyecto:</strong> {hourToDelete.project}</p>
                                    <p><strong>Fecha:</strong> {hourToDelete.date}</p>
                                    <p><strong>Hora de inicio:</strong> {hourToDelete.originalHour.hora_inicio_trabajo}</p>
                                    <p><strong>Hora de fin:</strong> {hourToDelete.originalHour.hora_fin_trabajo}</p>
                                    <p><strong>Total:</strong> {hourToDelete.total} hrs</p>

                                </div>

                            )}
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <div className="button-container">
                            <button
                                type="button"
                                className="cancel-button"
                                disabled={loading}
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                {loading ? 'Esperando...' : 'Cancelar'}

                            </button>
                            <button
                                type="submit"
                                className="confirm-delete-button"
                                disabled={loading}
                            >
                                {loading ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}