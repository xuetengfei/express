const express = require('express');

const Router = express.Router();
const { resOK, resError } = require('./public');

Router.get('/', async (req, res) => {
  resError(res, { error: 'mise user id ' });
});

Router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    resOK(res, { list: userId });
  } catch (error) {
    resError(res, { error, list: userId });
  }
});

module.exports = Router;
