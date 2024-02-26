import { settings } from './settings';
import mongoose from 'mongoose';

const URI = settings.mongo;

export default (): void => {
  mongoose
    .connect(URI)
    .then((db) =>
      console.log('mongodb connection has been established successfully.'),
    )
    .catch((err) => console.error(err));
};
