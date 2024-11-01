const express = require('express')
const router = express.Router()

const activityController = require('../controllers/ActivityController')

router.get("/",activityController.getActivities)

module.exports = router;