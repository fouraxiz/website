import type { ProcessStep } from "@/types";

/** Nine-phase delivery methodology — Company Profile 2026. Smaller engagements compress it into fewer phases. */
export const processSteps: ProcessStep[] = [
  {
    title: "Initiation & requirement analysis",
    description: "Kick-off, stakeholder consultation, process review, workflow analysis and requirement validation.",
    outputs: ["Inception report", "Work plan", "Requirement validation report"],
    icon: "search",
  },
  {
    title: "System design & architecture",
    description: "Functional design, data model, security model and integration design.",
    outputs: ["System design document", "Data dictionary"],
    icon: "compass",
  },
  {
    title: "UI/UX design & prototyping",
    description: "Wireframes, interface design, navigation and usability review.",
    outputs: ["Approved UI/UX prototype"],
    icon: "pen-tool",
  },
  {
    title: "Core development",
    description: "Module-wise development of the core platform and business logic.",
    outputs: ["Working core modules"],
    icon: "code",
  },
  {
    title: "Mobile & field modules",
    description: "Offline data collection, GPS, evidence capture and synchronisation.",
    outputs: ["Mobile application build"],
    icon: "smartphone",
  },
  {
    title: "Integration & dashboards",
    description: "Third-party integration, indicator engine, dashboards and reporting.",
    outputs: ["Reporting and dashboard suite"],
    icon: "bar-chart",
  },
  {
    title: "Testing & UAT",
    description: "Functional, performance, security and user acceptance testing.",
    outputs: ["Test reports", "UAT sign-off"],
    icon: "test-tube",
  },
  {
    title: "Deployment & go-live",
    description: "Production setup, migration, backup configuration and access setup.",
    outputs: ["Production system", "Go-live report"],
    icon: "rocket",
  },
  {
    title: "Post-deployment support",
    description: "Stabilisation, troubleshooting, refinement, training, documentation and handover.",
    outputs: ["Final documentation", "Handover report"],
    icon: "life-buoy",
  },
];
