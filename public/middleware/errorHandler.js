/* eslint-disable */
const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
};

exports.errorHandler = errorHandler;
