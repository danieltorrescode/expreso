const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('./controller');

router.get('/', user.getUsers);
router.post('/', user.createUser,user.authenticate);
router.get('/profile',passport.authenticate('jwt', {session:false}),user.profile);
router.get('/:id', user.getUser);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);
router.post('/login', user.authenticate);


module.exports = router;
