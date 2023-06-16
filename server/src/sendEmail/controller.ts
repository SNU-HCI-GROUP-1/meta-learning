import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = (req: Request, res: Response) => {
  const { question, answer, reason } = req.body;
  transporter.sendMail({
    from: `"HCI Project Notice" ${process.env.GMAIL_ID}`,
    // 받는 곳의 메일 주소를 입력
    to: process.env.EMAIL_RECEIVERS, // ['one@gmail.com', 'two@gmail.com']
    // 보내는 메일의 제목을 입력
    subject: 'HCI Project Notice',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // text: 'just test text',
    // html: html로 작성된 내용
    html: `
<h1>Question: ${question}</h1>
<h2>Answer: ${answer}</h2>
<h3>Reason: ${reason}</h3>
    `,
  });
  res.json({ ok: true });
};
