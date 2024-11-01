import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { hourService } from '../services/HourService';

const columns = [
  { id: "project", label: "Proyecto", minWidth: 120 },
  { id: "date", label: "Fecha", minWidth: 70 },
  { id: "time_init", label: "Hora inicio", minWidth: 70 },
  { id: "time_end", label: "Hora fin", minWidth: 70 },
  { id: "total", label: "Total (hrs)", minWidth: 70 },
  { id: "activity", label: "Actividad", minWidth: 100 },
  { id: "description", label: "Resumen", minWidth: 250 },
];

function createData(
  project,
  date,
  time_init,
  time_end,
  total,
  activity,
  description
) {
  return { project, date, time_init, time_end, total, activity, description };
}


export default function ManageHour() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);


  useEffect(() => {

    hourService.get()
      .then(response => {

        if (response.success) {
          const rows_hours = []

          Array.from(response.hours).forEach(element => {
            const minutos = element.total
            const horas = Math.floor(minutos / 60).toString().padStart(2, '0'); // Asegura dos cifras en horas
            const minutosRestantes = (minutos % 60).toString().padStart(2, '0'); // Asegura dos cifras en minutos

            const total = `${horas}:${minutosRestantes}`

            rows_hours.unshift(createData(element.proyecto.nombre,element.fecha,element.hora_inicio_trabajo,element.hora_fin_trabajo,total,element.actividad.nombre,element.descripcion_hora_trabajo))
          });

          setRows(rows_hours)
        }
        else {
        }

      })
      .catch(error => {

      })

  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h1>Horas</h1>
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
        <button onClick={() => navigate("/hour/insert")}>Insertar horas</button>
      </Paper>
    </div>
  );
}
