import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../model/User.js';
import asyncErrorHandler from '../../utils/asyncErrorHandler.js';
import { sendResetTokenByEmail } from '../../services/emailService.js';

const router = express.Router();

// Signup route
export const signUp = asyncErrorHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '9h',
    });


    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
export const login = asyncErrorHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '9h',
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
export const logout = asyncErrorHandler((req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  res.status(200).json({ message: 'Logout successful' });
});


//forget password
export const forgetPassword = asyncErrorHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resetToken = Math.floor(100000 + Math.random() * 900000);

    await sendResetTokenByEmail(user.email, resetToken);

    user.resetToken = resetToken;
    await user.save();


    res.status(200).json({ message: 'Password reset token sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset Password route
export const resetPassword = asyncErrorHandler(async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    const user = await User.findById(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.resetToken !== resetToken) {
      return res.status(401).json({ error: 'Invalid reset token' });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetToken = null;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;