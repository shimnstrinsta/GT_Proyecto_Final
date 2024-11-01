const express = require("express")
const PORT = 3001;
const cors = require('cors');


const app = express()
const employeeRoutes = require("./src/routes/Employee")
const hourRoutes = require("./src/routes/Hour")
const proyectRoutes = require("./src/routes/Proyect")
const activityRoutes = require("./src/routes/Activity")
const summaryRoutes = require("./src/routes/Summary")

// middleware
app.use(cors()); // Habilita CORS para todas las rutas y todos los dominios
app.use(express.json())
app.use('/employee', employeeRoutes)
app.use('/hour', hourRoutes)
app.use('/proyect', proyectRoutes)
app.use('/activity', activityRoutes)
app.use('/summary', summaryRoutes)


app.listen(PORT, () => {
    console.log("Servidor escuchando");
})

