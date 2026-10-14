/**
 * Client and partner logos, taken from the 4axiz Company Profile 2026
 * ("Trusted across sectors" and "Clients & partners"). Files live in
 * /public/images/clients/. Editors can add, remove or reorder logos on the site.
 */
export interface ClientLogo {
  name: string;
  logo: { src: string; width: number; height: number };
  url?: string;
}

export const clients: ClientLogo[] = [
  { name: "UNDP", logo: { src: "/images/clients/undp.webp", width: 288, height: 142 } },
  { name: "Management Sciences for Health", logo: { src: "/images/clients/management-sciences-for-health.webp", width: 360, height: 149 } },
  { name: "Pathfinder", logo: { src: "/images/clients/pathfinder.webp", width: 360, height: 48 } },
  { name: "Toyota", logo: { src: "/images/clients/toyota.webp", width: 196, height: 160 } },
  { name: "DGFP", logo: { src: "/images/clients/dgfp.webp", width: 262, height: 160 } },
  { name: "Ministry of Health & Family Welfare", logo: { src: "/images/clients/ministry-of-health-family-welfare.webp", width: 253, height: 145 } },
  { name: "National Tuberculosis Control Programme", logo: { src: "/images/clients/national-tuberculosis-control-programme.webp", width: 160, height: 160 } },
  { name: "Bureau of Health Education", logo: { src: "/images/clients/bureau-of-health-education.webp", width: 110, height: 160 } },
  { name: "CPTU e-GP", logo: { src: "/images/clients/cptu-e-gp.webp", width: 190, height: 82 } },
  { name: "Dhaka Medical College", logo: { src: "/images/clients/dhaka-medical-college.webp", width: 150, height: 150 } },
  { name: "BCCP", logo: { src: "/images/clients/bccp.webp", width: 211, height: 122 } },
  { name: "DSK", logo: { src: "/images/clients/dsk.webp", width: 360, height: 87 } },
  { name: "Hospice Bangladesh", logo: { src: "/images/clients/hospice-bangladesh.webp", width: 123, height: 83 } },
  { name: "Karim Group", logo: { src: "/images/clients/karim-group.webp", width: 179, height: 160 } },
  { name: "ACI Godrej", logo: { src: "/images/clients/aci-godrej.webp", width: 349, height: 109 } },
  { name: "BazarNao", logo: { src: "/images/clients/bazarnao.webp", width: 360, height: 98 }, url: "https://bazarnao.com" },
  { name: "Unikart", logo: { src: "/images/clients/unikart.webp", width: 299, height: 91 } },
  { name: "University of Northern Iowa", logo: { src: "/images/clients/university-of-northern-iowa.webp", width: 138, height: 64 } },
  { name: "BICM", logo: { src: "/images/clients/bicm.webp", width: 331, height: 158 } },
  { name: "Great Eastern", logo: { src: "/images/clients/great-eastern.webp", width: 360, height: 106 } },
  { name: "Riant Group", logo: { src: "/images/clients/riant-group.webp", width: 133, height: 49 } },
  { name: "Maisha Construction", logo: { src: "/images/clients/maisha-construction.webp", width: 360, height: 57 } },
  { name: "Max Management", logo: { src: "/images/clients/max-management.webp", width: 113, height: 45 } },
  { name: "Dozweb", logo: { src: "/images/clients/dozweb.webp", width: 360, height: 139 } },
  { name: "Peerbits", logo: { src: "/images/clients/peerbits.webp", width: 360, height: 86 } },
  { name: "Byteshake Design", logo: { src: "/images/clients/byteshake-design.webp", width: 119, height: 58 } },
  { name: "JuniorAid", logo: { src: "/images/clients/junioraid.webp", width: 130, height: 53 } },
  { name: "Nabil Foundation", logo: { src: "/images/clients/nabil-foundation.webp", width: 126, height: 79 } },
  { name: "Jessore City Cable", logo: { src: "/images/clients/jessore-city-cable.webp", width: 136, height: 79 } },
  { name: "Cedar Valley Food Runner", logo: { src: "/images/clients/cedar-valley-food-runner.webp", width: 137, height: 84 } },
  { name: "Anytime Office", logo: { src: "/images/clients/anytime-office.webp", width: 85, height: 92 } },
];
