const express = require('express');
const router = express.Router();

const apiController = require('./controllers/apiController');

router.get('/usuarios', apiController.buscarTodos);
router.get('/usuario/:codigo', apiController.buscarUm);
router.post('/usuario', apiController.inserir);
router.put('/usuario/:codigo', apiController.alterar);
router.delete('/usuario/:codigo', apiController.excluir);

module.exports = router;