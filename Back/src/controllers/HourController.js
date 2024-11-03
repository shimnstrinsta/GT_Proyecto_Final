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
        res.status(500).json({ message: "Error al insertar hora" });
    });

}

const deleteHour = async (req, res) => {
    try {
        const { hourId } = req.body; // Obtén hourId del cuerpo de la solicitud
        
        const deletedHour = await Hour.destroy({
            where: {
                id_detalle: hourId
            }
        });

        if (deletedHour) {
            res.status(200).json({ message: "Registro eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el registro" });
    }
};

const updateHour = async (req, res) => {
    try {
        const { hourId, proyecto, timeBeggin, timeEnd, activity, activityDescription } = req.body;

        if (!hourId) {
            return res.status(400).json({ message: "ID de hora es requerido" });
        }

        // Obtener IDs de proyecto y actividad
        const proyectData = await Proyect.findOne({
            where: { nombre: proyecto }
        });

        const activityData = await Activity.findOne({
            where: { nombre: activity }
        });

        if (!proyectData || !activityData) {
            return res.status(404).json({ message: "Proyecto o actividad no encontrada" });
        }

        // Calcular el total de horas
        let start = new Date(`1970-01-01T${timeBeggin}`);
        let end = new Date(`1970-01-02T${timeEnd}`);

        if(timeBeggin < timeEnd){
            start = new Date(`1970-01-01T${timeBeggin}`);
            end = new Date(`1970-01-01T${timeEnd}`);
        }

        let diffMs = start - end;

        if (end > start) {
            diffMs = end - start;
        } else {
            diffMs = 24 * 60 * 60 * 1000 + (start - end);
        }

        const total = parseInt(diffMs / 1000 / 60);

        const updatedHour = await Hour.update({
            hora_inicio_trabajo: timeBeggin,
            hora_fin_trabajo: timeEnd,
            descripcion_hora_trabajo: activityDescription,
            id_proyecto: proyectData.id_proyecto,
            id_actividad: activityData.id_actividad,
            total: total
        }, {
            where: {
                id_detalle: hourId
            }
        });

        if (updatedHour[0] === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.status(200).json({ message: "Registro actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el registro" });
    }
};

// Agregar updateHour a los exports
module.exports = {
    getHours,
    postHour,
    getAllHours,
    deleteHour,
    updateHour
};