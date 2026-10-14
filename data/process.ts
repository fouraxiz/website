import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery & Business Analysis",
    description: "We study your goals, users and current processes to understand what success looks like.",
    outputs: ["Stakeholder workshops", "Process maps", "Requirement backlog"],
    icon: "search",
  },
  {
    title: "Strategy & Solution Design",
    description: "We define scope, architecture and a delivery roadmap with clear priorities.",
    outputs: ["Solution architecture", "Delivery roadmap", "Estimates"],
    icon: "compass",
  },
  {
    title: "UI/UX & Prototyping",
    description: "We design interfaces and test clickable prototypes before development begins.",
    outputs: ["User flows", "Interactive prototype", "Design system"],
    icon: "pen-tool",
  },
  {
    title: "Development & Integration",
    description: "We build in short sprints, integrating with your systems and demoing progress regularly.",
    outputs: ["Sprint demos", "Reviewed code", "Integrations"],
    icon: "code",
  },
  {
    title: "Testing & Quality Assurance",
    description: "We verify functionality, performance and security before anything reaches users.",
    outputs: ["Test plans", "Regression suites", "UAT sign-off"],
    icon: "test-tube",
  },
  {
    title: "Deployment & Ongoing Support",
    description: "We launch carefully, train your teams and stay on to support and improve.",
    outputs: ["Go-live plan", "User training", "Support & SLAs"],
    icon: "rocket",
  },
];
