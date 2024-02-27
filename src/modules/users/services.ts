import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from './models';
import { User } from '../../types';
import { settings } from '../../config/settings';

export const getUsers = async () => {
  return await UserModel.find();
};

export const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  const hash = await generateHash(newUser.password, 10);
  newUser.password = hash;
  return await newUser.save();
};

export const generateHash = (password: string, salt: number) => {
  return bcrypt.hash(password, salt).then((hash: string) => hash);
};

export const getUser = async (id: string) => {
  return await UserModel.findById(id);
};

export const editUser = async (id: string, user: User) => {
  await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  return [{ status: 'User Updated' }, id];
};

export const deleteUser = async (id: string) => {
  const success = await UserModel.findByIdAndDelete(id);
  return { success: success, status: 'User Deleted' };
};

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
