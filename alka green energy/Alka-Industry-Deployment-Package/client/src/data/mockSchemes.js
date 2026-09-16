/**
 * Government Solar Schemes Data Structure
 * Structured overview for government schemes (PM Surya Ghar, Rooftop Subsidy framework).
 * Avoids inventing unverified figures; focuses on verified framework principles.
 */

export const GOVERNMENT_SCHEMES_DATA = {
  title: "Government Solar Schemes & Policy Frameworks",
  subtitle: "Explore official government initiatives designed to promote rooftop solar adoption.",
  schemes: [
    {
      id: "pm-surya-ghar",
      name: "PM Surya Ghar: Muft Bijli Yojana",
      authority: "Ministry of New and Renewable Energy (MNRE), Govt. of India",
      summary: "A national initiative aimed at encouraging rooftop solar installations for residential households across India.",
      eligibility: [
        "Applicant must be an Indian citizen.",
        "Must own a residential property with a suitable, shade-free roof.",
        "Must have a valid electricity connection with the local discom.",
        "System must use approved solar modules and grid-tie inverters as specified under official DISCOM portals."
      ],
      benefitsOverview: [
        "Central Financial Assistance (CFA) provided under official MNRE norms.",
        "Grid integration through bi-directional Net Metering.",
        "Reduced dependence on conventional utility grid electricity.",
        "Long-term clean green energy generation for domestic consumption."
      ],
      requiredDocuments: [
        "Recent electricity bill copy",
        "Identity proof (Aadhaar Card / Voter ID)",
        "Proof of roof ownership / property documents",
        "Bank account details (for subsidy disbursement processing)",
        "Passport size photograph of the applicant"
      ],
      applicationSteps: [
        { step: 1, title: "Portal Registration", desc: "Register on the official PM Surya Ghar National Portal with your Electricity Distribution Company (DISCOM) consumer account number." },
        { step: 2, title: "Rooftop Application", desc: "Submit the rooftop solar application for technical feasibility approval from your local DISCOM." },
        { step: 3, title: "Installation by Empanelled Vendor", desc: "Select an empanelled solar installer like Alka Green Energy Solar Solutions to carry out site assembly and wiring." },
        { step: 4, title: "Net Metering & Commissioning", desc: "DISCOM inspects the site, installs the bi-directional net meter, and issues the commissioning report." },
        { step: 5, title: "Subsidy Claim Submission", desc: "Submit commissioning details and bank credentials on the portal for direct subsidy credit." }
      ],
      officialLinks: [
        { label: "PM Surya Ghar National Portal", url: "https://pmsuryaghar.gov.in" },
        { label: "MNRE Official Website", url: "https://mnre.gov.in" }
      ]
    },
    {
      id: "state-solar-policy",
      name: "Maharashtra State Solar Energy Framework",
      authority: "MSEDCL / MEDA (Maharashtra Energy Development Agency)",
      summary: "State-level regulatory framework facilitating net metering, open access, and rooftop solar grid synchronization in Maharashtra.",
      eligibility: [
        "Residential, commercial, and industrial consumers of MSEDCL / local DISCOMs in Maharashtra.",
        "Feasibility subject to local transformer capacity allocation guidelines."
      ],
      benefitsOverview: [
        "Net metering energy credit roll-over as per MSERC regulations.",
        "Support for commercial and industrial group captive & rooftop setups.",
        "Standardized grid inter-connection guidelines."
      ],
      requiredDocuments: [
        "Latest electricity bill",
        "GST certificate (for commercial / industrial entities)",
        "Site layout diagram and single line diagram (SLD)",
        "DISCOM NOC forms"
      ],
      applicationSteps: [
        { step: 1, title: "MSEDCL Portal Filing", desc: "Submit online application on the MSEDCL RE portal." },
        { step: 2, title: "Feasibility Sanction", desc: "Receive technical sanction based on distribution transformer capacity." },
        { step: 3, title: "Execution & Testing", desc: "Complete installation and submit work completion report with test results." },
        { step: 4, title: "Meter Installation", desc: "Discom installs net meter and activates grid export tracking." }
      ],
      officialLinks: [
        { label: "MSEDCL Solar Portal", url: "https://www.mahadiscom.in" },
        { label: "MEDA Official Portal", url: "https://www.mahaurja.com" }
      ]
    }
  ]
};
