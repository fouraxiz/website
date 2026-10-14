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
  /** General inbox (from the existing fouraxiz.com footer). */
  email: "admin@4axiz.com" as string | null,
  /** 24/7 hotline (from the existing fouraxiz.com header). */
  phone: "+880 1718 837 689" as string | null,
  /** "Serving local and global markets since 2010" — existing fouraxiz.com About page. */
  foundedYear: 2010 as number | null,
};

/** Technologies listed on the existing fouraxiz.com About page. */
export const technologies = [
  { name: ".NET / ASP.NET", icon: "siDotnet" },
  { name: "PHP", icon: "siPhp" },
  { name: "Laravel", icon: "siLaravel" },
  { name: "CodeIgniter", icon: "siCodeigniter" },
  { name: "CakePHP", icon: "siCakephp" },
  { name: "React.js", icon: "siReact" },
  { name: "Vue.js", icon: "siVuedotjs" },
  { name: "Flutter", icon: "siFlutter" },
  { name: "WordPress", icon: "siWordpress" },
  { name: "Drupal", icon: "siDrupal" },
  { name: "Joomla", icon: "siJoomla" },
] as const;

/**
 * Headline numbers. Only verifiable values are shown. Add confirmed figures
 * (e.g. projects delivered, clients served) here — each renders automatically.
 */
export const stats: { value: string; label: string }[] = [
  { value: "2010", label: "Serving clients since" },
  { value: "3", label: "Countries with offices" },
  { value: "11+", label: "Technologies we work in" },
  { value: "24/7", label: "Hotline support" },
];

export const offices: Office[] = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    countryCode: "BD",
    role: null,
    city: "Dhaka",
    address: "Level-4, House #34, Lane #6/2, Road #20/B, DUIP Plot, Block D, Mirpur-12, Dhaka 1216",
    phone: "+880 1718 837 689",
    email: "admin@4axiz.com",
    hours: null,
    timezone: "GMT+6",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=DUIP+Plot+Block+D+Mirpur-12+Dhaka+1216",
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
