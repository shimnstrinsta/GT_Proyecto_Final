const Hour = require('../models/Hour');
const Proyect = require('../models/Proyect');
const Activity = require('../models/Activity');
const Employee = require('../models/Employee');

const getHours = async (req, res) => {
    try {
        const hours = await Hour.findAll({
            where: {
                id_empleado: req.params.employee_id                
            },
            include: [
                {
                    model: Proyect,
                    as: 'proyecto', // Nombre del alias definido en el modelo
                    attributes: ['nombre'] // Obtener solo el nombre del proyecto
                },
                {
                    model: Activity,
                    as: 'actividad', // Nombre del alias definido en el modelo
                    attributes: ['nombre'] // Obtener solo el nombre de la actividad
                }
            ]
        });
        console.log(hours)

        

        if (hours) {
            res.status(200).json(hours);
        } else {
            res.status(404).json({ message: "Horas no encontradas" });
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar horas" });
    }
};

const getAllHours = async (req, res) => {
    try {
        const hours = await Hour.findAll({
            include: [
                {
                    model: Proyect,
                    as: 'proyecto', // Nombre del alias definido en el modelo
                    attributes: ['nombre'] // Obtener solo el nombre del proyecto
                },
                {
                    model: Activity,
                    as: 'actividad', // Nombre del alias definido en el modelo
                    attributes: ['nombre'] // Obtener solo el nombre de la actividad
                },
                {
                    model: Employee,
                    as: 'empleado',
                    attributes: ['nombre','apellido','ruta_foto']
                }
            ]
        });

        if (hours) {
            res.status(200).json(hours);
        } else {
            res.status(404).json({ message: "Horas no encontradas" });
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
        where: { nombre: activity }
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
    postHour,
    getAllHours
}


