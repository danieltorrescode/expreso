import { RequestHandler } from 'express';
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
import { postgres as MyDataSource } from '../../config/postgres';
import { User as UserModel } from './models';

export const getUsers: RequestHandler = async (req, res) => {
  const userRepository = MyDataSource.getRepository(UserModel);
  const users = await await userRepository.find();
  res.json(users);
};

// export const createUser: RequestHandler = async (req, res, next) => {
//   const user = UserModel.build({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   let hash = await generateHash(String(user.password), 10);
//   user.password = hash;
//   await user.save();
//   // next middleware export const authenticate: RequestHandler
//   next();
// };

// export const generateHash = (password, salt) => {
//   return bcrypt.hash(password, salt).then(function (hash) {
//     return hash;
//   });
// };

// export const getUser: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserModel.findByPk(id);
//   res.json(user);
// };

// export const editUser: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const user = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   };

//   await UserModel.update({ ...user }, {
//     where: {
//       id: id
//     }
//   });
//   res.json([{ status: 'User Updated' }, id]);
// };

// export const deleteUser: RequestHandler = async (req, res, next) => {
//   await UserModel.destroy({
//     where: {
//       id: req.params.id
//     }
//   });
//   res.json({ status: 'User Deleted' });
// };

// export const authenticate: RequestHandler = async (req, res, next) => {
//   let email = req.body.email;
//   let password = req.body.password.toString();

//   let user = await UserModel.findOne({ where: { email: email } });

//   if (!user) {
//     res.json({ success: false, text: 'user not founded' });
//   }

//   export const comparePassword: RequestHandler(password, user.password, (err, isMatch) => {
//     if (err) {
//       throw err;
//     }
//     if (isMatch) {
//       const token = jwt.sign({ data: user }, settings.secret, {
//         expiresIn: 60 * 20, //604800 // 1 week
//       });

//       res.json({
//         success: true,
//         token: `Bearer ${token}`,
//         text: 'Success',
//         user: user,
//       });
//     } else {
//       return res.json({
//         success: false,
//         text: 'Wrong password',
//       });
//     }
//   });
// };

// export const comparePassword: RequestHandler = function (candidatePassword, hash, callback) {
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if (err) {
//       throw err;
//     }
//     callback(err, isMatch);
//   });
// };

// export const profile: RequestHandler = (req, res, next) => {
//   res.json({ user: req.user, request: req.headers });
// };
