import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true }
});

const Contact = model('Contact', contactSchema);

export default Contact;
