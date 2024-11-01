const express =  require('express')
const router = express.Router()

const employeeController = require('../controllers/EmployeeController')

router.get('/',employeeController.getEmployeers)
router.get("/:email/:password",employeeController.getEmployee)
router.get("/:employee_id",employeeController.getEmployeeProfile)

router.post("/:email",employeeController.postEmployee)
router.put("/", employeeController.updateEmployee); 

module.exports = router;