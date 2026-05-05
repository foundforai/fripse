import { Resend } from 'resend';

// Initialize Resend with API key (only if available)
let resend: Resend | null = null;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('RESEND_API_KEY not found in environment variables. Email notifications will be disabled.');
}

export async function sendEmailNotification(submittedEmail: string): Promise<boolean> {
  if (!resend) {
    console.error('Resend not initialized - missing RESEND_API_KEY');
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Fripse AI <noreply@fripse.com>',
      to: ['dustin@fripse.com'],
      subject: 'New Email Subscription - Fripse AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007CFF;">New Email Subscription</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Subscription Details:</h3>
            <p><strong>Email:</strong> ${submittedEmail}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> AI Checklist Lead Capture Form</p>
          </div>
          
          <p>A new visitor has requested the AI Readiness Checklist and provided their email for future updates.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="font-size: 12px; color: #666;">
            This notification was sent automatically from the Fripse AI website lead capture system.
          </p>
        </div>
      `,
      text: `
New Email Subscription - Fripse AI

Email: ${submittedEmail}
Time: ${new Date().toLocaleString()}
Source: AI Checklist Lead Capture Form

A new visitor has requested the AI Readiness Checklist and provided their email for future updates.
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Email notification sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

export async function sendConfirmationEmail(userEmail: string): Promise<boolean> {
  if (!resend) {
    console.error('Resend not initialized - missing RESEND_API_KEY');
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Fripse AI <noreply@fripse.com>',
      to: [userEmail],
      subject: 'Your AI Readiness Checklist is Ready!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007CFF;">Thank you for your interest in AI!</h2>
          
          <p>Your AI Readiness Checklist has been prepared and is ready for download.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What's Inside Your Checklist:</h3>
            <ul>
              <li>✓ 6-category business operations assessment</li>
              <li>✓ Simple checkbox format for quick evaluation</li>
              <li>✓ Identify automation opportunities in your workflow</li>
              <li>✓ Clear scoring to determine AI readiness</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.fripse.com/files/fripse-ai-checklist.pdf" 
               style="background-color: #007CFF; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Download Your Checklist
            </a>
          </div>
          
          <p>If you have any questions about implementing AI in your business, don't hesitate to reach out. We're here to help Utah businesses succeed with AI.</p>
          
          <p>Best regards,<br>
          The Fripse AI Team<br>
          <a href="https://www.fripse.com" style="color: #007CFF;">www.fripse.com</a></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="font-size: 12px; color: #666;">
            You received this email because you requested the AI Readiness Checklist from Fripse AI.
          </p>
        </div>
      `,
      text: `
Thank you for your interest in AI!

Your AI Readiness Checklist has been prepared and is ready for download.

What's Inside Your Checklist:
• 6-category business operations assessment
• Simple checkbox format for quick evaluation
• Identify automation opportunities in your workflow
• Clear scoring to determine AI readiness

Download your checklist: https://www.fripse.com/files/fripse-ai-checklist.pdf

If you have any questions about implementing AI in your business, don't hesitate to reach out. We're here to help Utah businesses succeed with AI.

Best regards,
The Fripse AI Team
www.fripse.com
      `,
    });

    if (error) {
      console.error('Resend confirmation email error:', error);
      return false;
    }

    console.log('Confirmation email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}