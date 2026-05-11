const Message = require("../models/Message");
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, type, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    const createdMessage = await Message.create({
      name,
      email,
      type: type || "",
      budget: budget || "",
      message,
    });

    try {
      let transporter;
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
      }

      if (transporter) {
        const owner = process.env.EMAIL_TO || process.env.SMTP_USER;
        if (owner) {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com",
            to: owner,
            subject: `New Contact Message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Type:</strong> ${type || "N/A"}</p>
                   <p><strong>Budget:</strong> ${budget || "N/A"}</p>
                   <p><strong>Message:</strong><br/>${message}</p>`,
          });
        }

        if (process.env.SEND_CONFIRMATION === "true") {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com",
            to: email,
            subject: "Thank you for contacting me",
            html: `<p>Hi ${name},</p><p>Thank you for reaching out! I have received your message and will get back to you shortly.</p>`,
          });
        }
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    res.status(201).json({
      message: "Message sent successfully",
      data: createdMessage,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to send message", error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

exports.markMessageRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    res.status(400).json({ message: "Failed to update message" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message" });
  }
};
