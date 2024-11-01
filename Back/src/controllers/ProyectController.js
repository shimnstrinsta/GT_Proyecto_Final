const Proyect = require('../models/Proyect');

const getProyects = async (req, res) => {
    try {
        const proyectos = await Proyect.findAll();

        if (proyectos) {
            res.status(200).json(proyectos); // Devuelve el empleado encontrado
        } else {
            res.status(404).json({ message: "Proyectos no encontrados" }); // Manejo del caso donde no se encuentra el empleado
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar proyectos" });
    }
};



module.exports = {
    getProyects
}


