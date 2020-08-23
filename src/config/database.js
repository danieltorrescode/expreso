const mongoose = require('mongoose');
const URI = 'mongodb://mongo:27017/mevn';

mongoose.connect(URI, { useNewUrlParser: true ,useFindAndModify:false})
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
