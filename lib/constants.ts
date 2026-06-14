export const COMPANY = {
  name: "AI Gateway",
  positioning:
    "Enterprise AI, IoT and Data Intelligence for Oil & Gas and Industrial Operations",
  tagline:
    "Enterprise technology for oil & gas and industrial operations — AI, Industrial IoT and Data Intelligence.",
  eyebrow: "Registered Petronas Vendor · MOF Malaysia Registered",
  headline:
    "Enterprise AI, IoT and Data Intelligence for Oil & Gas Operations",
  subheadline:
    "We work with operators and asset owners to strengthen HSE performance, improve asset reliability and support field and corporate decision-making — through governed AI deployment, industrial IoT and enterprise analytics.",
  phone: "+60 3-7628 5496",
  phoneLabel: "Office: +60 3-7628 5496",
  contactEmail: "subra@aigateway.my",
  address: [
    "E-5-3A, Block E, Oasis Square",
    "2A, Jln PJU 1A/7A, Ara Damansara",
    "47301 Petaling Jaya, Malaysia",
  ],
} as const;

export const CREDENTIALS = [
  {
    label: "Petronas Vendor",
    detail: "Registered vendor within the Petronas Malaysia ecosystem",
    icon: "vendor",
  },
  {
    label: "MOF Malaysia",
    detail: "Registered with the Ministry of Finance Malaysia",
    icon: "government",
  },
  {
    label: "100% Bumiputra",
    detail: "Malaysian-owned technology company, Petaling Jaya HQ",
    icon: "malaysia",
  },
] as const;

export const SEO_KEYWORDS = [
  "AI Solutions Malaysia",
  "Industrial IoT Malaysia",
  "Oil & Gas Digital Transformation",
  "Predictive Maintenance",
  "Safety Management Systems",
  "Data Audit Services",
  "AI Readiness Assessment",
  "Enterprise AI Solutions",
  "AI Gateway",
  "Petronas vendor",
  "Data Intelligence Malaysia",
  "IT Staff Augmentation Malaysia",
  "Workforce Augmentation Oil Gas",
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#services" },
  { label: "Oil & Gas", href: "/oil-gas" },
  { label: "Staff Augmentation", href: "/staff-augmentation" },
  { label: "Training", href: "/training" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SERVICES = [
  {
    title: "AI Solutions",
    description:
      "Knowledge assistants, engineering copilots and governed enterprise AI — integrated with your standards, procedures and operational data.",
    icon: "solutions",
  },
  {
    title: "Industrial IoT",
    description:
      "Sensor integration, equipment health monitoring, condition-based maintenance and real-time visibility across plant and field assets.",
    icon: "asset-monitoring",
  },
  {
    title: "Safety & Compliance",
    description:
      "Mobile HSE inspections, digital permit-to-work, incident reporting and compliance dashboards aligned to operational safety requirements.",
    icon: "safety-compliance",
  },
  {
    title: "Data Audit & AI Readiness",
    description:
      "Structured assessment of data quality, governance, architecture and organisational readiness before AI and analytics investment.",
    icon: "analytics",
  },
  {
    title: "Analytics & Intelligence",
    description:
      "Executive and operational dashboards, production and reliability KPIs, predictive models and performance monitoring.",
    icon: "operations-dashboard",
  },
  {
    title: "Managed Services",
    description:
      "Application support, platform monitoring, model lifecycle management and continuous improvement of deployed solutions.",
    icon: "enterprise",
  },
  {
    title: "Workforce & IT Staff Augmentation",
    description:
      "Supply skilled technology, engineering and project resources for Oil & Gas, Energy and Industrial clients, including IT professionals, data specialists, AI engineers, application developers, cybersecurity resources and project delivery teams.",
    icon: "training",
    href: "/staff-augmentation",
  },
] as const;

export const STAFF_AUGMENTATION_POSITIONING =
  "AI Gateway supports clients not only with solutions, but also with the skilled manpower needed to deliver, operate and scale digital transformation initiatives." as const;

export const STAFF_AUGMENTATION_OFFERINGS = [
  {
    title: "IT Staff Augmentation",
    description:
      "Experienced IT professionals embedded within client teams — systems analysts, support engineers, integration specialists and platform administrators.",
    icon: "enterprise",
  },
  {
    title: "AI & Data Engineering Resources",
    description:
      "Data engineers, ML engineers and AI specialists for pipeline development, model deployment and analytics platform delivery.",
    icon: "analytics",
  },
  {
    title: "Application Developers",
    description:
      "Full-stack and enterprise application developers for web, mobile and operational systems across industrial environments.",
    icon: "solutions",
  },
  {
    title: "Cloud & Infrastructure Engineers",
    description:
      "Cloud architects, DevOps and infrastructure engineers for platform setup, migration, monitoring and operational reliability.",
    icon: "asset-monitoring",
  },
  {
    title: "Cybersecurity Specialists",
    description:
      "Security analysts and engineers for access control, vulnerability assessment, compliance and OT/IT security programmes.",
    icon: "safety-compliance",
  },
  {
    title: "Project Managers & Business Analysts",
    description:
      "Delivery leads and business analysts to define requirements, manage stakeholders and govern technology project execution.",
    icon: "consulting",
  },
  {
    title: "Oil & Gas Digital Transformation Teams",
    description:
      "Cross-functional teams with energy sector experience — combining domain knowledge with AI, IoT and data delivery capability.",
    icon: "oil-gas",
  },
  {
    title: "Contract and Project-Based Resources",
    description:
      "Flexible engagement models — individual specialists, squad-based teams or full project delivery units on contract or project terms.",
    icon: "vendor",
  },
] as const;

export const INDUSTRIES = [
  {
    title: "Oil & Gas",
    description:
      "Upstream, midstream and downstream — covering production operations, asset integrity, HSE, engineering and corporate functions.",
    icon: "oil-gas",
    href: "/oil-gas",
  },
  {
    title: "Energy & Utilities",
    description:
      "Power generation, utilities and energy infrastructure — asset monitoring, operational analytics and safety management.",
    icon: "utilities",
  },
] as const;

export const FEATURED_USE_CASES = [
  {
    title: "Engineering Knowledge Assistant",
    description:
      "Searchable access to design standards, specifications, datasheets and project documentation for engineering teams.",
    icon: "engineering-knowledge",
    domain: "Engineering",
  },
  {
    title: "Maintenance Planning Copilot",
    description:
      "Work order prioritisation, equipment history review and maintenance planning support for reliability teams.",
    icon: "maintenance-copilot",
    domain: "Maintenance",
  },
  {
    title: "HSE Knowledge Assistant",
    description:
      "On-demand retrieval of hazard assessments, PTW requirements, safety procedures and incident response guidance.",
    icon: "hse-knowledge",
    domain: "HSE",
  },
  {
    title: "Asset Performance Analytics",
    description:
      "Correlate production, downtime and maintenance records to identify reliability risks and underperforming equipment.",
    icon: "asset-performance",
    domain: "Asset Integrity",
  },
  {
    title: "Incident Analytics",
    description:
      "Trend analysis, root cause classification and HSE reporting from structured incident and near-miss data.",
    icon: "safety-compliance",
    domain: "HSE",
  },
  {
    title: "Shift Handover Intelligence",
    description:
      "Structured shift summaries, anomaly flags and continuity records for control room and operations teams.",
    icon: "operations-dashboard",
    domain: "Operations",
  },
  {
    title: "Operations Reporting Assistant",
    description:
      "Draft operational reports and KPI summaries from plant data, logs and shift records for management review.",
    icon: "knowledge-assistant",
    domain: "Operations",
  },
  {
    title: "Contract Intelligence",
    description:
      "Structured review of vendor agreements — obligations, commercial terms, HSE clauses and renewal risk.",
    icon: "contract-intelligence",
    domain: "Commercial",
  },
] as const;

export const WHY_US = [
  {
    title: "Registered Petronas Vendor",
    description:
      "Approved vendor status within the Petronas Malaysia ecosystem, with delivery experience across energy sector requirements.",
    icon: "vendor",
  },
  {
    title: "Enterprise Delivery Record",
    description:
      "Experience deploying solutions in governed industrial environments — with attention to security, integration and change management.",
    icon: "enterprise",
  },
  {
    title: "Integrated Technology Stack",
    description:
      "AI, industrial IoT and analytics delivered as one capability — reducing vendor fragmentation across operational technology programmes.",
    icon: "solutions",
  },
  {
    title: "Malaysian Technology Company",
    description:
      "100% Bumiputra-owned, headquartered in Petaling Jaya with local delivery teams and on-site support capability.",
    icon: "malaysia",
  },
  {
    title: "Oil & Gas Domain Focus",
    description:
      "Solutions shaped around upstream, midstream and downstream workflows — not generic software adapted after the fact.",
    icon: "oil-gas",
  },
  {
    title: "Operational Outcomes",
    description:
      "Engagements scoped to HSE performance, asset reliability, production efficiency and decision quality — not technology for its own sake.",
    icon: "practical",
  },
] as const;

export const OIL_GAS_AI_SOLUTIONS = [
  {
    title: "AI Knowledge Assistant",
    description:
      "Enterprise knowledge retrieval across procedures, standards and technical documentation with access controls and audit trails.",
    icon: "knowledge-assistant",
  },
  {
    title: "Engineering Copilot",
    description:
      "Decision support for engineers — design standards, specification lookup, calculation assistance and project history.",
    icon: "engineering-knowledge",
  },
  {
    title: "HSE Knowledge Assistant",
    description:
      "Safety team access to hazard data, PTW rules, emergency procedures and regulatory references in the field.",
    icon: "hse-knowledge",
  },
  {
    title: "Contract Intelligence",
    description:
      "Structured extraction of obligations, commercial terms and risk clauses from service and vendor agreements.",
    icon: "contract-intelligence",
  },
  {
    title: "Operations Copilot",
    description:
      "Support for daily operations — shift reporting, anomaly review, handover preparation and operational queries.",
    icon: "operations-dashboard",
  },
] as const;

export const OIL_GAS_IOT_SOLUTIONS = [
  {
    title: "Asset Monitoring Platform",
    description:
      "Real-time condition monitoring across rotating equipment, pressure systems and critical plant assets with configurable alerting.",
    icon: "asset-monitoring",
  },
  {
    title: "Predictive Maintenance",
    description:
      "Failure prediction from sensor telemetry, maintenance history and operating context to reduce unplanned downtime.",
    icon: "predictive-maintenance",
  },
  {
    title: "Production Intelligence",
    description:
      "Production rate tracking, bottleneck identification and throughput analysis across facilities and units.",
    icon: "asset-performance",
  },
  {
    title: "Digital Operations Dashboard",
    description:
      "Consolidated views of safety, production and reliability KPIs for control room, operations and leadership teams.",
    icon: "operations-dashboard",
  },
] as const;

export const OIL_GAS_SAFETY_SOLUTIONS = [
  {
    title: "Mobile Safety Inspection App",
    description:
      "Digital checklists, photo capture and offline inspection workflows for onshore and remote offshore locations.",
    icon: "safety-compliance",
  },
  {
    title: "Digital Permit-to-Work",
    description:
      "Electronic PTW workflows with hazard identification, isolation verification and multi-level approval controls.",
    icon: "sop-manual",
  },
  {
    title: "Safety Analytics Dashboard",
    description:
      "HSE leading and lagging indicators, incident trends, audit findings and compliance status for management review.",
    icon: "analytics",
  },
  {
    title: "Contractor Safety Management",
    description:
      "Contractor induction tracking, competency verification, safety performance scoring and site access management.",
    icon: "vendor",
  },
] as const;

export const OIL_GAS_DATA_READINESS = [
  {
    title: "Data Quality Assessment",
    description:
      "Evaluation of completeness, accuracy and timeliness across operational, maintenance and corporate data sources.",
    icon: "analytics",
  },
  {
    title: "Data Governance Review",
    description:
      "Assessment of data ownership, stewardship, policies and controls required for enterprise analytics and AI.",
    icon: "government",
  },
  {
    title: "AI Readiness Assessment",
    description:
      "Structured review of infrastructure, data foundations, skills and use case prioritisation for AI programmes.",
    icon: "consulting",
  },
  {
    title: "Data Modernisation Strategy",
    description:
      "Roadmap for data platform consolidation, OT/IT integration and analytics enablement across the organisation.",
    icon: "practical",
  },
] as const;

export const ABOUT_CREDENTIALS = [
  {
    title: "100% Bumiputra Company",
    description:
      "Fully Malaysian-owned, building local technology capability for industrial and energy sector clients.",
    icon: "malaysia",
  },
  {
    title: "Ministry of Finance Registered",
    description:
      "Registered with MOF Malaysia, enabling participation in government and public sector procurement processes.",
    icon: "government",
  },
  {
    title: "Registered Petronas Vendor",
    description:
      "Approved vendor within the Petronas Malaysia vendor ecosystem with energy sector delivery experience.",
    icon: "vendor",
  },
  {
    title: "Industrial Technology Focus",
    description:
      "Dedicated to enterprise AI, industrial IoT, safety systems and data intelligence for operational environments.",
    icon: "solutions",
  },
] as const;

export const ABOUT_FOCUS_AREAS = [
  {
    title: "Enterprise AI",
    description:
      "Knowledge assistants, engineering copilots and governed AI applications for industrial workflows.",
    icon: "solutions",
  },
  {
    title: "Industrial IoT",
    description:
      "Asset monitoring, predictive maintenance, production intelligence and operations dashboards.",
    icon: "asset-monitoring",
  },
  {
    title: "Safety & Compliance",
    description:
      "Mobile HSE tools, digital PTW, inspections, incident management and compliance analytics.",
    icon: "safety-compliance",
  },
  {
    title: "Data Intelligence",
    description:
      "Data audit, AI readiness assessment, analytics platforms and managed application services.",
    icon: "analytics",
  },
] as const;

export const AI_TRAINING_TRACKS = [
  {
    title: "Business AI Training",
    description:
      "For business owners, managers, and marketing teams — practical GenAI skills to improve productivity.",
    icon: "consulting",
    capabilities: [
      "GenAI for Business Leaders",
      "AI Tools for Productivity",
      "AI Content Creation",
    ],
  },
  {
    title: "Developer AI Training",
    description:
      "For developers and tech leads — build production-grade AI applications with modern tools.",
    icon: "solutions",
    capabilities: [
      "RAG Pipeline Development",
      "LangGraph & Agentic AI",
      "Cursor AI Development",
    ],
  },
  {
    title: "Enterprise AI Training",
    description:
      "For IT managers and CTOs — strategy, governance, and enterprise-scale GenAI deployment.",
    icon: "enterprise",
    capabilities: [
      "GenAI Strategy for Leaders",
      "AI Governance & Ethics",
      "Microsoft Copilot for Enterprise",
    ],
  },
] as const;
