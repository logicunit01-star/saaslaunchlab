export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Canonical 301 redirects for /blogs to /blog
    if (url.pathname === "/blogs" || url.pathname === "/blogs/") {
      return Response.redirect(`${url.origin}/blog`, 301);
    }
    if (url.pathname.startsWith("/blogs/")) {
      const rest = url.pathname.slice("/blogs".length);
      return Response.redirect(`${url.origin}/blog${rest}`, 301);
    }

    // 2. Direct edge submission for /api/contact to HubSpot CRM
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = await request.json();
        const { name, email, subject, message, hutk, skipHubspot } = body;

        if (!skipHubspot && email) {
          const portalId = "246175508";
          const formId = "115db458-7775-41e5-9827-269d275ebf11";
          const endpoint = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

          const clientIp = request.headers.get("cf-connecting-ip") || undefined;
          const trimmedName = (name || "").trim();
          const nameParts = trimmedName.split(/\s+/);
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

          const fields = [
            { name: "email", value: email },
            { name: "firstname", value: trimmedName },
            ...(lastName ? [{ name: "lastname", value: lastName }] : []),
            { name: "subject", value: subject || "" },
            { name: "message", value: message || "" },
            { name: "content", value: message || "" },
            { name: "hs_ticket_subject", value: subject || "" },
            { name: "hs_ticket_content", value: message || "" }
          ];

          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              submittedAt: Date.now(),
              fields,
              context: {
                pageUri: "https://saaslaunchlab.com/contact",
                pageName: "Contact Us - SaaS Launch Lab",
                ipAddress: clientIp,
                hutk: hutk || undefined
              },
              legalConsentOptions: {
                consent: {
                  consentToProcess: true,
                  text: "I agree to allow SaaS Launch Lab to store and process my personal data."
                }
              }
            })
          });
        }

        return new Response(JSON.stringify({ success: true, message: "Message received." }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, message: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // 3. Fallback: serve static site assets from ./out via Cloudflare CDN
    return env.ASSETS.fetch(request);
  }
};
