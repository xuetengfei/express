const mongoose = require('mongoose');

exports.resOK = (res, response) => res.json({ status: 1, resMsg: 'ok', ...response });
exports.resError = (res, response) => res.json({ status: 0, resMsg: 'error', ...response });

exports.isNumber = val => typeof val === 'number';

exports.ValidationErrorFN = (res, e) => {
  if (e instanceof mongoose.Error.ValidationError) {
    return res.status(400).send({ error: 'ValidationError' });
  }
  return res.status(500).send({ error: 'Internal Error' });
};
