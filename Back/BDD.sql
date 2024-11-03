drop database if exists GTimesheet;
create database if not exists GTimesheet;
use gtimesheet;

-- esquema de usuarios
create table empleado (
    id_empleado int primary key auto_increment,
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contrasenia varchar(100),
    ruta_foto varchar(1000),
    supervisor bit(1) DEFAULT b'0'
);

create table detalle_horas_trabajo (
    id_detalle int primary key auto_increment,
    hora_inicio_trabajo time,
    hora_fin_trabajo time,
    descripcion_hora_trabajo varchar(1500),
	id_empleado int,
	id_actividad int,
	id_proyecto int,
    fecha date,
    total int
);

-- esquema de labores
create table proyecto (
    id_proyecto int primary key auto_increment,
    nombre varchar(150) unique,
    descripcion varchar(1500),
    fecha_inicio date,
    fecha_fin date
);

create table actividad (
    id_actividad int primary key auto_increment,
    nombre varchar(100)
);

-- foreign keys usuario

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_empleado)
REFERENCES empleado (id_empleado);

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_proyecto)
REFERENCES proyecto (id_proyecto);

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_actividad)
REFERENCES actividad (id_actividad);

-- Datos de prueba para la tabla empleado
INSERT INTO empleado (nombre, apellido, email, contrasenia, ruta_foto, supervisor) VALUES
('Bautista', 'lindo', 'bautilindo@gmail.com', '1234', 'https://randomfox.ca/images/41.jpg', b'1'),  -- Supervisor
('David', 'lindoperonotanto', 'david@hola.com', '1234', 'https://images.dog.ceo/breeds/pug/DSCF7495-2.jpg', b'0'),
('Juan', 'Perez', 'juan.perez@gmail.com', 'pass123', 'https://randomfox.ca/images/108.jpg', b'0'),
('Laura', 'Diaz', 'laura.diaz@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg', b'0'),
('Carlos', 'Lopez', 'carlos.lopez@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/shiba/shiba-4.jpg', b'0'),
('Marta', 'Sanchez', 'marta.sanchez@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/bouvier/n02106382_3770.jpg', b'0'),
('Pedro', 'Ramirez', 'pedro.ramirez@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20191130_160405.jpg', b'0'),
('Sofia', 'Fernandez', 'sofia.fernandez@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/hound-english/n02089973_2345.jpg', b'0'),
('Diego', 'Martinez', 'diego.martinez@gmail.com', 'pass123', 'https://randomfox.ca/images/42.jpg', b'0'),
('Lucia', 'Garcia', 'lucia.garcia@gmail.com', 'pass123', 'https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20200205_163615.jpg', b'0');

-- Datos de prueba para la tabla proyecto
INSERT INTO proyecto (nombre, descripcion, fecha_inicio, fecha_fin) VALUES
('Proyecto A', 'Descripción del proyecto A', '2024-01-01', '2024-12-31'),
('Proyecto B', 'Descripción del proyecto B', '2024-02-01', '2024-12-31'),
('Proyecto C', 'Descripción del proyecto C', '2024-03-01', '2024-12-31'),
('Proyecto D', 'Descripción del proyecto D', '2024-04-01', '2024-12-31'),
('Proyecto E', 'Descripción del proyecto E', '2024-05-01', '2024-12-31'),
('Proyecto F', 'Descripción del proyecto F', '2024-06-01', '2024-12-31'),
('Proyecto G', 'Descripción del proyecto G', '2024-07-01', '2024-12-31'),
('Proyecto H', 'Descripción del proyecto H', '2024-08-01', '2024-12-31'),
('Proyecto I', 'Descripción del proyecto I', '2024-09-01', '2024-12-31'),
('Proyecto J', 'Descripción del proyecto J', '2024-10-01', '2024-12-31');

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
('09:00:00', '13:00:00', 'Trabajo en el proyecto A', 1, 1, 1, '2024-11-01', 4*60),
('14:00:00', '18:00:00', 'Revisión de código para el proyecto B', 2, 2, 2, '2024-11-01', 4*60),
('09:00:00', '13:00:00', 'Planificación del proyecto C', 3, 3, 3, '2024-11-01', 4*60),
('14:00:00', '18:00:00', 'Documentación del proyecto D', 4, 4, 4, '2024-11-01', 4*60),
('09:00:00', '13:00:00', 'Pruebas en el proyecto E', 5, 5, 5, '2024-11-01', 4*60),
('14:00:00', '18:00:00', 'Soporte técnico para el proyecto F', 6, 6, 6, '2024-11-01', 4*60),
('09:00:00', '13:00:00', 'Análisis de requisitos para el proyecto G', 7, 7, 7, '2024-11-01', 4*60),
('14:00:00', '18:00:00', 'Implementación de funcionalidad en el proyecto H', 8, 8, 8, '2024-11-01', 4*60),
('09:00:00', '13:00:00', 'Corrección de bugs en el proyecto I', 9, 9, 9, '2024-11-01', 4*60),
('14:00:00', '18:00:00', 'Reunión de revisión del proyecto J', 10, 10, 10, '2024-11-01', 4*60);
