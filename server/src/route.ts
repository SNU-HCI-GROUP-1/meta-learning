import { Router } from 'express';

import { sendQuestions } from './gpt/controller';
import { sendEmail } from './sendEmail/controller';
import { generateStt } from './stt/generateSTT';

export default Router()
  .get('/generate_stt', sendQuestions)
  .post('/generate_questions', generateStt)
  .post('/send_report', sendEmail);
