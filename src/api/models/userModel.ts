import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
