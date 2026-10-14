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
  "home.services": s("What we do", "Full-lifecycle", "software & digital services", "One accountable team for discovery, design, engineering, quality, deployment, training and long-term support."),
  "home.products": s("Our products", "Software that runs", "real organisations", "16 ready-to-deploy products — licensed, subscribed or fully managed as SaaS — and the engineering team to tailor them to you."),
  "home.ai": s("AI & Intelligent Automation", "AI that does real work", "inside your business", "We design and integrate AI where it measurably reduces effort — with human review, security and monitoring built in."),
  "home.why": s("Why 4axiz", "What makes us", "different", "You get a team that has already built systems like yours, for institutions that audit everything — and will still be here to support the platform in five years."),
  "home.industries": s("Industries", "Industries", "we serve", "Solutions shaped around the pressures of your sector."),
  "home.projects": s("Portfolio", "Flagship", "Projects", "Live, supported systems for UN agencies, INGOs, government and enterprise."),
  "home.clients": s("Clients & partners", "Trusted by 60+", "organisations", "Government directorates, UN agencies, international NGOs and corporate groups rely on platforms engineered by 4axiz."),
  "home.tech": s("Technology", "Technologies", "we work with", "Modern frameworks for new builds — and deep experience with the platforms many businesses already run on."),
  "home.process": s("How we work", "A clear process from first conversation to", "long-term support", "A nine-phase delivery model with formal deliverables at each gate. Smaller engagements use the same discipline compressed into fewer phases."),
  "home.blog": s("Insights", "Latest", "articles", "News, ideas and practical guides from our team."),
  "home.testimonials": s("Client voices", "What our clients", "say", null),
  "home.presence": s("Global presence", "Local roots.", "Worldwide impact.", "Engineering hubs in Dhaka and Auckland and a commercial presence in the United States — delivering to programmes that span more than 180 countries."),
  "home.cta": s("", "Want to build something great together?", null, "Tell us about your goals. We'll respond with practical next steps — a product demo, a discovery workshop or a scoped proposal."),
  "page.solutions": s("Solutions", "Technology solutions for every stage of growth.", null, "Whether you need a connected ERP, practical AI or a system built around a unique process, we combine proven products with tailored engineering."),
  "page.products": s("Products", "Business software built to run real operations.", null, "From the connected 4axiz ERP platform to 16 ready-to-deploy products — configured to your process, hosted where you need them and supported under SLA."),
  "page.services": s("What we do", "Full-lifecycle software & digital services.", null, "Nine core services and twelve areas of specialist expertise — delivered by one in-house team from discovery to long-term support."),
  "page.projects": s("Portfolio", "Projects we've designed, built and delivered.", null, "Flagship programmes for UN agencies, INGOs, government and enterprise — plus platforms running in the field across health, education and commerce."),
  "page.industries": s("Industries & sectors", "Built for sectors that are governed, funded and audited.", null, "Government directorates, UN agencies, international and local NGOs, healthcare, education and corporate groups — each with its own regulations, workflows and reporting."),
  "page.team": s("Our team", "The people who design, build and support your software.", null, "45 engineers, designers, QA specialists and project managers in one building — no subcontracting, no hand-offs between vendors."),
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
