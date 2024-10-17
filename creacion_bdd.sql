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
    -- foto VARBINARY(MAX),
    -- ruta_foto varchar(300)
);

create table usuario.supervisor (
    id_supervisor int primary key identity(1,1),
    nombre varchar(100),
    apellido varchar(100),
    email varchar(200),
    contraseña varchar(100)
    -- foto VARBINARY(MAX),
    -- ruta_foto varchar(300)
);

create table usuario.rel_empleado_supervisor (
    id_rel int primary key identity(1,1),
    id_supervisor int,
    id_empleado int
);

create table usuario.rel_proyecto_empleado (
    id_rel int primary key identity(1,1),
    id_empleado int,
    id_proyecto int
);

create table usuario.rel_empleado_tarea (
    id_asignacion_empleado_tarea int primary key identity(1,1),
    id_tarea int,
    id_empleado int
);

create table usuario.detalle_horas_trabajo (
    id_detalle int primary key identity(1,1),
    id_asignacion_empleado_tarea int,
    hora_inicio_trabajo time,
    hora_fin_trabajo time,
    descripcion_hora_trabajo varchar(1500)
);

-- esquema de labores
create table labor.proyecto (
    id_proyecto int primary key identity(1,1),
    nombre varchar(150),
    descripcion varchar(1500),
    fecha_inicio datetime,
    fecha_fin datetime
);

create table labor.tarea (
    id_tarea int primary key identity(1,1),
    descripcion varchar(1500),
    fecha_inicio datetime,
    fecha_fin datetime
);

create table labor.rel_proyecto_tarea (
    id_rel int primary key identity(1,1),
    id_proyecto int,
    id_tarea int
);

-- foreign keys usuario
ALTER TABLE usuario.rel_empleado_supervisor
ADD FOREIGN KEY (id_supervisor)
REFERENCES usuario.supervisor (id_supervisor);

ALTER TABLE usuario.rel_empleado_supervisor
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);

ALTER TABLE usuario.rel_proyecto_empleado
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);

ALTER TABLE usuario.rel_proyecto_empleado
ADD FOREIGN KEY (id_proyecto)
REFERENCES labor.proyecto (id_proyecto);


ALTER TABLE usuario.rel_empleado_tarea
ADD FOREIGN KEY (id_tarea)
REFERENCES labor.tarea (id_tarea);

ALTER TABLE usuario.rel_empleado_tarea
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);

ALTER TABLE usuario.rel_empleado_tarea
ADD FOREIGN KEY (id_empleado)
REFERENCES usuario.empleado (id_empleado);


ALTER TABLE usuario.detalle_horas_trabajo
ADD FOREIGN KEY (id_asignacion_empleado_tarea)
REFERENCES usuario.rel_empleado_tarea (id_asignacion_empleado_tarea);


-- foreign keys labor

ALTER TABLE labor.rel_proyecto_tarea
ADD FOREIGN KEY (id_proyecto)
REFERENCES labor.proyecto (id_proyecto);


ALTER TABLE labor.rel_proyecto_tarea
ADD FOREIGN KEY (id_tarea)
REFERENCES labor.tarea (id_tarea);



-- use tempdb;  drop database gtimesheet


