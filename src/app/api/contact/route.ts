import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  hutk?: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, subject, message, hutk } = body;

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

    // Split name into first and last name for HubSpot CRM
    const trimmedName = (name || "").trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || trimmedName;
    const lastName = nameParts.slice(1).join(" ") || firstName;

    // 1. Submit lead to HubSpot Form API (Portal 246175508, na2 region)
    const portalId = process.env.HUBSPOT_PORTAL_ID || "246175508";
    const formId = process.env.HUBSPOT_FORM_ID || "115db458-7775-41e5-9827-269d275ebf11";
    const region = process.env.HUBSPOT_REGION || "na2";

    const hubspotEndpoint = `https://api-${region}.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

    const hubspotPayload = {
      fields: [
        { name: "email", value: email },
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "name", value: trimmedName },
        { name: "subject", value: subject },
        { name: "message", value: message }
      ],
      context: {
        pageUri: `${siteConfig.url}/contact`,
        pageName: "Contact Us - SaaS Launch Lab",
        ipAddress: clientIp || undefined,
        hutk: hutk || undefined
      }
    };

    try {
      const hsRes = await fetch(hubspotEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hubspotPayload)
      });

      if (!hsRes.ok) {
        const errorText = await hsRes.text();
        console.error("HubSpot submission warning:", hsRes.status, errorText);
      }
    } catch (hsErr) {
      console.error("HubSpot network submission error:", hsErr);
    }

    // 2. Dispatch email notification if RESEND_API_KEY is configured
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || siteConfig.contactEmail;

    if (apiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "editorial@saaslaunchlab.com",
            to: recipient,
            reply_to: email,
            subject: `[${siteConfig.name} Lead] ${subject}`,
            text: `New SaaS Lead Form Submission\n\nName: ${trimmedName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
          })
        });
      } catch (mailErr) {
        console.error("Resend delivery failed:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your inquiry has been sent to our editorial desk and logged in our system."
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { success: false, message: `Unable to process inquiry at this moment: ${errorMsg}` },
      { status: 500 }
    );
  }
}
