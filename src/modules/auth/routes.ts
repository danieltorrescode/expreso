import express from 'express';
const router = express.Router();
import * as authHandler from './handlers';
// const passport = require('passport');

router.get('/', authHandler.getUsers);
router.post('/', authHandler.createUser, authHandler.login);
// router.get(
//   '/profile',
//   // passport.authenticate('jwt', { session: false }),
//   authHandler.profile,
// );
router.get('/:id', authHandler.getUser);
router.put('/:id', authHandler.editUser);
router.delete('/:id', authHandler.deleteUser);
router.post('/login', authHandler.login);

export default router;
