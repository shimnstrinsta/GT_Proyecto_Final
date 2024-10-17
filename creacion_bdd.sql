create database gtimesheet;
go
use gtimesheet;
go
create schema labor;
go
create schema usuario;
go

-- esquema de usuarios
create table usuario.empleado (
    id_empleado int primary key identity(1,1),
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contraseña varchar(100)
    -- foto_perfil VARBINARY(MAX),
    -- ruta_foto varchar(300)
);

create table usuario.supervisor (
    id_supervisor int primary key identity(1,1),
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contraseña varchar(100),
    -- foto_perfil VARBINARY(MAX),
    -- ruta_foto varchar(300)
);

create table usuario.rel_empleado_supervisor (
    id_rel int primary key identity(1,1),
    id_supervisor int,
    id_empleado int
);

create table usuario.detalle_horas_trabajo (
    id_detalle int primary key identity(1,1),
    hora_inicio_trabajo time,
    hora_fin_trabajo time,
    descripcion_hora_trabajo varchar(1500),
	id_empleado int,
	id_actividad int,
	id_proyecto int
);

-- esquema de labores
create table labor.proyecto (
    id_proyecto int primary key identity(1,1),
    nombre varchar(150),
    descripcion varchar(1500),
    fecha_inicio datetime,
    fecha_fin datetime
);

create table labor.actividad (
    id_actividad int primary key identity(1,1),
    actividad varchar(100),
);

-- foreign keys usuario
ALTER TABLE usuario.rel_empleado_supervisor
ADD FOREIGN KEY (id_supervisor)
REFERENCES usuario.supervisor (id_supervisor);

ALTER TABLE usuario.rel_empleado_supervisor
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);

ALTER TABLE usuario.detalle_horas_trabajo
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);

ALTER TABLE usuario.detalle_horas_trabajo
ADD FOREIGN KEY (id_proyecto)
REFERENCES labor.proyecto (id_proyecto);

ALTER TABLE usuario.detalle_horas_trabajo
ADD FOREIGN KEY (id_actividad)
REFERENCES labor.actividad (id_actividad);

-- use tempdb;  drop database gtimesheet