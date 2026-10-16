import { NextResponse } from "next/server";
import { getStripe, TICKET } from "@/lib/stripe";

type Attendee = { name: string; email: string };

export async function POST(req: Request) {
  const stripe = getStripe();
  const { buyerName, buyerEmail, attendees } = (await req.json()) as {
    buyerName?: string;
    buyerEmail?: string;
    attendees?: Attendee[];
  };

  const riders = (attendees ?? []).filter((a) => a.name.trim());
  if (riders.length === 0) {
    return NextResponse.json(
      { error: "Add at least one rider." },
      { status: 400 }
    );
  }

  // Payments not configured yet — respond gracefully so the UI can show a note.
  if (!stripe) {
    return NextResponse.json({
      url: null,
      message:
        "Payments are not connected yet. Add your Stripe keys to enable checkout.",
    });
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  // We keep attendee details in metadata so organisers can match tickets to
  // people by hand (v1 approach for a ~50 person event).
  const attendeeSummary = riders
    .map((r) => `${r.name}${r.email ? ` <${r.email}>` : ""}`)
    .join("; ");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: riders.length,
        price_data: {
          currency: TICKET.currency,
          unit_amount: TICKET.amount,
          product_data: {
            name: TICKET.name,
            description: TICKET.description,
          },
        },
      },
    ],
    customer_email: buyerEmail || undefined,
    metadata: {
      buyerName: buyerName ?? "",
      buyerEmail: buyerEmail ?? "",
      ticketCount: String(riders.length),
      attendees: attendeeSummary.slice(0, 490), // Stripe metadata value limit
    },
    success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tickets`,
  });

  return NextResponse.json({ url: session.url });
}
