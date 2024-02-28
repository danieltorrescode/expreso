import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserSql as User } from '../../types';
import { SECRET } from '../../config/constants';

export const generateHash = (password: string, salt: number) => {
  return bcrypt.hash(password, salt).then((hash: string) => hash);
};

export const authenticate = async (user: User, password: string) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ data: user }, SECRET, {
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
};
