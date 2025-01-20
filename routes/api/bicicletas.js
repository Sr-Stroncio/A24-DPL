const express = require('express');
const router = express.Router();
const BicicletaControllerAPI = require('../../controllers/api/BicicletaControllerAPI');

router.get('/', BicicletaControllerAPI.bicicleta_list);
router.post('/', BicicletaControllerAPI.bicicleta_create);
router.put('/:id', BicicletaControllerAPI.bicicleta_update);
router.delete('/:id', BicicletaControllerAPI.bicicleta_delete);

module.exports = router;
