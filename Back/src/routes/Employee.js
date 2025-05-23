const express =  require('express')
const router = express.Router()

const employeeController = require('../controllers/EmployeeController')

router.get('/',employeeController.getEmployeers)
router.get("/:email/:password",employeeController.getEmployee)
router.get("/:employee_id",employeeController.getEmployeeProfile)

router.put("/", employeeController.updateEmployee);
router.post("/:email",employeeController.postEmployee)

module.exports = router;