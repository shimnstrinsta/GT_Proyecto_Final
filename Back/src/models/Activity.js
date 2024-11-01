const { DataTypes } = require("sequelize")
const sequelize = require("../config/dbconfig")

const Activity = sequelize.define("Activity", {
    id_actividad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {    
    tableName: 'actividad',
    timestamps: false
})

module.exports = Activity;

