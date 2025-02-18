var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.get('/listAll', userController.getUsers)
router.get('/listOne/:cpf', userController.getOneUser)
router.post('/register', userController.registerUser)
router.patch('/update/:cpf', userController.updateUser)
router.delete('/delete/:cpf', userController.deleteUser)

module.exports = router;