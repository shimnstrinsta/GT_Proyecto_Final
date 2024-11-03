-- Selecciona la base de datos
USE gtimesheet;

-- Datos de prueba para la tabla empleado
INSERT INTO empleado (nombre, apellido, email, contrasenia, ruta_foto, supervisor) VALUES
('bauti', 'lindo', 'bautilindo@gmail.com', '1234', 'https://via.placeholder.com/150', b'1'),  -- Supervisor
('david', 'lindoperonotanto', 'ana.gomez@gmail.com', '1234', 'https://via.placeholder.com/150', b'0'),
('Juan', 'Perez', 'juan.perez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Laura', 'Diaz', 'laura.diaz@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Carlos', 'Lopez', 'carlos.lopez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Marta', 'Sanchez', 'marta.sanchez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Pedro', 'Ramirez', 'pedro.ramirez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Sofia', 'Fernandez', 'sofia.fernandez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Diego', 'Martinez', 'diego.martinez@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0'),
('Lucia', 'Garcia', 'lucia.garcia@gmail.com', 'pass123', 'https://via.placeholder.com/150', b'0');

-- Datos de prueba para la tabla proyecto
INSERT INTO proyecto (nombre, descripcion, fecha_inicio, fecha_fin) VALUES
('Proyecto A', 'Descripción del proyecto A', '2024-01-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto B', 'Descripción del proyecto B', '2024-02-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto C', 'Descripción del proyecto C', '2024-03-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto D', 'Descripción del proyecto D', '2024-04-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto E', 'Descripción del proyecto E', '2024-05-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto F', 'Descripción del proyecto F', '2024-06-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto G', 'Descripción del proyecto G', '2024-07-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto H', 'Descripción del proyecto H', '2024-08-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto I', 'Descripción del proyecto I', '2024-09-01 08:00:00', '2024-12-31 17:00:00'),
('Proyecto J', 'Descripción del proyecto J', '2024-10-01 08:00:00', '2024-12-31 17:00:00');

-- Datos de prueba para la tabla actividad
INSERT INTO actividad (nombre) VALUES
('Desarrollo de Software'),
('Revisión de Código'),
('Planificación de Proyecto'),
('Documentación'),
('Pruebas'),
('Soporte'),
('Análisis de Requisitos'),
('Implementación de Funcionalidad'),
('Corrección de Bugs'),
('Reuniones');

-- Datos de prueba para la tabla detalle_horas_trabajo
INSERT INTO detalle_horas_trabajo (hora_inicio_trabajo, hora_fin_trabajo, descripcion_hora_trabajo, id_empleado, id_actividad, id_proyecto, fecha, total) VALUES
('09:00:00', '13:00:00', 'Trabajo en el proyecto A', 1, 1, 1, '2024-11-01', 4),
('14:00:00', '18:00:00', 'Revisión de código para el proyecto B', 2, 2, 2, '2024-11-01', 4),
('09:00:00', '13:00:00', 'Planificación del proyecto C', 3, 3, 3, '2024-11-01', 4),
('14:00:00', '18:00:00', 'Documentación del proyecto D', 4, 4, 4, '2024-11-01', 4),
('09:00:00', '13:00:00', 'Pruebas en el proyecto E', 5, 5, 5, '2024-11-01', 4),
('14:00:00', '18:00:00', 'Soporte técnico para el proyecto F', 6, 6, 6, '2024-11-01', 4),
('09:00:00', '13:00:00', 'Análisis de requisitos para el proyecto G', 7, 7, 7, '2024-11-01', 4),
('14:00:00', '18:00:00', 'Implementación de funcionalidad en el proyecto H', 8, 8, 8, '2024-11-01', 4),
('09:00:00', '13:00:00', 'Corrección de bugs en el proyecto I', 9, 9, 9, '2024-11-01', 4),
('14:00:00', '18:00:00', 'Reunión de revisión del proyecto J', 10, 10, 10, '2024-11-01', 4);




/*

select * from detalle_horas_trabajo
select * from actividad
select * from empleado

select 
	a.nombre,p.nombre,e.nombre, d.hora_inicio_trabajo,d.hora_fin_trabajo,d.total,d.descripcion_hora_trabajo,d.fecha
from 
	detalle_horas_trabajo d
join
	actividad a
on
	a.id_actividad = d.id_actividad
join
	empleado e
on
	e.id_empleado = d.id_empleado
join
	proyecto p
on
	p.id_proyecto = d.id_proyecto
