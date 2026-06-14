import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/constants";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = body.name?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim() ?? "";
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO ?? COMPANY.contactEmail;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please contact us by phone instead.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const subject = `AI Gateway enquiry from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `"AI Gateway Website" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
