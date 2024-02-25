import express from 'express';
// const cors = require('cors');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
const app = express();

// const path = require('path');

import { postgresConnect } from './config/postgres.ts';
import mongoConnect from './config/mongo.ts';
mongoConnect();
postgresConnect();
import { settings } from './config/settings.ts';

// const session = require('express-session')

// app.set('views', path.join(__dirname, 'public/pug/dist'));
// app.set('view engine', 'pug');

// Settings
app.set('port', process.env.PORT || settings.port);

// Middlewares
// app.use(cors(settings.origins));

app.use(express.json());
// app.use(session({
//   secret: settings.secret,
//   resave: false,
//   saveUninitialized: true,
//   // cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// require('./config/passport')(passport);

// Routes
import HomeRoutes from './api/home/routes.ts';
app.use('/', HomeRoutes);
// app.use('/api/users', require('./api/users/routes'));
// app.use('/api/tasks', require('./api/tasks/routes'));
// app.use('/api/auth', require('./api/auth/routes'));

app.get('/hello', (_req, res) => {
  res.send('Hello World!');
});
// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
  // postgres();
  // dbSync();
});
