const Hour = require('../models/Hour');
const Proyect = require('../models/Proyect');
const Activity = require('../models/Activity');

const getHours = async (req, res) => {
    try {
        const hours = await Hour.findAll({
            where: {
                id_empleado: req.params.employee_id,                
            }
        });

        if (hours) {
            res.status(200).json(hours); // Devuelve el empleado encontrado
        } else {
            res.status(404).json({ message: "Empleado no encontrado" }); // Manejo del caso donde no se encuentra el empleado
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar horas" });
    }
};

const postHour = async (req, res) => {    
    const { proyect, date, time_init, time_end, total, activity, summary } = req.body;
    

    const id_proyect = await Proyect.findOne({
        where: { nombre: proyect }
    });

    const id_activity = await Activity.findOne({
        where: { actividad: activity }
    });


    const hour = {
        hora_inicio_trabajo: time_init,
        hora_fin_trabajo:time_end,
        descripcion_hora_trabajo: summary,
        id_empleado: req.params.employee_id,
        id_proyecto: id_proyect.dataValues.id_proyecto,
        id_actividad: id_activity.dataValues.id_actividad,
        total:total,
        fecha:date
    }

    Hour.create(
        hour
    )
    .then(() => {        
        res.status(200).json(hour); 
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ message: "Error al insertar hora" });
    });

}

module.exports = {
    getHours,
    postHour    
}


