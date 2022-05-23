const express = require('express');
const router = express.Router();
const passport = require('passport');
const task = require('./controller');

router.get(
  '/',
  passport.authenticate('jwt', { session: true }),
  task.getTasks
);
router.post(
  '/',
  passport.authenticate('jwt', { session: true }),
  task.createTask
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  task.getTask
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  task.editTask
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: true }),
  task.deleteTask
);

module.exports = router;
