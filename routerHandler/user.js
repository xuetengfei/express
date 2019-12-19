const express = require('express');

const R = express.Router();

R.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    res.json({
      status: 1,
      list: userId,
    });
    // res.status(200).json({ error: 'message' });
  } catch (error) {
    res.json({
      status: 0,
      list: userId,
      msg: 'error',
      error,
    });
  }
});

/**
    不要使用module.exports的默认导出方式
    module.exports = R
*/

exports.HandleUser = R;
