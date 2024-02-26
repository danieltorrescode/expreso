import express from 'express';
import * as userServices from '../services/userServices';
const router = express.Router();
// const passport = require('passport');

// router.get('/', userServices.getUsers);
// router.post('/', userServices.createUser, userServices.authenticate);
router.post(
  '/',
  async (req, res, next) => {
    res.locals.user = await userServices.createUser({ ...req.body });
    next();
  },
  async (req, res, next) => {
    console.log('res.locals.user');
    console.log(res.locals.user);
    const { email, password } = res.locals.user;
    res.json(await userServices.authenticate(email, password));
  },
);
// router.get(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   userServices.profile,
// );
// router.get('/:id', userServices.getUser);
// router.put('/:id', userServices.editUser);
// router.delete('/:id', userServices.deleteUser);
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  res.json(await userServices.authenticate(email, password));
});

export default router;
