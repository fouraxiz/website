/** Contact form types and validation, shared by the client form and the API route. */

export const budgetOptions = [
  "Not sure yet",
  "Under USD 10,000",
  "USD 10,000 – 25,000",
  "USD 25,000 – 50,000",
  "USD 50,000 – 100,000",
  "Above USD 100,000",
];

export type InquiryType = "general" | "project";

export interface ContactPayload {
  type: InquiryType;
  interest: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  message: string;
  consent: boolean;
  context: string;
  /** Honeypot — must stay empty. */
  website: string;
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{6,24}$/;

export function validateContact(p: ContactPayload, allowedInterests: Set<string>): FieldErrors {
  const e: FieldErrors = {};
  if (!allowedInterests.has(p.interest)) e.interest = "Please choose what you'd like to discuss.";
  if (p.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL_RE.test(p.email.trim())) e.email = "Please enter a valid business email address.";
  if (p.company.trim().length < 2) e.company = "Please enter your company or organisation.";
  if (p.phone.trim() && !PHONE_RE.test(p.phone.trim())) e.phone = "Please enter a valid phone number, or leave it blank.";
  if (p.budget && !budgetOptions.includes(p.budget)) e.budget = "Please choose a budget range.";
  if (p.message.trim().length < 20) e.message = "Please tell us a little more (at least 20 characters).";
  if (p.message.length > 5000) e.message = "Please keep your message under 5,000 characters.";
  if (!p.consent) e.consent = "Please confirm you agree to our privacy policy.";
  return e;
}
