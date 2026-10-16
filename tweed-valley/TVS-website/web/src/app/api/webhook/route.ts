import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getAdmin } from "@/lib/firebaseAdmin";

// Stripe webhook. Records each completed purchase (with the attendee list) so
// organisers can reconcile tickets against waivers by hand. Requires
// STRIPE_WEBHOOK_SECRET and the Firebase Admin env vars to actually store data.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ received: true, stored: false });
  }

  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig ?? "", secret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature failed: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      amount_total: number | null;
      customer_email: string | null;
      metadata: Record<string, string> | null;
    };
    const admin = getAdmin();
    if (admin) {
      await admin.db
        .collection("purchases")
        .doc(session.id)
        .set({
          stripeSessionId: session.id,
          amountTotal: session.amount_total,
          buyerEmail: session.customer_email ?? session.metadata?.buyerEmail ?? null,
          buyerName: session.metadata?.buyerName ?? null,
          ticketCount: Number(session.metadata?.ticketCount ?? 0),
          attendees: session.metadata?.attendees ?? "",
          paidAt: new Date().toISOString(),
          reconciled: false,
        });
    }
  }

  return NextResponse.json({ received: true });
}
