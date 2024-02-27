import express from 'express';
// import { RequestHandler, Response, Request, NextFunction } from 'express';
import * as taskServices from './services';
const router = express.Router();
// const passport = require('passport');
// const task = require('./controller');

router.get('/', async (req, res) => {
  res.json(await taskServices.getAllTasks());
});

router.post(
  '/',
  // passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    // const { name, description } = req.body;
    res.json(await taskServices.createTask({ ...req.body }));
  },
);
router.get(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const { id } = req.params;
    res.json(await taskServices.getTask(id));
  },
);
router.put(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const { id } = req.params;
    // const { name, description } = req.body;
    res.json(await taskServices.editTask(id, { ...req.body }));
  },
);
router.delete(
  '/:id',
  // passport.authenticate('jwt', { session: true }),
  async (req, res) => {
    const { id } = req.params;
    res.json(await taskServices.deleteTask(id));
  },
);

export default router;
