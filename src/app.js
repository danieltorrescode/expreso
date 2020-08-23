const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();

const path = require('path');

const { mongoose } = require('./config/database');
const settings = require('./config/settings');

app.set('views', path.join(__dirname, 'public/pug/dist'));
app.set('view engine', 'pug');

// Settings
app.set('port', process.env.PORT || settings.port);

// Middlewares
app.use(cors(settings.origins));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/', require('./api/home/routes'));
app.use('/api/mevn/users', require('./api/users/routes'));
app.use('/api/mevn/tasks', require('./api/tasks/routes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
