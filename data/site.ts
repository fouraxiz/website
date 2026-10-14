import type { Office, SocialLink } from "@/types";

/**
 * Company-level facts. Only verified values are filled in; everything that
 * 4axiz still needs to supply is `null` and is rendered as "to be confirmed".
 * Search the codebase for `null` values in /data to find content gaps.
 */
export const site = {
  name: "4axiz",
  legalName: "4axiz IT Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fouraxiz.com",
  tagline: "Intelligent software for a smarter business future.",
  description:
    "4axiz IT Limited builds enterprise software, ERP platforms, AI-driven automation and custom web and mobile applications that help organisations run with clarity.",
  /** General inbox. `null` until confirmed — the contact page hides mailto links while null. */
  email: null as string | null,
  /** Main phone line. `null` until confirmed. */
  phone: null as string | null,
  /** Year the company was founded. `null` until confirmed; never displayed while null. */
  foundedYear: null as number | null,
};

export const offices: Office[] = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    countryCode: "BD",
    role: null,
    city: null,
    address: null,
    phone: null,
    email: null,
    hours: null,
    timezone: "GMT+6",
    mapUrl: null,
  },
  {
    id: "new-zealand",
    country: "New Zealand",
    countryCode: "NZ",
    role: null,
    city: null,
    address: null,
    phone: null,
    email: null,
    hours: null,
    timezone: "GMT+12 / +13",
    mapUrl: null,
  },
  {
    id: "kosovo",
    country: "Kosovo",
    countryCode: "XK",
    role: null,
    city: null,
    address: null,
    phone: null,
    email: null,
    hours: null,
    timezone: "GMT+1 / +2",
    mapUrl: null,
  },
];

/** Social profiles render only when `url` is set. */
export const socialLinks: SocialLink[] = [
  { network: "linkedin", url: null },
  { network: "facebook", url: null },
  { network: "x", url: null },
  { network: "youtube", url: null },
  { network: "github", url: null },
];

export const companyValues = [
  {
    title: "Clarity over complexity",
    description:
      "We design software that makes work easier to understand — clear screens, clear data and clear ownership of every process.",
  },
  {
    title: "Partnership, not hand-off",
    description:
      "We stay close to our clients after launch, because business software only proves its value once people use it every day.",
  },
  {
    title: "Engineering discipline",
    description:
      "Reviewed code, tested releases and documented decisions. Quality is a habit built into every sprint, not a final checklist.",
  },
  {
    title: "Practical innovation",
    description:
      "We adopt AI and new technology where it solves a real problem — measured by what it improves, not by how new it is.",
  },
];

export const mission =
  "To help organisations operate with clarity and confidence by building dependable business software, connected ERP platforms and practical AI that fit the way they work.";

export const vision =
  "To be a long-term technology partner for growing organisations across markets — known for software that is thoughtfully designed, well engineered and built to last.";
