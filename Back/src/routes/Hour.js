const express = require('express')
const router = express.Router()

const hourController = require('../controllers/HourController')

router.get("/:employee_id",hourController.getHours)
router.post("/:employee_id",hourController.postHour)

module.exports = router;