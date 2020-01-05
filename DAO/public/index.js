const mongoose = require('mongoose');

const SUCCESS = 1;
const FAILURE = 0;

exports.resOK = (res, response) => res.json({ status: SUCCESS, resMsg: 'ok', ...response });
exports.resError = (res, response) => res.json({ status: FAILURE, resMsg: 'error', ...response });

exports.isNumber = val => typeof val === 'number';

exports.ValidationErrorFN = (res, e) => {
  if (e instanceof mongoose.Error.ValidationError) {
    return res.json({
      status: FAILURE,
      resMsg: 'error',
      error: `miss ${e.errors.name.path}`,
    });
  }
  return res.json({
    status: FAILURE,
    resMsg: 'error',
  });
};
