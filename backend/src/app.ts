import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript Backend!');
});


import UserRouter from './routes/user.routes';
import ActivityRouter from './routes/activity.routes';

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/activity', ActivityRouter);


