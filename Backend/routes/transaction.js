var express = require('express');
var router = express.Router();

var { authenticateToken } = require('../middlewares/auth.js');
var userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', authenticateToken, userController.getOneUser);
router.post('/', userController.registerUser);
router.patch('/:cpf', authenticateToken, userController.updateUser);
router.delete('/:cpf', authenticateToken, userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;