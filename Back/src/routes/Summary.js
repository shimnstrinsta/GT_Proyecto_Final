const express = require('express')
const router = express.Router()

const summaryController = require('../controllers/SummaryController')

router.get("/proyect/:employee_id",summaryController.getSummaryProyect)
router.get("/activity/:employee_id",summaryController.getSummaryActivity)
router.get("/day/:employee_id",summaryController.getHoursSummary )

module.exports = router;