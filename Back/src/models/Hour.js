const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbconfig")


const Hour = sequelize.define("Hour", {
    id_detalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hora_inicio_trabajo: {
        type: DataTypes.TIME,
        allowNull: true
    },
    hora_fin_trabajo: {
        type: DataTypes.TIME,
        allowNull: true
    },
    descripcion_hora_trabajo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'detalle_horas_trabajo',
    timestamps: false
})


Hour.belongsTo(require('./Proyect'), { foreignKey: 'id_proyecto', as: 'proyecto' });
Hour.belongsTo(require('./Activity'), { foreignKey: 'id_actividad', as: 'actividad' });

module.exports = Hour;

