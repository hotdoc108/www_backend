import { Schema, model } from 'mongoose';

const connect = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  });

  const Message = model('Message', connect);

export default Message;