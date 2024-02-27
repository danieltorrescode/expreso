const express = require('express');
const router = express.Router();
const passport = require('passport');

const auth = require('./controller');

router.get('/', auth.getUsers);
router.post('/', auth.createUser, auth.authenticate);
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  auth.profile
);
router.get('/:id', auth.getUser);
router.put('/:id', auth.editUser);
router.delete('/:id', auth.deleteUser);
router.post('/login', auth.authenticate);

module.exports = router;
