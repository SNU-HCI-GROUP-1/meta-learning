import { Router } from 'express';

import { sendQuestions } from './gpt/controller';
import { generateStt } from './stt/generateSTT';

export default Router()
  .get('/generate_stt', sendQuestions)
  .post('/generate_questions', generateStt);
