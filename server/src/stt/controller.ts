import { Request, Response } from 'express';

import { generateStt } from './generateSTT';

export const generateSttFromFile = async (req: Request, res: Response) => {
  const prompt = await generateStt();
  res.json({ prompt });
};
