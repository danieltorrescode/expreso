const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const settings = require('../../config/settings');

const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
     });
   
    let hash = await  userCtrl.generateHash(user.password,10)
    user.password = hash;
    await user.save();
    // next middleware userCtrl.authenticate
    next();
};

userCtrl.generateHash = (password,salt) => {
    return bcrypt.hash(password,salt).then(function(hash) {
        return hash
    });
}

userCtrl.getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
    const { id } = req.params;
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
     };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json([{status: 'User Updated'},id]);
};

userCtrl.deleteUser = async (req, res, next) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User Deleted'});
};

userCtrl.authenticate = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password.toString();

    let user = await User.findOne({ email: email },(err, user)=> {
        if(err) throw err;
        if(!user){
            res.json({success:false, text:'user not founded'});
        }
        return user
    });

    userCtrl.comparePassword(password, user.password, (err, isMatch) => {
        if (err) { throw (err); }
        if(isMatch){
            const token = jwt.sign({data: user},settings.secret, {
                expiresIn: 60 * 20//604800 // 1 week
            });

            res.json({
                success: true,
                token: `Bearer ${token}`,
                text: "Success",
                user: user
            });

        } else {
            return res.json({
                success: false, 
                text: 'Wrong password'
            });
        }

    });

};

userCtrl.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) { throw (err); }
        callback(err, isMatch);
    });
};

userCtrl.profile = (req, res, next) => {
    res.json({user: req.user,request:req.headers});
};

module.exports = userCtrl
