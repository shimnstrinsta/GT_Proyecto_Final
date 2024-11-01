const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("gtimesheet", "root", "fatay2006-2022", {
    host: "localhost",
    dialect: "mysql",
    port: 3306, // Puerto por defecto para MySQL
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false // Cambia a false si no deseas verificar el certificado
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