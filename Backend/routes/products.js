var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')

router.get('/listAll', productController.getProducts)
router.get('/listOne/:id', productController.getOneProduct)
router.post('/new', productController.newProduct)
router.patch('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)

module.exports = router;