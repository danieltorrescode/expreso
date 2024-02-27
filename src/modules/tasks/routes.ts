import express from 'express';
const router = express.Router();
import * as taskHandler from './handlers';
// const passport = require('passport');
// const task = require('./controller');

router.get(
  '/',
  // passport.authenticate('jwt', { session: true }),
  taskHandler.getTasks,
);
router.post(
  '/',
  // passport.authenticate('jwt', { session: true }),
  taskHandler.createTask,
);
router.get(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  taskHandler.getTask,
);
router.put(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  taskHandler.editTask,
);
router.delete(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  taskHandler.deleteTask,
);

export default router;
