import { RequestHandler } from 'express';
import UserModel from './models';
import { authenticate, generateHash } from './services';
import { User } from '../../types';

export const getUsers: RequestHandler = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await generateHash(user.password, 10);
  await user.save();
  // next middleware login
  next();
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.json(user);
};

export const editUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  res.json([{ status: 'User Updated' }, id]);
};

export const deleteUser: RequestHandler = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ status: 'User Deleted' });
};

export const login: RequestHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password.toString();

  const user = await UserModel.findOne({ email: email }).exec();
  if (user) {
    // const response = await authenticate(user, password)
    res.json(await authenticate(user, password));
  } else {
    res.json({
      success: false,
      text: 'user not found',
    });
  }
};

// export const profile: RequestHandler = (req, res) => {
//   res.json({ user: req.user, request: req.headers });
// };
