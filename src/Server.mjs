import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import cmsRoutes from './routes/cms.js';
//import { authorize } from './middleware/authorize.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
//Db connection
import connectDB from './utils/db.js';
import { errorHandler } from './middleware/errorHandler.js';
//import { encryptDecryptMiddleware } from './middleware/encryptDecryptMiddleware.js';

import swaggerSpec from './utils/config/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

//PORT
const PORT = process.env.PORT || 3000;


// middleware
app.use(
  cors({
      origin: '*',
      credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', clientRoutes);
app.use('/api/cms', cmsRoutes);

//Error handler
app.use(errorHandler);

//Encryption
// app.use(encryptDecryptMiddleware)

// Server listening on port 3000

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listening on Port ${PORT}`);
        });
    })
    .catch(console.log);