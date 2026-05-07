'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const senderEmail = formData.get('email') as string;
  const message = formData.get('message') as string;
  const senderName = formData.get('name') as string;

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'dntommy12@gmail.com',
      subject: `Tin nhắn mới từ ${senderName} (Portfolio)`,
      replyTo: senderEmail,
      text: `Người gửi: ${senderName}\nEmail: ${senderEmail}\n\nNội dung:\n${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Gửi mail thất bại!' };
  }
}