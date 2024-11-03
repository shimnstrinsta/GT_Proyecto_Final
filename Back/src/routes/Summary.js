const express = require('express')
const router = express.Router()

const summaryController = require('../controllers/SummaryController')

router.get("/project/:employee_id",summaryController.getSummaryProyect)
router.get("/project",summaryController.getAllSummaryProyect)

router.get("/activity/:employee_id",summaryController.getSummaryActivity)
router.get("/activity",summaryController.getAllSummaryActivity)

router.get("/day/:employee_id",summaryController.getHoursSummary )
router.get("/day",summaryController.getAllHoursSummary )

module.exports = router;