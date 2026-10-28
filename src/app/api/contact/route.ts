import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();

    const { name, email, subject, message } = body;

    // Server-side validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!subject || subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters long.";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Validation failed." },
        { status: 400 }
      );
    }

    // Check if real email delivery provider is configured (e.g. RESEND_API_KEY)
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || siteConfig.contactEmail;

    if (apiKey) {
      // Connect to delivery provider
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "editorial@saaslaunchlab.com",
          to: recipient,
          reply_to: email,
          subject: `[${siteConfig.name} Contact] ${subject}`,
          text: `From: ${name} <${email}>\n\nSubject: ${subject}\n\nMessage:\n${message}`
        })
      });

      if (!resendRes.ok) {
        console.error("Resend delivery failed:", await resendRes.text());
        return NextResponse.json(
          {
            success: false,
            message: "We encountered an issue dispatching your message to our delivery service. Please try again later."
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out. Your message has been received by our editorial team."
      });
    }

    return NextResponse.json({
      success: true,
      delivered: false,
      message: "Thank you for reaching out. Your message has been received by our editorial team."
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { success: false, message: `Unable to process inquiry at this moment: ${errorMsg}` },
      { status: 500 }
    );
  }
}
