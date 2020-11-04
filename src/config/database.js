const mongoose = require('mongoose');
const URI = 'mongodb://mongo:27017/mevn';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('mongodb is connected'))
  .catch((err) => console.error(err));

module.exports = mongoose;
