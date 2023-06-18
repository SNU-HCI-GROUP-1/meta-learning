import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendEmail = async (req: Request, res: Response) => {
  const { question, answer, reason } = req.body;
  const html = `
<h3>Question: ${question}</h3>
<br />
<h3>Answer: ${answer}</h3>
<br />
<br />
<h3>Reason: ${reason}</h3>
`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"HCI Project Notice" ${process.env.GMAIL_ID}`,
    // 받는 곳의 메일 주소를 입력
    to: process.env.EMAIL_RECEIVERS, // ['one@gmail.com', 'two@gmail.com']
    // 보내는 메일의 제목을 입력
    subject: 'HCI Project Notice',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // text: 'just test text',
    // html: html로 작성된 내용
    html,
  });
  res.json({ ok: true });
};
