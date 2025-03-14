const multer  = require('multer');

function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error); 
  res.status(err.status || 500);
  res.render('error');
};

module.exports = errorHandler;