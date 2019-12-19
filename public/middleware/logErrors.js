/* eslint-disable */

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

exports.logErrors = logErrors;
