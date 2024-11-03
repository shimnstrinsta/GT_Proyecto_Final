import React, { useState, useEffect } from 'react';
import { userService } from '../services/UserService';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

import '../assets/styles/employee.css'

const columns = [
    { id: 'photo', label: '', minWidth: 20 },
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'lastName', label: 'Apellido', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'role', label: 'Rol', minWidth: 100 },
];

function createData(photo,name,lastName,email,role) {    
    return { photo,name,lastName,email,role };
}

export default function Employee() {

    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    useEffect(() => {
        userService.getEmployees()
            .then(response => {                
                if (response.success) {
                    const rows_employees = []                    
                    Array.from(response.employee).forEach(element => {
                        console.log("Element:"+element)
                        let role = "Empleado"
                        if(element.supervisor) role = "Supervisor"
                        rows_employees.unshift(createData(element.ruta_foto, element.nombre, element.apellido, element.email,role))
                    });

                    setRows(rows_employees)
                }

            })
    }, []);


    return (
        <div className='employee_container'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                                if (column.id === 'photo') {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>

                                                            <Avatar alt="Empleado" src={value} />
                                                        </TableCell>
                                                    );
                                                }
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
            </Paper>
        </div>
    );

}


