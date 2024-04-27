import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import allRoutes from './routes/routes.js';
import { requestInterceptor } from './utils/requestInterceptor.js';

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

const mongoConnect = async () => {
  try {
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB successfully connected!');
  } catch (error) {
    console.log('MongoDB connection error: ', error);
  }
};
mongoConnect();

app.all('*', requestInterceptor);

app.use('/', allRoutes);

app.listen(port, error => {
  if (!error) {
    console.log('Server Running on Port: ', port);
  } else {
    console.log('Error: ', error);
  }
});
