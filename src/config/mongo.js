const mongoose = require('mongoose');
const URI = 'mongodb://mongo:27017/expreso';

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
