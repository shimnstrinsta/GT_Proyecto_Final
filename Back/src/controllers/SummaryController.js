const Proyect = require('../models/Proyect');
const Activity = require('../models/Activity');
const Hour = require('../models/Hour');
const { fn, col, literal } = require("sequelize");


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
      total_horas: result.get('totalHoras')
    })));
  } catch (error) {
    res.status(500).json({ message: "Error al buscar proyectos" })
  }

};

const getAllSummaryProyect = async (req, res) => {
  try {
    const hours = await Hour.findAll({
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
      group: ['Hour.id_proyecto']
    });
    
    const projects = await Proyect.findAll();
    const resultados = []

    projects.forEach(project => {
      const hourData = hours.find(hour => hour.get('nombre') === project.nombre);
  
      const data = {
        nombre: project.nombre,
        fecha_inicio: project.fecha_inicio,
        fecha_fin: project.fecha_fin,
        descripcion: project.descripcion,
        total_horas: hourData ? hourData.get('totalHoras') : 0 // Manejar el caso de que no haya datos
      }
      resultados.unshift(data)
    })
    console.log(resultados)
    res.status(200).json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar proyectos"+error })
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

const getAllSummaryActivity = async (req, res) => {
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

const getAllHoursSummary = async (req, res) => {
  try {
    const resumenHoras = await Hour.findAll({
      attributes: [
        [fn('WEEKDAY', col('fecha')), 'dia_semana'],
        [fn('SUM', col('total')), 'minutos']
      ],      
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
  getAllSummaryProyect,
  getSummaryActivity,
  getAllSummaryActivity,
  getHoursSummary,
  getAllHoursSummary
}