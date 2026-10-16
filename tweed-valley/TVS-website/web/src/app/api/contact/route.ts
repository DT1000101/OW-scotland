import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/firebaseAdmin";

const TO = process.env.CONTACT_TO_EMAIL || "onewheelscotland@gmail.com";

export async function POST(req: Request) {
  const { name, email, message } = (await req.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "That email looks off." }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // 1. Store the enquiry in Firestore (if Admin SDK is configured).
  const admin = getAdmin();
  if (admin) {
    try {
      await admin.db.collection("enquiries").add({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        handled: false,
      });
      stored = true;
    } catch {
      // fall through — we still try to email
    }
  }

  // 2. Email it to the team (if Resend is configured).
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL; // must be a Resend-verified sender
  if (resendKey && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [TO],
          reply_to: email.trim(),
          subject: `New enquiry from ${name.trim()}`,
          text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
        }),
      });
      emailed = res.ok;
    } catch {
      // ignore — enquiry is still stored
    }
  }

  // As long as we captured it somewhere, treat it as success.
  if (!stored && !emailed) {
    return NextResponse.json({
      ok: true,
      stored,
      emailed,
      note: "Received, but storage/email are not configured yet.",
    });
  }

  return NextResponse.json({ ok: true, stored, emailed });
}
