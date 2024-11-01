const Employee = require('../models/Employee');
const { Op } = require('sequelize');
const getProfileImage = require('../services/RandomImageService');

const getEmployeers = async (req, res) => {
    try {
        const employers = await Employee.findAll();
        res.status(200).json(employers)
    }
    catch (error) {        
        res.status(500).json({ message: error })
    }
}

const getEmployee = async (req, res) => {
    try {        

        const employee = await Employee.findOne({
            where: {
                [Op.or]: [
                    { email: req.params.email },
                    { nombre: req.params.email } 
                ],
                contrasenia: req.params.password
            }
        });
        
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Empleado no encontrado" });
        }
    } catch (error) {        
        console.log(error)
        res.status(500).json({ message: "Error al buscar el empleado" });
    }
};


const postEmployee = async (req, res) => {
    try {
        const { nombre, apellido, contrasenia } = req.body;

        const email = req.params.email;        

        console.log(`${nombre} ${apellido} ${contrasenia} ${email}`)

        const { success, url, error } = await getProfileImage();

        const employeeData = {
            nombre,
            apellido,
            email,
            contrasenia,
            ruta_foto: url
        };

        await Employee.create(employeeData)
            .then((employee) => {
                console.log("Empleado creado exitosamente");
                res.status(200).json({
                    success: true,
                    employee: employee,
                    message: "Creación de cuenta exitosa!"
                });
            })
            .catch((error) => {
                console.error("Error al crear el empleado en la base de datos:", error);
                res.status(500).json({
                    success: false,
                    employee: null,
                    message: "Error al crear el empleado en la base de datos."
                });
            });

    }
    catch (error) {
    
        res.status(500).json({
            success: false,
            message: "Error al crear el empleado: " + error.message
        });
    }
};


const getEmployeeProfile = async (req, res) => {
    try {

        const employee = await Employee.findOne({
            where: {
                id_empleado: req.params.employee_id
            }
        });
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Empleado no encontrado" });
        }
    } catch (error) {        
        res.status(500).json({ message: "Error al buscar el empleado " +error});
    }
};

const updateEmployee = async (req, res) => {
    const { id_empleado, nombre, apellido, email, contrasenia } = req.body;

    Employee.findByPk(id_empleado)
        .then((employee) => {
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: "Empleado no encontrado"
                });
            }

            // Actualizar los campos del empleado
            return employee.update({ nombre, apellido, email, contrasenia });
        })
        .then((updatedEmployee) => {
            console.log("Empleado actualizado exitosamente");
            res.status(200).json({
                success: true,
                employee: updatedEmployee,
                message: "Datos de empleado actualizados exitosamente"
            });
        })
        .catch((error) => {
            console.error("Error al actualizar el empleado:", error);
            res.status(500).json({
                success: false,
                employee: null,
                message: "Error al actualizar el empleado en la base de datos."
            });
        });
};

module.exports = {
    getEmployeers,
    getEmployee,
    postEmployee,
    getEmployeeProfile,
    updateEmployee
};