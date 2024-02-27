import TaskModel from './models';
import { Task } from '../../types';

export const getAllTasks = () => TaskModel.find();

export const createTask = async (task: Task) => {
  let newTask = new TaskModel(task);
  newTask = await newTask.save();
  return { text: 'Task created', task: newTask };
};

export const getTask = async (id: string) => {
  return await TaskModel.findById(id);
};

export const editTask = async (id: string, updates: Task) => {
  const task = await TaskModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true },
  );
  return { text: 'Task Updated', task: task };
};

export const deleteTask = async (id: string) => {
  const task = await TaskModel.findByIdAndDelete(id);
  return { text: 'Task Deleted', task: task };
};
