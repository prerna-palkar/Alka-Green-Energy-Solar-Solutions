/**
 * Application Constants
 */

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Services Overview", path: "/services" },
      { label: "Residential Solar", path: "/services/residential" },
      { label: "Commercial Solar", path: "/services/commercial" },
      { label: "Industrial Solar", path: "/services/industrial" },
    ],
  },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Govt Schemes", path: "/government-schemes" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export const INSTALLATION_STEPS = [
  { step: 1, title: "Enquiry", desc: "Submit your basic requirement or request a free consultation with our solar experts." },
  { step: 2, title: "Site Visit", desc: "Our technical team inspects your roof orientation, shadow profile, and structural integrity." },
  { step: 3, title: "Requirement Assessment", desc: "We evaluate your monthly electricity usage and design a custom solar system layout." },
  { step: 4, title: "Quotation", desc: "Transparent, itemized pricing proposal detailing panel quality, inverter specifications, and estimates." },
  { step: 5, title: "Approval", desc: "Finalize agreement and complete net-metering & government subsidy application paperwork." },
  { step: 6, title: "Installation", desc: "Certified solar technicians install heavy-duty structure, panels, wiring, and inverter." },
  { step: 7, title: "Testing", desc: "Comprehensive electrical testing, grid synchronization, and safety inspection checks." },
  { step: 8, title: "Completion", desc: "Commissioning of the solar system, grid synchronization, and user training provided." },
];

export const CUSTOMER_TYPES = [
  { value: "residential", label: "Residential Homeowner" },
  { value: "commercial", label: "Commercial Business / Store / Complex" },
  { value: "industrial", label: "Industrial Factory / Plant / Warehouse" },
  { value: "agricultural", label: "Agricultural / Solar Pump" },
  { value: "other", label: "Other Inquiry" },
];
