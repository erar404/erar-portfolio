import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot
};

const LIMITS = { name: 80, email: 160, subject: 140, message: 4000 } as const;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort per-instance rate limit. Serverless instances do not share it, but it still blunts naive abuse.
// The client IP comes from x-forwarded-for, which is trustworthy behind Vercel or a reverse proxy but spoofable
// when the container is exposed directly, so the map is also pruned and capped to stay bounded.
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();
let lastPrune = 0;

function prune(now: number) {
  if (now - lastPrune < WINDOW_MS && hits.size < MAX_TRACKED_IPS) return;
  lastPrune = now;
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  if (hits.size >= MAX_TRACKED_IPS) hits.clear();
}

function rateLimited(ip: string) {
  const now = Date.now();
  prune(now);
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages in a short time. Please try again later." }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please include your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "Please include a valid email." }, { status: 400 });
  if (subject.length < 3) return NextResponse.json({ ok: false, error: "Please include a subject." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ ok: false, error: "Please include a longer message." }, { status: 400 });

  const smtpEmail = process.env.smtp_email;
  const smtpPassword = process.env.smtp_password;
  const sendTo = process.env.send_to_email;
  const port = Number(process.env.smtp_port ?? 587);
  const host = process.env.smtp_host ?? "smtp.gmail.com";

  if (!smtpEmail || !smtpPassword || !sendTo || !Number.isFinite(port)) {
    console.error("[contact] SMTP environment variables are missing (smtp_email, smtp_password, send_to_email, smtp_port).");
    return NextResponse.json({ ok: false, error: "The contact form is not configured yet." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: smtpEmail, pass: smtpPassword },
  });

  const safe = { name: escapeHtml(name), email: escapeHtml(email), subject: escapeHtml(subject), message: escapeHtml(message).replace(/\n/g, "<br />") };
  const stamp = new Date().toISOString();

  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${smtpEmail}>`,
      to: sendTo,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\nReceived: ${stamp}\nIP: ${ip}\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1f1d1a;max-width:640px">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8a8378">New message from your portfolio</p>
          <h2 style="margin:0 0 16px;font-size:20px">${safe.subject}</h2>
          <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
            <tr><td style="padding:2px 12px 2px 0;color:#8a8378">From</td><td>${safe.name} &lt;<a href="mailto:${safe.email}">${safe.email}</a>&gt;</td></tr>
            <tr><td style="padding:2px 12px 2px 0;color:#8a8378">Received</td><td>${stamp}</td></tr>
          </table>
          <div style="padding:16px;border:1px solid #e5e0d6;border-radius:10px;background:#faf8f4">${safe.message}</div>
        </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ ok: false, error: "The message could not be sent right now." }, { status: 502 });
  }
}
