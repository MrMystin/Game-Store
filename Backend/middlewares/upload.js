const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = path.join(path.dirname(__dirname), `temp`);
    fs.mkdir(folderPath, { recursive: true }, () => {});
    cb(null, './temp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado. Apenas imagens são permitidas.'), false);
  }
};

const upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter });

module.exports = upload;