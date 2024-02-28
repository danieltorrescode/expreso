import mongoose from 'mongoose';

export type Task = {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description: string;
};

export type User = {
  _id?: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserSql = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
