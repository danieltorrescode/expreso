import express from 'express';
import * as userHandler from './handlers';
const router = express.Router();
// const passport = require('passport');

router.get('/', userHandler.getUsers);
router.post('/', userHandler.createUser, userHandler.login);
router.get('/:id', userHandler.getUser);
router.put('/:id', userHandler.editUser);
router.delete('/:id', userHandler.deleteUser);
router.post('/login', userHandler.login);
// router.get(
//   '/profile',
//   // passport.authenticate('jwt', { session: false }),
//   userHandler.profile,
// );

export default router;
