const express = require('express')
const router = express.Router()

const hourController = require('../controllers/HourController')

router.get("/",hourController.getAllHours)
router.get("/:employee_id",hourController.getHours)
router.post("/:employee_id",hourController.postHour)
router.delete("/", hourController.deleteHour);
router.put("/update", hourController.updateHour)
module.exports = router;