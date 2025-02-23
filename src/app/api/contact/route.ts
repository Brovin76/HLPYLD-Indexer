import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // You could send this data to:
    // 1. Email service (SendGrid, AWS SES, etc.)
    // 2. Database (Supabase, Firebase, etc.)
    // 3. Discord webhook
    // 4. Notion database
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const channelUsername = '@hypurrquery'; // Updated to your channel name
    
    if (botToken) {
      // Format message for Telegram (using markdown)
      const message = `
*New Contact Form Submission* 🚀

*Name:* ${data.name}
*X Handle:* ${data.xHandle || 'Not provided'}
*Telegram:* ${data.telegram || 'Not provided'}
*Discord:* ${data.discord || 'Not provided'}
*Reason:* ${data.reason}

*Message:*
${data.message}
`;

      // Send to Telegram
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: channelUsername,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();
      console.log('Telegram response:', result);

      // Check if the message was sent successfully
      if (!result.ok) {
        throw new Error(`Telegram API error: ${result.description}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 