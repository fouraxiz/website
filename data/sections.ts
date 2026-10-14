/**
 * Editable section headings. Keys starting with "home." are homepage sections:
 * their order and visibility on the homepage follow the database order.
 */
export interface SectionCopy {
  eyebrow: string | null;
  title: string | null;
  highlight: string | null;
  description: string | null;
  hidden: boolean;
}

const s = (eyebrow: string, title: string, highlight: string | null, description: string | null): SectionCopy => ({
  eyebrow,
  title,
  highlight,
  description,
  hidden: false,
});

export const sectionDefaults: Record<string, SectionCopy> = {
  "home.about": s("About 4axiz", "Who", "We Are", null),
  "home.services": s("What we do", "Our", "Services", "One accountable team for strategy, design, engineering, quality and long-term support."),
  "home.products": s("Our products", "Software that runs", "real businesses", "Ready-to-deploy business software — and the engineering team to tailor it to you."),
  "home.ai": s("AI & Intelligent Automation", "AI that does real work", "inside your business", "We design and integrate AI where it measurably reduces effort — with human review, security and monitoring built in."),
  "home.why": s("Why 4axiz", "What makes us", "different", "We combine our own proven products with custom engineering — so you get software that fits, delivered by a team that stays with you long after launch."),
  "home.industries": s("Industries", "Industries", "we serve", "Solutions shaped around the pressures of your sector."),
  "home.projects": s("Portfolio", "Featured", "Projects", "Products, platforms and custom systems we've designed and delivered."),
  "home.clients": s("Clients", "Trusted by", "organisations", null),
  "home.tech": s("Technology", "Technologies", "we work with", "Modern frameworks for new builds — and deep experience with the platforms many businesses already run on."),
  "home.process": s("How we work", "A clear process from first conversation to", "long-term support", "Six stages, each with tangible outputs you can review — so you always know where your project stands."),
  "home.blog": s("Insights", "Latest", "articles", "News, ideas and practical guides from our team."),
  "home.testimonials": s("Client voices", "What our clients", "say", null),
  "home.presence": s("Global presence", "Three countries.", "One team.", "Offices in Bangladesh, New Zealand and Kosovo let us work closely with clients across regions and time zones."),
  "home.cta": s("", "Want to build something great together?", null, "Tell us about your goals. We'll respond with practical next steps — a product demo, a discovery workshop or a scoped proposal."),
  "page.solutions": s("Solutions", "Technology solutions for every stage of growth.", null, "Whether you need a connected ERP, practical AI or a system built around a unique process, we combine proven products with tailored engineering."),
  "page.products": s("Products", "Business software built to run real operations.", null, "From the connected 4axiz ERP platform to focused products for retail and education — plus custom solutions when your process needs something of its own."),
  "page.services": s("Services", "Engineering services from strategy to support.", null, "A single team that can take your idea from discovery to production — and keep it running well for years after launch."),
  "page.projects": s("Portfolio", "Projects we've designed, built and delivered.", null, "Products, platforms and custom systems across education, retail, financial services and the public sector."),
  "page.industries": s("Industries", "Solutions shaped around your sector.", null, "Every industry has its own regulations, workflows and pressures. We bring solutions designed for them — and the flexibility to fit your organisation."),
  "page.team": s("Our team", "The people who design, build and support your software.", null, "Engineers, designers, analysts and specialists working across three countries — united by a commitment to software that works well for the people who use it."),
  "page.careers": s("Careers", "Build software that organisations rely on.", null, "Join a team working on ERP platforms, AI integrations and custom applications for clients across markets."),
  "page.contact": s("Contact", "Let's talk about what you're building.", null, "Tell us about your organisation, the challenge you're facing or the product you'd like to see. We'll get back to you with practical next steps."),
  "page.blog": s("Blog", "Insights from the 4axiz team.", null, "Practical articles on ERP, AI, software development and running a digital business."),
};

/** Homepage section order (initial). */
export const homeSectionOrder = [
  "home.about",
  "home.services",
  "home.products",
  "home.ai",
  "home.why",
  "home.industries",
  "home.projects",
  "home.clients",
  "home.tech",
  "home.process",
  "home.blog",
  "home.testimonials",
  "home.presence",
  "home.cta",
];
