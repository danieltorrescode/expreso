const mongoose = require('mongoose');
const settings = require('./settings');
const URI = settings.mongo;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) =>
    console.log('mongodb connection has been established successfully.')
  )
  .catch((err) => console.error(err));

module.exports = mongoose;
