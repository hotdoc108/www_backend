import dotenv from "dotenv";
import crypto from 'crypto';

dotenv.config();

export const generateRandomIV = () => {
  return crypto.randomBytes(16).toString('hex');  
};

export const IV = generateRandomIV();

export const encryptDecryptMiddleware = (req, res, next) => {
    if (req.body && res && res.send) {
      const cipher = crypto.createCipheriv('aes-256-cbc', process.env.AUTHKEY, Buffer.from(process.env.IV, 'hex'));
      req.body = cipher.update(JSON.stringify(req.body), 'utf8', 'hex') + cipher.final('hex');
    }
  
    if (res && res.send) {
      const originalSend = res.send;
      res.send = function (body) {
        if (body) {
          const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.AUTHKEY, Buffer.from(process.env.IV, 'hex'));
          body = JSON.parse(decipher.update(body, 'hex', 'utf8') + decipher.final('utf8'));
        }
        originalSend.call(this, JSON.stringify(body));
      };
    }
  };