const express = require('express');
const router = express.Router();
const passport = require('passport');
const task= require('./controller');

router.get('/',passport.authenticate('jwt', {session:false}),task.getTasks);
router.post('/', passport.authenticate('jwt', {session:false}),task.createTask);
router.get('/:id', passport.authenticate('jwt', {session:false}),task.getTask);
router.put('/:id', passport.authenticate('jwt', {session:false}),task.editTask);
router.delete('/:id', passport.authenticate('jwt', {session:false}),task.deleteTask);

module.exports = router;
