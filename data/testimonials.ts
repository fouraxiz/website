import type { Testimonial } from "@/types";

/**
 * Client testimonials. Only entries with `approved: true` are rendered.
 *
 * Empty until genuine, approved testimonials are supplied — the homepage
 * section is hidden while there are none.
 */
export const testimonials: Testimonial[] = [];

export const approvedTestimonials = testimonials.filter((t) => t.approved);
