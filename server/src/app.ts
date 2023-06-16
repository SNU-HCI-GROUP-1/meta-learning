// server with express using 3000
import express, { Request, Response } from 'express';

export default (route: any) => {
  const app = express();
  app.use(route);
  app.get('/', (req: Request, res: Response) => {
    res.json({
      ok: true,
    });
  });
  return app;
};
