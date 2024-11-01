const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbconfig")

const Activity = sequelize.define("Activity", {
    id_actividad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    actividad: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {    
    tableName: 'actividad',
    timestamps: false
})

sequelize.sync()
    .then(() => console.log("Tablas sincronizadas correctamente"))
    .catch(error => console.error("Error al sincronizar las tablas:" + error, error));


module.exports = Activity;

