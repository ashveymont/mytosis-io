import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

async function saveToDatabase(name: string, email: string, company: string) {
  if (!process.env.POSTGRES_URL) return false;

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`
    INSERT INTO leads (name, email, company)
    VALUES (${name}, ${email}, ${company});
  `;

  return true;
}

async function sendNotificationEmail(name: string, email: string, company: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_EMAIL;

  if (!apiKey || !toEmail) return false;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Mytosis Leads <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New early access request — ${company}`,
    text: `Full name: ${name}\nWork email: ${email}\nHotel group / chain: ${company}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  const { name, email, company, website, elapsedMs } = await request.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof company !== "string" ||
    !name.trim() ||
    !company.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot filled, or submitted implausibly fast (< 1.5s) — silently discard
  // without telling the caller it was rejected, so bots don't learn to adapt.
  const isBot =
    (typeof website === "string" && website.trim().length > 0) ||
    (typeof elapsedMs === "number" && elapsedMs < 1500);

  if (isBot) {
    return NextResponse.json({ ok: true });
  }

  const [dbResult, emailResult] = await Promise.allSettled([
    saveToDatabase(name, email, company),
    sendNotificationEmail(name, email, company),
  ]);

  const dbSaved = dbResult.status === "fulfilled" && dbResult.value;
  const emailSent = emailResult.status === "fulfilled" && emailResult.value;

  if (dbResult.status === "rejected") {
    console.error("Database error:", dbResult.reason);
  }

  if (!dbSaved && !emailSent) {
    console.error("Lead capture failed entirely — no database or email configured, or both failed.");
    return NextResponse.json({ error: "Failed to submit." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
