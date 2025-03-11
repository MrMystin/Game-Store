const checkFiles = (req, res, next) => {
  const files = req.files;
  const requiredFields = ['photos', 'banner', 'thumbnail', 'descriptionPhoto'];
  var photoDetails = [];
  let photoCounter = 1;

  for (const field of requiredFields) {
    if (!files[field] || files[field].length === 0 || (field === 'photos' && files[field].length !== 5)) {
      return res.sendStatus(400);
    }

    files[field].forEach(file => {
      const extension = file.originalname.split('.').pop();
      photoDetails.push({
        photo: `${field}${field === 'photos' ? photoCounter++ : ''}.${extension}`,
        type: field,
      });
    });
    
    req.photoDetails = photoDetails;
  }

  next()
};

module.exports = checkFiles;