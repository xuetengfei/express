/* eslint-disable */
const express = require('express');
const cors = require('cors');
const uuid = require('node-uuid');
const fs = require('fs');
const { accessLogger, errorLogger, logDirectory } = require('./public/middleware/morgan');
const { logErrors } = require('./public/middleware/logErrors');
const { clientErrorHandler } = require('./public/middleware/clientErrorHandler');
const { errorHandler } = require('./public/middleware/errorHandler');

const { HandleUser } = require('./routerHandler');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const port = 2000;
const app = express();

app.use([accessLogger, errorLogger]);

function assignId(req, _res, next) {
  req.id = uuid.v4();
  next();
}
app.use(assignId);
app.use(cors());

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

app.use('/user', HandleUser);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.route('*').all((_req, res) => {
  res.json({
    status: 0,
    msg: 'Sorry cant find Relative Router!',
  });
});

// // eslint-disable-next-line no-unused-vars
// app.use((_req, res, _next) => {
//   res.status(404).send('Sorry cant find that!');
// });
// // eslint-disable-next-line no-unused-vars
// app.use((err, _req, res, _next) => {
//   console.error(err.stack);
//   console.log('err: ', err);
//   res.status(500).send('Something broke!');
// });
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
