var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');
const upload = require("../middlewares/upload");
const checkFiles = require("../middlewares/checkFiles");

var uploadNew = upload.fields([{ name: 'photos', maxCount: 5 }, { name: 'banner', maxCount: 1 }, { name: 'descriptionPhoto', maxCount: 2}]);

router.get('/', productController.getProducts);
router.get('/:id', productController.getOneProduct);
router.post('/', uploadNew, checkFiles, productController.newProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;