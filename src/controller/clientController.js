import nodemailer from 'nodemailer';

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
