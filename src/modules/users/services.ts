import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from './models';
import { settings } from '../../config/settings';

export const generateHash = (password: string, salt: number) => {
  return bcrypt.hash(password, salt).then((hash: string) => hash);
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
  }
};
