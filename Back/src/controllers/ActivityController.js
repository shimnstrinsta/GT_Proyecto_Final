const Activity = require('../models/Activity');

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();

        if (activities) {
            res.status(200).json(activities); // Devuelve el empleado encontrado
        } else {
            res.status(404).json({ message: "Actividades no encontrados" }); // Manejo del caso donde no se encuentra el empleado
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar proyectos" });
    }
};


module.exports = {
    getActivities     
}


