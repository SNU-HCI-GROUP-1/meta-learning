import { Request, Response } from 'express';

import { runGPT35 } from './generateChat';
import { inputText } from './test';

export const sendQuestions = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  /* eslint-disable max-len */
  const result = await runGPT35(`
  Give me 10 yes or no questions with answer generated by text below.
  5 questions should have answer 'yes' and 5 questions should have answer 'no', and questions are arranged randomly.
  Questions should start with 'Question:' and answers should be 'Answer: O' if yes or 'Answer: X' if no.
  Each questions and answers should be separated by a new line.

  ${prompt || inputText.replace('\n', ' ')}
  `);
  /* eslint-enable max-len */

  const lines = result!.split('\n');
  // const lines = testResult1.split('\n');
  const questions: { question: string, answer: string }[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const line of lines) {
    if (line.startsWith('Question:')) {
      let question = (line.split('Question: '))[1];
      if (question[question.length - 1] === ' ') {
        question = question.slice(0, -1);
      }
      questions.push({ question, answer: '' });
    } else if (line.startsWith('Answer:')) {
      const answer = (line.split('Answer: '))[1][0];
      questions[questions.length - 1].answer = answer;
    }
  }
  console.log(questions);

  res.json({ questions });
};