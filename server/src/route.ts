import { Router } from 'express';

import { sendQuestions } from './gpt/controller';
import { sendEmail } from './sendEmail/controller';
import { generateSttFromFile } from './stt/controller';

export default Router()
  .get('/generate_stt', generateSttFromFile)
  .post('/generate_questions', sendQuestions)
  .post('/send_report', sendEmail);
