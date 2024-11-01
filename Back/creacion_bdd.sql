create database if not exists GTimesheet;
use gtimesheet;

-- esquema de usuarios
create table empleado (
    id_empleado int primary key auto_increment,
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contrasenia varchar(100),
    ruta_foto varchar(1000)
);

create table supervisor (
    id_supervisor int primary key auto_increment,
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contraseña varchar(100)
    -- foto_perfil VARBINARY(MAX),
    -- ruta_foto varchar(300)
);

create table rel_empleado_supervisor (
    id_rel int primary key auto_increment,
    id_supervisor int,
    id_empleado int
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
    nombre varchar(150),
    descripcion varchar(1500),
    fecha_inicio datetime,
    fecha_fin datetime
);

create table actividad (
    id_actividad int primary key auto_increment,
    actividad varchar(100)
);

-- foreign keys usuario
ALTER TABLE rel_empleado_supervisor
ADD FOREIGN KEY (id_supervisor)
REFERENCES supervisor (id_supervisor);

ALTER TABLE rel_empleado_supervisor
ADD FOREIGN KEY (id_empleado)
REFERENCES empleado (id_empleado);

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_empleado)
REFERENCES empleado (id_empleado);

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_proyecto)
REFERENCES proyecto (id_proyecto);

ALTER TABLE detalle_horas_trabajo
ADD FOREIGN KEY (id_actividad)
REFERENCES actividad (id_actividad);

-- use tempdb;  drop database gtimesheet