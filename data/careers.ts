import type { JobOpening } from "@/types";

/**
 * Open positions. Empty until real openings are published — the careers page
 * shows an empty state that invites speculative applications via /contact.
 */
export const jobOpenings: JobOpening[] = [];

export const careerBenefits = [
  { title: "Meaningful work", description: "Build software that organisations rely on every day, from ERP platforms to AI-powered tools." },
  { title: "International exposure", description: "Collaborate with colleagues and clients across Bangladesh, New Zealand and Kosovo." },
  { title: "Growth through practice", description: "Code review, mentoring and real responsibility help you grow quickly." },
  { title: "Modern engineering", description: "Work with current frameworks, cloud tooling and AI technologies." },
];
