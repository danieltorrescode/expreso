import { RequestHandler } from 'express';
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
import { database as DataSource } from '../../config/databases';
import { Users as UserEntity } from './entities';
import { authenticate, generateHash } from './services';
import { UserSql as User } from '../../types';

export const getUsers: RequestHandler = async (_req, res) => {
  const userRepository = DataSource.getRepository(UserEntity);
  const users = await userRepository.find();
  res.json(users);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const hash = await generateHash(String(req.body.password), 10);
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  };
  await DataSource.getRepository(UserEntity).save(user);
  // next middleware login
  next();
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await DataSource.getRepository(UserEntity).findOneBy({
    id: Number(id),
  });
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

  await DataSource.getRepository(UserEntity).update(
    {
      id: Number(id),
    },
    { ...user },
  );
  res.json([{ status: 'User Updated' }, id]);
};

export const deleteUser: RequestHandler = async (req, res) => {
  await DataSource.getRepository(UserEntity).delete({
    id: Number(req.params.id),
  });
  res.json({ status: 'User Deleted' });
};

export const login: RequestHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password.toString();

  const user = await DataSource.getRepository(UserEntity).findOneBy({
    email: email,
  });
  console.log(user);
  if (user) {
    res.json(await authenticate(user, password));
  } else {
    res.json({
      success: false,
      text: 'user not found',
    });
  }
};

export const profile: RequestHandler = (req, res) => {
  res.json({ user: req.user, request: req.headers });
};
