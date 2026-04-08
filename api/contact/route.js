import { NextRequest, NextResponse } from 'next/server';

const escapeHtml = (text) =>
   String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

const adminEmailHtml = (name, email, message, additionalInfo) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f6f9;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .email-wrapper {
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
    }
    .header p {
      margin: 8px 0 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }
    .content {
      padding: 32px 24px;
    }
    .info-card {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .info-row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .info-label {
      width: 80px;
      font-weight: 600;
      color: #1e293b;
      font-size: 14px;
    }
    .info-value {
      flex: 1;
      color: #334155;
      font-size: 14px;
      word-break: break-word;
    }
    .message-box {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      margin-top: 16px;
    }
    .message-box h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }
    .message-content {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 13px;
      color: #334155;
      line-height: 1.5;
    }
    .badge {
      display: inline-block;
      background-color: #dcfce7;
      color: #166534;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .info-row {
        flex-direction: column;
      }
      .info-label {
        width: 100%;
        margin-bottom: 4px;
      }
      .content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="header">
        <h1>New Contact Submission</h1>
        <p>from your website contact form</p>
      </div>
      
      <div class="content">
        <div class="badge">🔔 Priority: High</div>
        
        <div class="info-card">
          <div class="info-row">
            <div class="info-label">Name:</div>
            <div class="info-value"><strong>${escapeHtml(name)}</strong></div>
          </div>
          <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value">
              <a href="mailto:${escapeHtml(email)}" style="color: #0B1E61; text-decoration: none;">
                ${escapeHtml(email)}
              </a>
            </div>
          </div>
          ${additionalInfo?.phone ? `
          <div class="info-row">
            <div class="info-label">Phone:</div>
            <div class="info-value">
              <a href="tel:${escapeHtml(additionalInfo.phone)}" style="color: #0B1E61; text-decoration: none;">
                ${escapeHtml(additionalInfo.phone)}
              </a>
            </div>
          </div>
          ` : ''}
          ${additionalInfo?.company ? `
          <div class="info-row">
            <div class="info-label">Company:</div>
            <div class="info-value">${escapeHtml(additionalInfo.company)}</div>
          </div>
          ` : ''}
          ${additionalInfo?.services ? `
          <div class="info-row">
            <div class="info-label">Services:</div>
            <div class="info-value">${escapeHtml(additionalInfo.services)}</div>
          </div>
          ` : ''}
          ${additionalInfo?.budget ? `
          <div class="info-row">
            <div class="info-label">Budget:</div>
            <div class="info-value">${escapeHtml(additionalInfo.budget)}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="message-box">
          <h3>💬 Message</h3>
          <div class="message-content">${escapeHtml(message)}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>This message was sent from your website contact form.</p>
        <p><a href="mailto:${escapeHtml(email)}">Reply to ${escapeHtml(name)}</a></p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const autoReplyHtml = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f6f9;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .email-wrapper {
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #059669, #047857);
      padding: 40px 24px;
      text-align: center;
    }
    .checkmark {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      color: #ffffff;
    }
    .content {
      padding: 32px 24px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    .message-text {
      color: #334155;
      margin-bottom: 24px;
    }
    .info-box {
      background: linear-gradient(135deg, #f0fdf4, #dcfce7);
      border-left: 4px solid #059669;
      padding: 20px;
      border-radius: 12px;
      margin: 24px 0;
    }
    .info-box p {
      margin: 0 0 8px 0;
      color: #166534;
    }
    .info-box p:last-child {
      margin-bottom: 0;
    }
    .next-steps {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .next-steps h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }
    .step-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      color: #334155;
      font-size: 14px;
    }
    .step-number {
      width: 24px;
      height: 24px;
      background-color: #e2e8f0;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: #475569;
    }
    .button {
      display: inline-block;
      background-color: #059669;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 500;
      margin: 16px 0 8px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #047857;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin: 24px 0 16px;
    }
    .social-link {
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    @media (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
      .header h1 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="header">
        <div class="checkmark">✓</div>
        <h1>Thank You for Contacting Us!</h1>
      </div>
      
      <div class="content">
        <div class="greeting">Hi ${escapeHtml(name)},</div>
        
        <p class="message-text">
          We've received your message and truly appreciate you reaching out to us. 
          Our team is dedicated to providing the best possible support.
        </p>
        
        <div class="info-box">
          <p>📧 <strong>What happens next?</strong></p>
          <p>We'll review your inquiry and get back to you within <strong>24 hours</strong>.</p>
        </div>
        
        <div class="next-steps">
          <h3>⚡ Quick Links</h3>
          <div class="step-item">
            <span class="step-number">1</span>
            <span>Check out our <a href="#" style="color: #059669;">FAQ page</a> for common questions</span>
          </div>
          <div class="step-item">
            <span class="step-number">2</span>
            <span>Follow us on social media for updates</span>
          </div>
          <div class="step-item">
            <span class="step-number">3</span>
            <span>Explore our <a href="#" style="color: #059669;">services</a> in more detail</span>
          </div>
        </div>
        
        <div style="text-align: center;">
          <a href="#" class="button">Visit Our Website</a>
        </div>
        
        <div class="social-links">
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Facebook</a>
        </div>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ClickMasters. All rights reserved.</p>
        <p>You received this email because you contacted us through our website.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(req) {
   try {
      const { default: nodemailer } = await import('nodemailer');

      const body = await req.json();
      console.log('Received contact form submission:', body);

      const { name, email, message, company, phone, services, budget } = body;

      // Validate required fields
      if (!name || !email || !message) {
         return NextResponse.json(
            { message: 'Name, email, and message are required', success: false },
            { status: 400 }
         );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return NextResponse.json(
            { message: 'Invalid email format', success: false },
            { status: 400 }
         );
      }

      // Prepare additional info
      const additionalInfo = { company, phone, services, budget };

      // Create transporter
      const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST || 'smtp.gmail.com',
         port: Number(process.env.SMTP_PORT) || 587,
         secure: false,
         auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
         },
         tls: { rejectUnauthorized: false },
      });

      // Verify SMTP connection
      await transporter.verify();

      // Prepare email content
      let fullMessage = message;
      if (company || phone || services || budget) {
         fullMessage += '\n\n--- Additional Information ---';
         if (company) fullMessage += `\nCompany: ${company}`;
         if (phone) fullMessage += `\nPhone: ${phone}`;
         if (services) fullMessage += `\nServices Interested: ${services}`;
         if (budget) fullMessage += `\nBudget: ${budget}`;
      }

      // Send email to admin with styled HTML
      const adminMailOptions = {
         from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
         to: process.env.RECEIVER_EMAIL || process.env.SMTP_MAIL,
         replyTo: email,
         subject: `📬 New Contact Form Submission from ${name}`,
         html: adminEmailHtml(name, email, message, additionalInfo),
         // Add plain text alternative for better email client compatibility
         text: `New Contact Submission\n\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}${company ? `Company: ${company}\n` : ''}${services ? `Services: ${services}\n` : ''}${budget ? `Budget: ${budget}\n` : ''}\nMessage:\n${message}`,
      };

      // Send auto-reply to user with styled HTML
      const userMailOptions = {
         from: `"${process.env.ALIAS_NAME || 'ClickMasters'}" <${process.env.ALIAS_EMAIL || process.env.SMTP_MAIL}>`,
         to: email,
         subject: '✓ Thank You for Contacting ClickMasters',
         html: autoReplyHtml(name),
         text: `Thank you for contacting ClickMasters, ${name}!\n\nWe received your message and will get back to you within 24 hours.\n\n- ClickMasters Team`,
      };

      // Send both emails
      const [adminInfo, userInfo] = await Promise.all([
         transporter.sendMail(adminMailOptions),
         transporter.sendMail(userMailOptions)
      ]);

      console.log('Admin email sent:', adminInfo.messageId);
      console.log('Auto-reply sent:', userInfo.messageId);

      return NextResponse.json(
         {
            message: 'Email sent successfully',
            success: true
         },
         { status: 200 }
      );

   } catch (error) {
      console.error('Error sending email:', error);

      let errorMessage = 'Failed to send message';
      if (error.code === 'EAUTH') {
         errorMessage = 'Email authentication failed. Please contact support.';
      } else if (error.code === 'ECONNECTION') {
         errorMessage = 'Unable to connect to email server. Please try again later.';
      } else if (error.message) {
         errorMessage = error.message;
      }

      return NextResponse.json(
         {
            message: errorMessage,
            success: false
         },
         { status: 500 }
      );
   }
}