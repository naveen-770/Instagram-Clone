/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
const { MONGOURI } = require('./keys');

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});

mongoose.connection.on('error', (err) => {
  console.log('error connecting', err);
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on ', PORT);
});
