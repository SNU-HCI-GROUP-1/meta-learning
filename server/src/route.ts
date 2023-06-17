import { Router } from 'express';
import multer from 'multer';

import { UPLOAD_FOLDER } from './constants';
import { sendQuestions } from './gpt/controller';
import { sendEmail } from './sendEmail/controller';
import { generateSttFromFile, uploadFile } from './stt/controller';

const upload = multer({ dest: `${UPLOAD_FOLDER}/` });

export default Router()
  .post('/upload', upload.single('file'), uploadFile)
  .get('/generate_stt', generateSttFromFile)
  .post('/generate_questions', sendQuestions)
  .post('/send_report', sendEmail);
