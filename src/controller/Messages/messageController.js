import Contact from '../../model/Contact.js';
import Message from '../../model/Connect.js';


// Send message
export const sendMessage = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        const newMessage = new Message({
            username,
            email,
            message,
        });
        await newMessage.save();
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/// Get message
export const getMessage = async(req, res)=>{
    try {
        const messages = await Message.find({}, { _id: 0, __v: 0 });
        res.status(200).json({ success: true, messages, message:'All Message fetched'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
}


//Call for consultancy
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
