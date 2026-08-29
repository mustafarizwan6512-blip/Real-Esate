const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS options
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const lead = await req.json();
    console.log("Received lead payload in send-lead-email Edge Function:", lead);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not defined in the environment secrets.");
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is not configured in Supabase secrets." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const name = lead.name || 'Anonymous';
    const email = lead.email || 'N/A';
    const phone = lead.phone || lead.whatsapp || 'N/A';
    const whatsapp = lead.whatsapp || lead.phone || 'N/A';
    const country = lead.country || 'Saudi Arabia';
    const preferredCity = lead.preferred_city || lead.city || 'N/A';
    const propertyName = lead.property_name || 'General Inquiry';
    const budget = lead.budget || 'N/A';
    const bedrooms = lead.bedrooms || 'N/A';
    const message = lead.message || lead.requirements || 'No additional requirements specified.';
    const source = lead.source || 'Website';
    const dateStr = lead.created_at ? new Date(lead.created_at).toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }) + " (AST)" : new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }) + " (AST)";

    // HTML Clickable links
    const emailLink = email !== 'N/A' ? `<a href="mailto:${email}" style="color: #cbb27a; text-decoration: none; font-weight: bold; border-bottom: 1px dashed #cbb27a;">${email}</a>` : 'N/A';
    const phoneLink = phone !== 'N/A' ? `<a href="tel:${phone}" style="color: #cbb27a; text-decoration: none; font-weight: bold; border-bottom: 1px dashed #cbb27a;">${phone}</a>` : 'N/A';
    const whatsappLink = whatsapp !== 'N/A' ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #25d366; text-decoration: none; font-weight: bold; border-bottom: 1px dashed #25d366;">${whatsapp}</a>` : 'N/A';

    // Premium HTML email with elegant REFERESTATES branding
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Property Inquiry</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #eaeaea;">
            <!-- Premium Header -->
            <div style="background-color: #0f1c2c; padding: 35px 30px; text-align: center; border-bottom: 3px solid #cbb27a;">
              <h1 style="color: #cbb27a; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 5px; text-transform: uppercase;">REFERESTATES</h1>
              <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 11px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; opacity: 0.85;">PREMIUM SAUDI PORTFOLIO ADVISORY</p>
            </div>
            
            <!-- Body Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #0f1c2c; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 25px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; letter-spacing: 0.5px;">
                New Property Lead Received
              </h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; width: 35%; border-bottom: 1px solid #f9f9f9;">Visitor's Name</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f9f9f9;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Email Address</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${emailLink}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Phone Line</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${phoneLink}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">WhatsApp</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${whatsappLink}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Country</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${country}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Preferred City</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${preferredCity}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Property Interest</td>
                  <td style="padding: 12px 0; color: #cbb27a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f9f9f9;">${propertyName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Target Budget</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${budget}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Bedrooms Requested</td>
                  <td style="padding: 12px 0; color: #0f1c2c; font-size: 14px; border-bottom: 1px solid #f9f9f9;">${bedrooms}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Source Page</td>
                  <td style="padding: 12px 0; color: #555555; font-size: 13px; border-bottom: 1px solid #f9f9f9;">${source}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #888888; font-size: 14px; border-bottom: 1px solid #f9f9f9;">Submission Time</td>
                  <td style="padding: 12px 0; color: #555555; font-size: 13px; border-bottom: 1px solid #f9f9f9;">${dateStr}</td>
                </tr>
              </table>
              
              <h3 style="color: #0f1c2c; font-size: 14px; font-weight: 600; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message / Particular Requirements</h3>
              <div style="background-color: #fdfdfd; border-left: 3px solid #cbb27a; padding: 20px; border-radius: 4px; font-size: 14px; color: #444444; line-height: 1.6; font-style: italic; white-space: pre-wrap; border-top: 1px solid #f9f9f9; border-right: 1px solid #f9f9f9; border-bottom: 1px solid #f9f9f9;">
                ${message}
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #eaeaea; font-size: 11px; color: #999999; line-height: 1.6;">
              <p style="margin: 0 0 6px 0;">This inquiry was routed and validated by REFERESTATES Lead Engine via Resend.</p>
              <p style="margin: 0;">© ${new Date().getFullYear()} REFERESTATES. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Call Resend API via fetch
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "REFERESTATES Lead Engine <leads@referestates.com>",
        to: ["info@referestates.com"],
        subject: `New Lead: ${name} - ${propertyName}`,
        html: htmlContent,
        reply_to: email !== 'N/A' ? email : "info@referestates.com"
      }),
    });

    const resendData = await resendResponse.json();
    console.log("Resend API response status:", resendResponse.status, "payload:", resendData);

    if (!resendResponse.ok) {
      throw new Error(`Resend API response error (status ${resendResponse.status}): ${JSON.stringify(resendData)}`);
    }

    return new Response(JSON.stringify({ success: true, message: "Lead email successfully processed by Resend.", data: resendData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Critical error in send-lead-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
