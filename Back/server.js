const express = require("express")
const PORT = 3001;
const cors = require('cors');


const app = express()
const employeeRoutes = require("./src/routes/Employee")

// middleware
app.use(cors()); // Habilita CORS para todas las rutas y todos los dominios
app.use(express.json())
app.use('/employee', employeeRoutes)


app.listen(PORT, () => {
    console.log("Servidor escuchando");
})

