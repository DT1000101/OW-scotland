// Server-side Stripe client. Returns null if the secret key isn't set yet,
// so the checkout route can respond with a friendly "not configured" message
// instead of crashing during early development.

import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) {
    stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  }
  return stripe;
}

export const TICKET = {
  name: "Weekend Pass",
  description: "Full weekend rider pass for Tweed Valley Senduro.",
  // Price in pence. Placeholder until costs are modelled.
  amount: 6500,
  currency: "gbp",
};
