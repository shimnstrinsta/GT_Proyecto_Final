const Proyect = require('../models/Proyect');
const Activity = require('../models/Activity');
const { fn, col, literal } = require("sequelize"); 
const Hour = require('../models/Hour');


const getSummaryProyect = async (req, res) => {
    try {
    const resultados = await Hour.findAll({
        attributes: [
          [col('proyecto.nombre'), 'nombre'],
          [fn('SUM', fn('COALESCE', col('Hour.total'), 0)), 'totalMinutos'],
          [literal('FLOOR(SUM(COALESCE(`Hour`.`total`, 0)) / 60)'), 'totalHoras']
        ],
        include: [
          {
            model: Proyect,
            as: 'proyecto',
            attributes: [] 
          }
        ],
        where: {
          id_empleado: req.params.employee_id
        },
        group: ['Hour.id_proyecto']
      });
    
      res.status(200).json(resultados.map(result => ({
        nombre: result.get('nombre'),        
        totalHoras: result.get('totalHoras')
      })));
    } catch (error) {
      console.error("Error al realizar la consulta:", error);
    }
      
};

const getSummaryActivity = async (req, res) => {
  try {
    const resultados = await Hour.findAll({
        attributes: [
            [col('actividad.nombre'), 'nombre'],
            [fn('SUM', fn('COALESCE', col('Hour.total'), 0)), 'totalMinutos'],
            [literal('FLOOR(SUM(COALESCE(`Hour`.`total`, 0)) / 60)'), 'totalHoras']
          ],
          include: [
            {
              model: Activity,
              as: 'actividad',
              attributes: [] 
            }
          ],
          where: {
            id_empleado: req.params.employee_id
          },
          group: ['Hour.id_actividad']
        });

    res.status(200).json(resultados.map(result => ({
      nombre: result.get('nombre'),      
      totalHoras: result.get('totalHoras') 
    })));

  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error al realizar la consulta" });
  }
};

const getHoursSummary = async (req, res) => {
    try {
        const resumenHoras = await Hour.findAll({
            attributes: [
                [fn('WEEKDAY', col('fecha')), 'dia_semana'],
                [fn('SUM', col('total')), 'minutos'] 
            ],
            where: {
                id_empleado: req.params.employee_id 
            },
            group: [fn('WEEKDAY', col('fecha'))], 
            order: [fn('WEEKDAY', col('fecha'))] 
        });
        
        const resultadoFinal = resumenHoras.map(result => ({
            dia_semana: getNombreDia(result.get('dia_semana')), 
            minutos_trabajo: result.get('minutos')
        }));

        if (resultadoFinal.length > 0) {
            res.status(200).json(resultadoFinal);
        } else {
            res.status(404).json({ message: "No se encontraron horas para el empleado" });
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar horas" });
    }
};

// Función para obtener el nombre del día de la semana
const getNombreDia = (dia) => {
    switch (dia) {
        case 0: return 'Lunes';
        case 1: return 'Martes';
        case 2: return 'Miércoles';
        case 3: return 'Jueves';
        case 4: return 'Viernes';
        case 5: return 'Sábado';
        case 6: return 'Domingo';
        default: return 'Desconocido';
    }
};


module.exports = {
    getSummaryProyect,
    getSummaryActivity,
    getHoursSummary
}