/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

console.log('this is db');

mongoose.connect(process.env.DB_NAME, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', () => console.log('connection error'));
db.once('open', () => console.log("we're connected!"));
