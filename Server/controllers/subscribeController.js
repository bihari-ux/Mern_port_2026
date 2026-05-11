const Subscription = require("../models/Subscription");
const nodemailer = require("nodemailer");

exports.createSubscription = async (req, res) => {
  const { name, email } = req.body || {};
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscription.findOne({ email });
    let sub;
    if (!existing) {
      sub = new Subscription({ name: name || "", email });
      await sub.save();
    } else {
      sub = existing;
    }

    // Configure transporter depending on environment
    let transporter;
    let usedTestAccount = false;
    let emailSent = false;
    let previewUrls = [];
    let verifyErr = null;
    try {
      if (process.env.SMTP_URL) {
        transporter = nodemailer.createTransport(process.env.SMTP_URL);
      } else if (process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
          secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
        });
      } else if (process.env.NODE_ENV !== "production") {
        // create test account in development if no SMTP configured
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
        usedTestAccount = true;
        console.info("Using Ethereal test account for email (dev only)");
      }

      if (transporter) {
        // verify transporter
        try {
          await transporter.verify();
        } catch (err) {
          verifyErr = err;
          console.warn("Mail transporter verification failed:", err && err.message ? err.message : err);
        }

        // If verification failed and we're in development, fall back to Ethereal test account
        if (verifyErr && process.env.NODE_ENV !== "production") {
          try {
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
              host: testAccount.smtp.host,
              port: testAccount.smtp.port,
              secure: testAccount.smtp.secure,
              auth: { user: testAccount.user, pass: testAccount.pass },
            });
            usedTestAccount = true;
            console.info("Falling back to Ethereal test account for email (dev only)");
            // re-verify the new transporter
            try {
              await transporter.verify();
            } catch (reverifyErr) {
              console.warn("Ethereal transporter verify failed:", reverifyErr && reverifyErr.message ? reverifyErr.message : reverifyErr);
            }
          } catch (fallErr) {
            console.error("Failed to create Ethereal test account:", fallErr && fallErr.message ? fallErr.message : fallErr);
          }
        }

        const owner = process.env.EMAIL_TO || process.env.SMTP_USER;
        let lastInfo;
        if (owner) {
          lastInfo = await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com",
            to: owner,
            subject: "New newsletter subscriber",
            html: `<p>New subscriber: ${name || "—"} &lt;${email}&gt;</p>`,
          });
          emailSent = true;
          if (usedTestAccount) {
            const url = nodemailer.getTestMessageUrl(lastInfo);
            previewUrls.push({ type: "owner", url });
            console.info("Owner email preview:", url);
          }
        }

        if (process.env.SEND_CONFIRMATION === "true") {
          const emailHtml = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #060010; color: #ffffff; border-radius: 12px; border: 1px solid #D97706; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
              <div style="background: linear-gradient(135deg, #D97706, #F59E0B); padding: 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Thank You!</h1>
                <p style="margin: 10px 0 0; color: #FFFBEB; font-size: 16px;">For subscribing to Bihari's Premium Updates</p>
              </div>
              <div style="padding: 30px;">
                <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0;">Hi <strong>${name || "there"}</strong>,</p>
                <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0;">Welcome to my exclusive newsletter! I specialize in crafting high-end, dynamic, and extremely fast web applications.</p>
                
                <h2 style="color: #FCD34D; font-size: 20px; margin-top: 30px; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 10px;">My Web Creation Rates</h2>
                <ul style="list-style-type: none; padding: 0; margin: 20px 0;">
                  <li style="background: rgba(255,255,255,0.05); border-left: 4px solid #F59E0B; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <strong style="color: #ffffff; font-size: 16px;">Landing Page / Portfolio</strong><br/>
                    <span style="color: #cbd5e1; font-size: 15px;">From $150 (₹12,000)</span>
                  </li>
                  <li style="background: rgba(255,255,255,0.05); border-left: 4px solid #F59E0B; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <strong style="color: #ffffff; font-size: 16px;">E-Commerce / Full-Stack Web App</strong><br/>
                    <span style="color: #cbd5e1; font-size: 15px;">From $450 (₹35,000)</span>
                  </li>
                  <li style="background: rgba(255,255,255,0.05); border-left: 4px solid #F59E0B; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <strong style="color: #ffffff; font-size: 16px;">Custom Enterprise Dashboard</strong><br/>
                    <span style="color: #cbd5e1; font-size: 15px;">From $600+ (₹50,000+)</span>
                  </li>
                  <li style="background: rgba(255,255,255,0.05); border-left: 4px solid #F59E0B; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <strong style="color: #ffffff; font-size: 16px;">UI/UX Redesign & Overhaul</strong><br/>
                    <span style="color: #cbd5e1; font-size: 15px;">From $200 (₹16,000)</span>
                  </li>
                </ul>
                
                <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0; margin-top: 30px;">Let's build something amazing together! Reply to this email if you're ready to start your next project.</p>
                <p style="font-size: 16px; line-height: 1.6; color: #e2e8f0;">Best regards,<br/><strong style="color: #FCD34D;">Bihari Kumar Rawat</strong></p>
              </div>
            </div>
          `;

          lastInfo = await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com",
            to: email,
            subject: "Welcome to Bihari's Premium Services! 🚀",
            html: emailHtml,
          });
          emailSent = true;
          if (usedTestAccount) {
            const url = nodemailer.getTestMessageUrl(lastInfo);
            previewUrls.push({ type: "confirmation", url });
            console.info("Confirmation email preview:", url);
          }
        }
      } else {
        console.info("No SMTP configured — skipping email send. Set SMTP_HOST/SMTP_USER or SMTP_URL to enable sending.");
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr && emailErr.message ? emailErr.message : emailErr);
    }

    const responsePayload = { message: "Subscribed", emailSent, previewUrls };
    if (verifyErr) responsePayload.verifyError = verifyErr && verifyErr.message ? verifyErr.message : String(verifyErr);
    return res.json(responsePayload);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.listSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ createdAt: -1 });
    return res.json(subs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Subscription.findByIdAndDelete(id);
    if (!sub) return res.status(404).json({ message: "Subscription not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
