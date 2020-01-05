const express = require('express');

const Router = express.Router();
const { resOK, resError } = require('./public');

// curl - s http://localhost:2000/user

Router.get('/', async (req, res) => {
  resError(res, { error: 'mise user id ' });
});

// curl - s http://localhost:2000/user/123 | jq

Router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    resOK(res, { list: userId });
  } catch (error) {
    resError(res, { error, list: userId });
  }
});

exports.HandleUser = Router;
