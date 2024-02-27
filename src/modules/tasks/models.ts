import { InferSchemaType, model, Schema } from 'mongoose';

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema);
