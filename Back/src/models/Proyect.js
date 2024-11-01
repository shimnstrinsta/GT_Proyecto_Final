const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbconfig")

const Proyect = sequelize.define("Proyect", {
    id_proyecto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_inicio: {
        type: DataTypes.TIME,
        allowNull: true
    },
    fecha_fin: {
        type: DataTypes.TIME,
        allowNull: true
    }

}, {    
    tableName: 'proyecto',
    timestamps: false
})


module.exports = Proyect;

