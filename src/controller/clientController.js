import nodemailer from 'nodemailer';
import Contact from '../model/Contact.js';

export const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendEmailToRecipient(name, email, message);

    // Save the email details to the database (you'll need to implement this)
    // Example: await saveEmailToDatabase(name, email, message);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to send an email using nodemailer
const sendEmailToRecipient = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manjunathnaik3923@gmail.com',
      pass: 'Admin',
    },
  });

  // Configure the email options
  const mailOptions = {
    from: 'manjunathnaik3923@gmail.com', // replace with your email
    to: 'manjunathnaik2731@gmail.com', // replace with the recipient's email
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};


//Call back Route
export const callback = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const contact = new Contact({ username, email, phone });
    const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
    // Validate Indian Phone Number Format
    if (!indianPhoneNumberRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid Indian phone number format' });
    }
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }
    await contact.save();
    console.log('Contact saved successfully:', contact);
    res.status(201).json({ message: 'Callback requested successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
