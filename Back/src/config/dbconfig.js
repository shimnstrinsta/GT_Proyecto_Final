const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("gtimesheet", "root", "12341234", { 
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexion a la base de datos correcta")
    }
    catch(error){
        console.log("No se pudo conectar con la base de datos "+error)
    }
}

testConnection();

module.exports = sequelize;