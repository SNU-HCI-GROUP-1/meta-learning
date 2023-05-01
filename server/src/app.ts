// server with express using 3000
import express from 'express';
import { Request, Response } from 'express';

export default (route: any, options?: any) => {
  const app = express();
  app.use(route);
  app.get('/', (req: Request, res: Response) => {
    res.json({
      ok: true,
    });
  });
  return app;
}
