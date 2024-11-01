const express = require('express')
const router = express.Router()

const proyectController = require('../controllers/ProyectController')

router.get("/",proyectController.getProyects)


module.exports = router;