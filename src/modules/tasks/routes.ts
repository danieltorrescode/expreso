import express from 'express';
import passport from 'passport';
import * as taskHandler from './handlers';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: true }),
  taskHandler.getTasks,
);
router.post(
  '/',
  passport.authenticate('jwt', { session: true }),
  taskHandler.createTask,
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  taskHandler.getTask,
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  taskHandler.editTask,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  taskHandler.deleteTask,
);

export default router;
