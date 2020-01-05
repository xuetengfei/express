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

/**

➜  curl -s -H "Content-Type: application/json"  \
-d '{"name":"js"}' \
-X POST "http://localhost:2000/dev/add" | jq
{
  "date": "2020-01-05T09:23:09.909Z",
  "_id": "5e11ab29eb0ae874fa4eb35c",
  "name": "js",
  "__v": 0
}

*/
Router.post('/add', async (req, res) => {
  try {
    const Language = new LanguagesSchema({
      name: req.body.name,
    });
    const saveResult = await Language.save();
    res.json(saveResult);
  } catch (error) {
    // res.json(ErrorRes({ error }));
    ValidationErrorFN(res, error);
  }
});

exports.HandleDev = Router;
