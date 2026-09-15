export const profile = {
  name: "Erwin Roy Arellano",
  shortName: "Erwin",
  initials: "ERA",
  role: "Software Engineer",
  location: "Quezon City, Philippines",
  email: "it.arellanoerwin@gmail.com",
  summary:
    "Full-stack software engineer with 6+ years building enterprise systems, integration layers, and mobile apps for Philippine businesses. Python, .NET, Angular and Vue on the web; Business Central and Google Cloud underneath.",
  links: {
    github: "https://github.com/erar404",
    linkedin: "https://www.linkedin.com/in/erwinarellano-424918169/",
    googleDev: "https://g.dev/erar404",
    companyGithub: "https://github.com/rgmc-apps",
  },
  currently: {
    role: "Software Engineer",
    company: "RGMC Group Incorporated",
    since: "August 2024",
  },
} as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "RGMC Group Incorporated",
    role: "Software Engineer",
    period: "Aug 2024 to present",
    start: "2024",
    end: "Now",
    location: "Quezon City",
    summary:
      "Part of a lean IT/MIS team that designs, maintains and supports the in-house business applications that run a garment and retail group's core operations.",
    highlights: [
      "Led the adoption of Git-based version control across the team, improving source management, collaboration and change tracking on every project.",
      "Partnered with business units to gather requirements, analyse operational bottlenecks, and ship enhancements and new systems that streamlined their workflows.",
      "Supported the migration of on-premises applications to Google Cloud Platform and Microsoft Dynamics 365 Business Central, improving scalability and maintainability.",
      "Owned work across the full lifecycle: requirements, development, testing, deployment and ongoing support for enterprise applications.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "ASP.NET Core",
      "C#",
      "MS SQL Server",
      "Dynamics NAV",
      "Business Central (AL)",
      "Vue.js",
      "Angular",
      "TypeScript",
      "Ionic",
      "Google Cloud Platform",
      "REST API",
    ],
  },
  {
    company: "Titanium Systems Technologies Inc.",
    role: "Software Engineer I",
    period: "Nov 2018 to Sep 2023",
    start: "2018",
    end: "2023",
    location: "Metro Manila",
    summary:
      "Shared developer across multiple cross-functional teams building MyHR, a Philippine payroll and timekeeping platform used by enterprises and conglomerates.",
    highlights: [
      "Developed and maintained scalable middleware, APIs and backend services in Python for HR systems, integrations and business-critical processes.",
      "Designed data consolidation and analytics solutions with Python and MongoDB to centralise employee data and improve reporting.",
      "Delivered enhancements and new features across enterprise applications and shared business modules for several client accounts.",
      "Took part in code reviews, refactoring, deployments, technical design discussions and Agile ceremonies to keep releases stable.",
      "Supported both modern and legacy applications through front-end work, backend enhancements and system integrations.",
    ],
    stack: [
      "Python",
      "Flask",
      "Django",
      "Celery",
      "Angular.js",
      "ASP Classic",
      "JavaScript",
      "TypeScript",
      "MS SQL Server",
      "MongoDB",
      "MySQL",
      "Windows Server",
      "Linux",
    ],
  },
  {
    company: "IT Group Inc. Asia",
    role: "Intern",
    period: "Sep 2017 to Mar 2018",
    start: "2017",
    end: "2018",
    summary:
      "Supported business operations and client projects while completing a BS in Information Technology.",
    highlights: [
      "Hands-on experience with Oracle NetSuite: system administration, configuration and user support.",
      "Performed database tasks, data management and application support on PostgreSQL.",
      "Maintained and enhanced multiple client websites: content updates, troubleshooting and performance improvements.",
    ],
    stack: ["Oracle NetSuite", "JavaScript", "HTML5", "CSS", "PostgreSQL", "Red Hat Linux"],
  },
];

export const education = [
  {
    school: "Polytechnic University of the Philippines, Quezon City Campus",
    degree: "Bachelor of Science in Information Technology",
    period: "2014 to 2018",
    notes: [
      "Project Manager for the capstone project Human Resource Management System 4: timekeeping, compensation planning and payroll modules built on Java Spring MVC and MS SQL.",
      "Vice President Internal of Commonwealth IT Society (CommITs), the university IT community.",
    ],
  },
  {
    school: "Saint Joseph's College of Quezon City",
    degree: "High School",
    period: "2010 to 2014",
    notes: [],
  },
  {
    school: "Starland International School",
    degree: "Elementary",
    period: "2004 to 2010",
    notes: [],
  },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent" },
  { name: "Spanish", level: "Intermediate" },
  { name: "German", level: "Basic" },
  { name: "Filipino", level: "Native" },
];

export type SkillLevel = "Advanced" | "Intermediate" | "Working";

export type SkillGroup = {
  title: string;
  blurb: string;
  items: { name: string; level?: SkillLevel; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend and integration",
    blurb: "Where most of my commits land: services that sit between people, ERPs and databases.",
    items: [
      { name: "Python", level: "Advanced" },
      { name: "FastAPI", level: "Advanced" },
      { name: "Flask", level: "Advanced" },
      { name: "SQLAlchemy", level: "Intermediate" },
      { name: "pyodbc", level: "Intermediate" },
      { name: "Celery", level: "Intermediate" },
      { name: "Pandas", level: "Intermediate" },
      { name: "Django", level: "Intermediate" },
      { name: "ASP.NET Core", level: "Intermediate" },
      { name: "C#", level: "Working" },
      { name: "Node.js / TypeScript", level: "Intermediate" },
      { name: "FoxPro", level: "Intermediate" },
    ],
  },
  {
    title: "Web and mobile",
    blurb: "Front-ends for field staff, admins and customers, from classic Angular to Ionic and Compose.",
    items: [
      { name: "Angular", level: "Intermediate" },
      { name: "Vue 3", level: "Intermediate" },
      { name: "Ionic (Vue, React)", level: "Intermediate" },
      { name: "React / Next.js", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "HTML5 / CSS3", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "Kotlin / Android", level: "Working" },
      { name: "Compose Multiplatform", level: "Working" },
    ],
  },
  {
    title: "Data and ERP",
    blurb: "Databases I have modelled, migrated and reported on, plus the ERP layer they feed.",
    items: [
      { name: "MS SQL Server", level: "Advanced" },
      { name: "PostgreSQL / Supabase", level: "Intermediate" },
      { name: "MongoDB", level: "Working" },
      { name: "MySQL", level: "Working" },
      { name: "BigQuery", level: "Working" },
      { name: "Dynamics 365 Business Central (AL)", level: "Intermediate" },
      { name: "LS Central", level: "Working" },
      { name: "Dynamics NAV", level: "Working" },
      { name: "OData v4", level: "Intermediate" },
    ],
  },
  {
    title: "Cloud, delivery and tooling",
    blurb: "How the work gets shipped and kept alive.",
    items: [
      { name: "Google Cloud Platform", level: "Intermediate", note: "Cloud Run, Cloud Tasks, GCS, Logging" },
      { name: "Docker", level: "Intermediate" },
      { name: "Git / GitHub", level: "Intermediate" },
      { name: "Jira", level: "Intermediate" },
      { name: "Windows Server", level: "Intermediate" },
      { name: "Ubuntu / Linux", level: "Working" },
      { name: "Microsoft Teams Bot Framework", level: "Working" },
    ],
  },
  {
    title: "AI-assisted engineering",
    blurb: "Used as tools in the loop: prompt design, vision pipelines and agentic coding workflows.",
    items: [
      { name: "OpenAI API (GPT-4.1 Vision)", level: "Intermediate" },
      { name: "Claude / Claude Code", level: "Intermediate" },
      { name: "Gemini", level: "Intermediate" },
      { name: "Google Stitch", level: "Working" },
      { name: "OCR pipelines (RapidOCR, EasyOCR, Tesseract)", level: "Working" },
    ],
  },
];
