import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
// const jwt = require('jsonwebtoken');
// import path from 'path';

import { PORT, SECRET, ORIGINS } from './config/constants';
import { User, UserSql } from './types';
import { DataBaseConnection, NoSQLDBConnection } from './config/databases';

// Routes
import HomeRoutes from './modules/home/routes';
import TasksRoutes from './modules/tasks/routes';
import UsersRoutes from './modules/users/routes';
import AuthRoutes from './modules/auth/routes';

// Server
const server = express();
server.set('port', PORT);

// server.set('views', path.join(__dirname, 'public/pug/dist'));
// server.set('view engine', 'pug');

// Middlewares
server.use(cors(ORIGINS));

server.use(express.json());
server.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }),
);

server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: User | UserSql, done) => {
  done(null, user);
});

import { passportStrategy } from './config/passport';
passportStrategy(passport);

server.use('/', HomeRoutes);
server.use('/tasks', TasksRoutes);
server.use('/users', UsersRoutes);
server.use('/auth', AuthRoutes);

// starting the server
server.listen(server.get('port'), () => {
  console.log(`server on port ${server.get('port')}`);
  DataBaseConnection();
  NoSQLDBConnection();
});
