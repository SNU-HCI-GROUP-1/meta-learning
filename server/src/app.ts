// server with express using 3000
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

export default (route: any) => {
  const app = express();
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(route);
  app.get('/', (req: Request, res: Response) => {
    res.json({
      ok: true,
    });
  });
  return app;
};
