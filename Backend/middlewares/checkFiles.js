const fs = require('fs').promises
const path = require('path')

async function checkFiles(req, res, next) {
  const requiredFields = ['photos', 'banner', 'descriptionPhoto'];
  const minFiles = {photos: 5, banner: 1, descriptionPhoto: 2};
  var photoDetails = [];

  for (const field in minFiles) {
    if (!req.files[field] || req.files[field].length < minFiles[field]) {
      for (const field of Object.keys(req.files)) {
        for (const file of req.files[field]) {
          const filePath = path.join(path.dirname(__dirname), 'temp', `${file.filename}`);
          await fs.rm(filePath, { recursive: true, force: true });
        }
      }
      return next(Object.assign(new Error(`The minimum number of the following types of photos was not sent: ${field}`), { status: 400 }))
    }
  }

  for (const field of requiredFields) {
    var counter = 1;
    req.files[field].forEach(file => {
      const extension = file.filename.split('.').pop();
      photoDetails.push({
        photo: `${field}${req.files[field].length > 1 ? counter++ : ''}.${extension}`,
        type: field,
      });
    });
  }
  req.body.photos = photoDetails;

  next()
};

module.exports = checkFiles;