import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';

import { UPLOAD_FOLDER } from '../constants';

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

  const { originalname, filename, size } = req.file;
  const fileExtension = path.extname(originalname);
  const newFileName = filename + fileExtension;
  fs.renameSync(`${UPLOAD_FOLDER}/${filename}`, `${UPLOAD_FOLDER}/${newFileName}`);

  uploadedFileMap[key] = {
    ...req.file,
    filename: newFileName,
  };
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
  const script = await generateStt(`${UPLOAD_FOLDER}/${file.filename}`);
  res.json({
    data: {
      script,
    },
  });
};
