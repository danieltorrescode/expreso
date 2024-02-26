import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { User } from '../../types.js';
import { settings } from '../../config/settings.js';

// export const getUsers = async (req, res, next) => {
//   const users = await UserModel.find();
//   res.json(users);
// };

export const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  const hash = await generateHash(newUser.password, 10);
  newUser.password = hash;
  return await newUser.save();
};

export const generateHash = (password: string, salt: number) => {
  return bcrypt.hash(password, salt).then((hash: string) => hash);
};

// export const getUser = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserModel.findById(id);
//   res.json(user);
// };

// export const editUser = async (req, res, next) => {
//   const { id } = req.params;
//   const user = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
//   res.json([{ status: 'User Updated' }, id]);
// };

// export const deleteUser = async (req, res, next) => {
//   await UserModel.findByIdAndRemove(req.params.id);
//   res.json({ status: 'User Deleted' });
// };

export const authenticate = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email: email }).exec();
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ data: user }, settings.secret, {
        expiresIn: 60 * 20, //604800 // 1 week
      });

      return {
        success: true,
        token: `Bearer ${token}`,
        text: 'Success',
        user: user,
      };
    } else {
      return {
        success: false,
        text: 'Wrong password',
      };
    }
  } else {
    return {
      success: false,
      text: 'user not found',
    };
  }
};

// export const profile = (req, res, next) => {
//   res.json({ user: req.user, request: req.headers });
// };
