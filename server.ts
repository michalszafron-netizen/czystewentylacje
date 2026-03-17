import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3001', 10);

  app.use(express.json());

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Contact form submission:", req.body);

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Nowa wiadomość z formularza Freedom od: ${name} (${subject})`,
          text: `Imię: ${name}\nEmail: ${email}\nTemat: ${subject}\n\nWiadomość:\n${message}`,
          replyTo: email
        });
        console.log("Email sent successfully!");
        res.json({ success: true });
      } else {
        console.log("Email credentials not configured in .env, skipping email sending.");
        res.json({ success: true, warning: "Email not sent (no credentials)" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[${new Date().toISOString()}] Server running on http://localhost:${PORT} (V13.1 ACTIVE)`);
  });
}

startServer();
