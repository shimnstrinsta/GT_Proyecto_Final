const Proyect = require('../models/Proyect');

const getProyects = async (req, res) => {
    try {
        const proyectos = await Proyect.findAll();

        if (proyectos) {
            res.status(200).json(proyectos);
        } else {
            res.status(404).json({ message: "Proyectos no encontrados" }); // Manejo del caso donde no se encuentra el empleado
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar proyectos" });
    }
};

const postProyect = async (req, res) => {

    const {date_beggin,date_end,description} = req.body    
    proyectData = {
        nombre: req.params.name,
        fecha_inicio:date_beggin,
        fecha_fin:date_end,
        descripcion:description
    }

    await Proyect.create(proyectData)
        .then((proyect) => {            
            res.status(200).json({
                success: true,
                proyect: proyect,                
            });
        })
        .catch((error) => {            
            res.status(500).json({
                success: false,                
                message: "Error al crear el empleado en la base de datos."
            });
        });
};


module.exports = {
    getProyects,
    postProyect
}


