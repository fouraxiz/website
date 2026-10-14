import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { getInterestValues } from "@/lib/contact-options";

/**
 * Contact form endpoint.
 *
 * INTEGRATION POINT: set CONTACT_WEBHOOK_URL (server-side env var) to any
 * endpoint that accepts a JSON POST — a CRM, Zapier/Make webhook, Formspree,
 * or an internal API. Until it is set, this route returns 503
 * `not_configured` and the form tells the visitor plainly that nothing was
 * sent. It never reports success unless the downstream service accepted the
 * inquiry.
 */
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const payload: ContactPayload = {
    type: body.type === "general" ? "general" : "project",
    interest: String(body.interest ?? ""),
    name: String(body.name ?? "").slice(0, 200),
    email: String(body.email ?? "").slice(0, 254),
    company: String(body.company ?? "").slice(0, 200),
    phone: String(body.phone ?? "").slice(0, 40),
    budget: String(body.budget ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
    context: String(body.context ?? "").slice(0, 200),
    website: String(body.website ?? ""),
  };

  // Honeypot filled: accept silently without forwarding.
  if (payload.website) return NextResponse.json({ ok: true });

  const fields = validateContact(payload, await getInterestValues());
  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "validation", fields }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, ...inquiry } = payload;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inquiry, submittedAt: new Date().toISOString(), source: "website-contact-form" }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`Contact webhook responded with ${res.status}`);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact webhook request failed", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
