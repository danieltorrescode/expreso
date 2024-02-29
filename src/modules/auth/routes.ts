import express from 'express';
import passport from 'passport';
import * as authHandler from './handlers';
const router = express.Router();

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  authHandler.profile,
);
router.get('/', authHandler.getUsers);
router.post('/', authHandler.createUser, authHandler.login);
router.get('/:id', authHandler.getUser);
router.put('/:id', authHandler.editUser);
router.delete('/:id', authHandler.deleteUser);
router.post('/login', authHandler.login);

export default router;
