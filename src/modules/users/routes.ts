import express from 'express';
import passport from 'passport';
import * as userHandler from './handlers';

const router = express.Router();

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  userHandler.profile,
);
router.get('/', userHandler.getUsers);
router.post('/', userHandler.createUser, userHandler.login);
router.get('/:id', userHandler.getUser);
router.put('/:id', userHandler.editUser);
router.delete('/:id', userHandler.deleteUser);
router.post('/login', userHandler.login);

export default router;
