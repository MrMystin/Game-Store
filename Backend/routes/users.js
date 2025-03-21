var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:cpf', userController.getOneUser);
router.post('/', userController.registerUser);
router.patch('/:cpf', userController.updateUser);
router.delete('/:cpf', userController.deleteUser);

module.exports = router;