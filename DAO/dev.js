const express = require('express');

const Router = express.Router();
const { resOK, resError, ValidationErrorFN } = require('./public');

const LanguagesSchema = require('./schema/languages');

Router.get('/', async (_req, res) => {
  try {
    const result = await LanguagesSchema.find();
    resOK(res, { list: result });
  } catch (error) {
    resError(res, { error });
  }
});

Router.post('/add', async (req, res) => {
  try {
    const document = new LanguagesSchema({
      name: req.body.name,
    });
    const saveResult = await document.save();
    resOK(res, { saveResult });
  } catch (error) {
    ValidationErrorFN(res, error);
  }
});

module.exports = Router;
