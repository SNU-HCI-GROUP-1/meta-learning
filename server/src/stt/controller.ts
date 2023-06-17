import { Request, Response } from 'express';

import { generateStt } from './generateSTT';

const uploadedFileMap: any = {};

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      data: {
        error: 'No file uploaded',
      },
    });
  }
  const key = new Date().getTime() * Math.random();
  uploadedFileMap[key] = req.file;

  const { filename, size } = req.file;
  return res.json({
    data: {
      message: 'File uploaded successfully',
      filename,
      size,
      key,
    },
  });
};

export const generateSttFromFile = async (req: Request, res: Response) => {
  const { key } = req.query;
  const file = uploadedFileMap[key as string];
  const prompt = await generateStt(file.path + file.filename);
  res.json({ prompt });
};
