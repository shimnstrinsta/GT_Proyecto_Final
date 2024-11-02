const express = require('express')
const router = express.Router()

const proyectController = require('../controllers/ProyectController')

router.get("/",proyectController.getProyects)
router.post("/:name",proyectController.postProyect)

module.exports = router;