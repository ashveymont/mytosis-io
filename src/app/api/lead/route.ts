import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, company } = await request.json();

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("Lead capture is missing RESEND_API_KEY or RESEND_EMAIL");
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

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
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
