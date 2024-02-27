import { RequestHandler } from 'express';
import TaskModel from './models';
import { Task } from '../../types';

export const getTasks: RequestHandler = async (_req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
};

export const createTask: RequestHandler = async (req, res) => {
  let task = new TaskModel({
    name: req.body.name,
    description: req.body.description,
  });
  task = await task.save();
  res.json({ text: 'Task created', task: task });
};

export const getTask: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  res.json(task);
};

export const editTask: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updates: Task = {
    name: req.body.name,
    description: req.body.description,
  };
  const task = await TaskModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true },
  );
  res.json({ text: 'Task Updated', task: task });
};

export const deleteTask: RequestHandler = async (req, res) => {
  const task = await TaskModel.findByIdAndDelete(req.params.id);
  res.json({ text: 'Task Deleted', task: task });
};
