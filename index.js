const express = require('express');
const cors = require('cors');
const uuid = require('node-uuid');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 2000;
const app = express();

const DAO = require('./DAO');

const { logErrors } = require('./public/middleware/logErrors');
const { errorHandler } = require('./public/middleware/errorHandler');
const { clientErrorHandler } = require('./public/middleware/clientErrorHandler');
const { accessLogger, errorLogger, logDirectory } = require('./public/middleware/morgan');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

app.use([accessLogger, errorLogger]);

function assignId(req, _res, next) {
  req.id = uuid.v4();
  next();
}
app.use(assignId);
app.use(cors());
app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/static`));
const cb0 = (_req, _res, next) => {
  console.log('CB0');
  next();
};

const cb1 = (_req, _res, next) => {
  console.log('CB1');
  next();
};

const cb2 = (_req, res) => {
  res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);
app.get('/', (_req, res) => res.send('Hello World!'));

app
  .route('/book')
  .get((_req, res) => {
    res.send('Get a random book');
  })
  .post((_req, res) => {
    res.send('Add a book');
  });

app.get('/books/:id', (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.sendStatus(400).json({
      error: 'Missing id',
    });
  }
});

app.use('/user', DAO.HandleUser);
app.use('/dev', DAO.HandleDev);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
require('./db');

app.route('*').all((_req, res) => {
  res.json({
    status: 0,
    msg: 'Sorry cant find Relative Router!',
  });
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
