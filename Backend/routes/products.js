var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');
const upload = require("../middlewares/upload");
const checkFiles = require("../middlewares/checkFiles");

var uploadNew = upload.fields([{ name: 'photos', maxCount: 5 }, { name: 'banner', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }, { name: 'descriptionPhoto', maxCount: 1}]);

router.get('/listAll', productController.getProducts);
router.get('/listOne/:id', productController.getOneProduct);
router.post('/new', uploadNew, checkFiles, productController.newProduct);
router.patch('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;