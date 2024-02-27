import express from 'express';
import * as userServices from './services';
const router = express.Router();
// const passport = require('passport');

router.get('/', async (req, res, next) => {
  res.json(await userServices.getUsers());
});
router.post(
  '/',
  async (req, res, next) => {
    await userServices.createUser({ ...req.body });
    res.locals.email = req.body.email;
    res.locals.password = req.body.password;
    next();
  },
  async (req, res, next) => {
    const email = res.locals.email;
    const password = res.locals.password;
    res.json(await userServices.authenticate(email, password));
  },
);
// router.get(
//   '/profile',
//   // passport.authenticate('jwt', { session: false }),
//   (req, res, next) => {
//     res.json({ user: req.user, request: req.headers });
//   },
// );
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json(await userServices.getUser(id));
});
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  res.json(await userServices.editUser(id, user));
});
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json(await userServices.deleteUser(id));
});
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  res.json(await userServices.authenticate(email, password));
});

export default router;
