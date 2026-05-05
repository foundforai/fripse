import { MailService } from '@sendgrid/mail';
import { ContactFormData } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

// Email address that will receive form submissions
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'your-email@example.com'; 
// Use a verified sender email on SendGrid
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@fripse.com';

export async function sendNewsletterNotification(email: string): Promise<boolean> {
  try {
    await mailService.send({
      to: NOTIFICATION_EMAIL,
      from: FROM_EMAIL,
      subject: `New Newsletter Subscription`,
      text: `
New newsletter subscription:
Email: ${email}
      `,
      html: `
<h2>New Newsletter Subscription</h2>
<p><strong>Email:</strong> ${email}</p>
      `,
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendLeadMagnetNotification(email: string): Promise<boolean> {
  try {
    await mailService.send({
      to: NOTIFICATION_EMAIL,
      from: FROM_EMAIL,
      subject: `New Lead Magnet Download`,
      text: `
New lead magnet download:
Email: ${email}
      `,
      html: `
<h2>New Lead Magnet Download</h2>
<p><strong>Email:</strong> ${email}</p>
      `,
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const { name, company, email, message } = formData;
    
    await mailService.send({
      to: NOTIFICATION_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Company: ${company}
Email: ${email}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Company:</strong> ${company}</p>
<p><strong>Email:</strong> ${email}</p>
<h3>Message:</h3>
<p>${message}</p>
      `,
    });
    
    // Send confirmation email to the user
    await mailService.send({
      to: email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting Fripse',
      text: `
Dear ${name},

Thank you for reaching out to Fripse AI Consulting. We have received your message and will get back to you shortly.

Best regards,
The Fripse Team
      `,
      html: `
<h2>Thank you for contacting Fripse</h2>
<p>Dear ${name},</p>
<p>Thank you for reaching out to Fripse AI Consulting. We have received your message and will get back to you shortly.</p>
<p>Best regards,<br>The Fripse Team</p>
      `,
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
export async function sendChecklistLeadNotification(email: string, name: string): Promise<boolean> {
  if (!SENDGRID_API_KEY || !FROM_EMAIL || !NOTIFICATION_EMAIL) {
    console.error("Missing required environment variables for checklist lead email");
    return false;
  }

  try {
    await mailService.send({
      to: NOTIFICATION_EMAIL,
      from: FROM_EMAIL,
      subject: `New AI Readiness Checklist Request from ${name}`,
      text: `
New AI Readiness Checklist Request
Name: ${name}
Email: ${email}
The user has requested the AI Readiness Checklist and should receive the download link.
      `,
      html: `
<h2>New AI Readiness Checklist Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>The user has requested the AI Readiness Checklist and should receive the download link.</p>
      `,
    });

    await mailService.send({
      to: email,
      from: FROM_EMAIL,
      subject: "Your AI Readiness Checklist is Ready!",
      text: `
Thank you for your interest in AI, ${name}!

Your AI Readiness Checklist has been prepared and is ready for download.

What's Inside Your Checklist:
• AI readiness assessment framework
• Data preparation guidelines  
• Technology infrastructure checklist
• Team training recommendations
• ROI calculation templates

If you have any questions about implementing AI in your business, don't hesitate to reach out. We're here to help Utah businesses succeed with AI.

Best regards,
The Fripse AI Team
www.fripse.com
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #007CFF;">Thank you for your interest in AI, ${name}!</h2>
  
  <p>Your AI Readiness Checklist has been prepared and is ready for download.</p>
  
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0;">What's Inside Your Checklist:</h3>
    <ul>
      <li>✓ AI readiness assessment framework</li>
      <li>✓ Data preparation guidelines</li>
      <li>✓ Technology infrastructure checklist</li>
      <li>✓ Team training recommendations</li>
      <li>✓ ROI calculation templates</li>
    </ul>
  </div>
  
  <p>If you have any questions about implementing AI in your business, don't hesitate to reach out. We're here to help Utah businesses succeed with AI.</p>
  
  <p>Best regards,<br>
  The Fripse AI Team<br>
  <a href="https://www.fripse.com" style="color: #007CFF;">www.fripse.com</a></p>
</div>
      `,
    });

    return true;
  } catch (error) {
    console.error("SendGrid checklist lead email error:", error);
    return false;
  }
}
