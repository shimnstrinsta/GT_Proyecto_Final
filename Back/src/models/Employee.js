const {DataTypes} = require("sequelize")
const sequelize = require("../config/dbconfig")

const Employee = sequelize.define("Employee",{
    id_empleado:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:true
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull:true
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:true
    },
    contrasenia:{
        type: DataTypes.STRING,
        allowNull:true
    },
    ruta_foto:{
        type: DataTypes.STRING,
        allowNull:true
    },
    supervisor:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{    
    tableName: 'empleado',
    timestamps: false
})


module.exports = Employee;