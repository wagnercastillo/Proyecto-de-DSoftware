const {
    Router
} = require('express');
const router = Router();

import * as frecuenciaControllers from '../controllers/frecuencia.controller'
import {
    verifyToken
} from '../middlewars'

router.get('/Administrador', frecuenciaControllers.Principal)

router.get('/guardarfrecuencia/add', frecuenciaControllers.getFrecuenciaPrincipal)

router.post('/guardarfrecuencia/add', frecuenciaControllers.createFrecuencia)

router.get('/enablefrecuencia/:id', frecuenciaControllers.enabledFrecuencia)

router.get('/frecuenciaEdit/:id', frecuenciaControllers.updateFrecuenciaById)

router.post('/frecuenciaEdit/:id', frecuenciaControllers.editarFrecuenciaById)

router.get('/frecuencia/rutas/:id', frecuenciaControllers.asignarRutas)

module.exports = router;