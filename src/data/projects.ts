export type Visibility = "public" | "private";

export type Visual =
  | { kind: "image"; src: string; alt: string; width: number; height: number; secondary?: { src: string; alt: string; width: number; height: number } }
  | { kind: "sketch"; title: string; nodes: { label: string; sub?: string }[]; notes: string[] };

export type Category = "Backend & integration" | "Web & mobile" | "ERP (Business Central)" | "Automation & AI" | "Data";

export type Repo = {
  name: string;
  owner: "rgmc-apps" | "erar404";
  visibility: Visibility;
  category: Category;
  blurb: string;
  stack: string[];
  commits?: number;
  role?: string;
};

export type FeaturedProject = {
  id: string;
  title: string;
  kicker: string;
  repo: Repo;
  description: string[];
  visual: Visual;
  outcomes: string[];
};

const repoUrl = (r: Repo) => `https://github.com/${r.owner}/${r.name}`;
export { repoUrl };

/* ---------- RGMC Group: featured systems ---------- */

export const featuredWork: FeaturedProject[] = [
  {
    id: "rgmc-gateway",
    title: "RGMC Gateway",
    kicker: "Internal IT portal and helpdesk",
    repo: {
      name: "rgmc-gateway",
      owner: "rgmc-apps",
      visibility: "public",
      category: "Web & mobile",
      blurb: "A hub for all the sites of RGMC Group of Companies.",
      stack: ["Python", "Flask 3", "Jinja2", "Vanilla JS", "Supabase (PostgREST)", "Supabase Storage", "SMTP", "Docker", "Cloud Run"],
      commits: 212,
      role: "Primary author",
    },
    description: [
      "A single entry point for every RGMC digital system: a curated launcher with live health checks, a multi-channel IT helpdesk, an issue tracker with admin analytics, a developer Kanban board and a per-user workspace.",
      "Server-rendered Flask blueprints with one vanilla JS module per page and no build step. Supabase is reached over its REST API to keep the dependency list tiny, and ticket events fan out to email and to the RGMC IT Bot on Teams.",
    ],
    visual: {
      kind: "image",
      src: "/projects/rgmc-gateway.jpg",
      alt: "RGMC Gateway portal showing the NAV site launcher, access panel and API health status",
      width: 1600,
      height: 1000,
      secondary: {
        src: "/projects/rgmc-gateway-helpdesk.jpg",
        alt: "RGMC IT Online Helpdesk ticket form with auto-computed priority",
        width: 1280,
        height: 800,
      },
    },
    outcomes: ["System launcher with health checks", "Helpdesk with computed priority", "Issue lifecycle and admin analytics", "Webhook fan-out to Teams bot"],
  },
  {
    id: "rgmc-consignment",
    title: "RGMC Consignment Web App",
    kicker: "Mobile-first scanning app for field sales",
    repo: {
      name: "rgmc-consignment-webapp",
      owner: "rgmc-apps",
      visibility: "public",
      category: "Web & mobile",
      blurb: "A web application for the RGMC consignment process.",
      stack: ["Ionic Vue 8", "Vue 3", "TypeScript", "Pinia", "Axios", "Vite", "Capacitor", "nginx", "Cloud Run"],
      commits: 228,
      role: "Primary author",
    },
    description: [
      "Field sales representatives select a customer, scan or search items from the Business Central catalogue, set quantities and discounts, and submit structured sales orders and sales return orders straight to the ERP.",
      "Built offline-first: the full item catalogue is held in memory because it exceeds the browser storage cap, drafts persist locally, and submission resumes when the rep is back online. Ships as a PWA and as a Capacitor mobile build.",
    ],
    visual: {
      kind: "image",
      src: "/projects/rgmc-consignment.jpg",
      alt: "RGMC Consignment home screen on a tablet with pending drafts and a start session button",
      width: 1280,
      height: 800,
      secondary: {
        src: "/projects/rgmc-consignment-mobile.jpg",
        alt: "RGMC Consignment splash screen loading company data on a phone",
        width: 780,
        height: 1688,
      },
    },
    outcomes: ["Offline-first scan flow", "Sales and return orders to Business Central", "Draft persistence and session lifecycle", "PWA and Capacitor builds"],
  },
  {
    id: "rgmc-bc-api",
    title: "RGMC BC API and GCP API",
    kicker: "Integration layer over Business Central and Google Cloud",
    repo: {
      name: "rgmc-bc-api",
      owner: "rgmc-apps",
      visibility: "public",
      category: "Backend & integration",
      blurb: "FastAPI gateway wrapping Business Central's OData v4 API and RGMC's custom AL pages.",
      stack: ["Python 3.12", "FastAPI", "Pydantic v2", "OAuth2 client credentials", "OData v4", "SQLAlchemy", "pyodbc", "BigQuery", "Gunicorn", "Docker", "Cloud Run"],
      commits: 270,
      role: "Primary author (two repos)",
    },
    description: [
      "Two FastAPI services that let mobile apps and portals read and write ERP data without touching Azure AD or raw OData. A server-side token cache refreshes 60 seconds before expiry, pagination follows every nextLink transparently, and item prices are cached per company and product.",
      "The GCP API extends the same pattern to three backends: Business Central, the Trade Portal on MSSQL, and a BigQuery Document AI pipeline for customer purchase orders and remittance advice.",
    ],
    visual: {
      kind: "sketch",
      title: "Request path",
      nodes: [
        { label: "Mobile and web apps", sub: "Consignment, Trade Portal, portals" },
        { label: "FastAPI gateway", sub: "token cache, pagination, price cache" },
        { label: "Business Central", sub: "api/v2.0 + rgmccustom/v1.0" },
        { label: "MSSQL and BigQuery", sub: "Trade Portal, SBIC Document AI" },
      ],
      notes: ["OAuth2 client credentials, cached in-process", "Two-step order creation: header, then lines", "Error notification system on failed calls", "Swagger UI at /swagger, timing header on every response"],
    },
    outcomes: ["Unified REST surface over the ERP", "Zero client-side OAuth", "Full-dataset pagination", "Cloud Run deployment"],
  },
  {
    id: "rmgc-portal",
    title: "RGMC Portal: Travel and Expense",
    kicker: "Cash advances and expense vouchers with multi-level approval",
    repo: {
      name: "RMGCPortal",
      owner: "rgmc-apps",
      visibility: "private",
      category: "Web & mobile",
      blurb: "Enterprise portal for submitting, tracking and approving cash advances and expense report vouchers.",
      stack: ["ASP.NET Core 6", "C#", "Entity Framework Core", "MS SQL Server", "JWT", "Angular 14", "Angular Material", "Bootstrap 5", "RxJS", "PWA"],
      commits: 434,
      role: "Primary author",
    },
    description: [
      "Handles the complete lifecycle of employee travel and expense: cash advance request, multi-level approval, document attachment, finance release, and final liquidation through expense report vouchers.",
      "Recent work added two-way Excel import and export on the line-item tab, PDF exports, batch operations, real-time monitoring reports and PWA draft persistence so forms survive a lost connection.",
    ],
    visual: {
      kind: "sketch",
      title: "Cash advance lifecycle",
      nodes: [
        { label: "Request", sub: "employee, itemised lines" },
        { label: "Approvals", sub: "multi-level, role based" },
        { label: "Finance release", sub: "with attachments" },
        { label: "Liquidation", sub: "expense voucher, receipts" },
      ],
      notes: ["Angular 14 front-end on an ASP.NET Core 6 API", "Entity Framework Core over SQL Server", "Excel and PDF exports, batch operations", "Private repository: 434 commits"],
    },
    outcomes: ["End-to-end approval workflow", "Excel and PDF exports", "Real-time monitoring", "Offline draft persistence"],
  },
  {
    id: "bc-extensions",
    title: "Business Central AL Extensions",
    kicker: "Warehouse scanning, print reports and API pages for LS Central",
    repo: {
      name: "RGMC_AL_v2",
      owner: "rgmc-apps",
      visibility: "public",
      category: "ERP (Business Central)",
      blurb: "AL customisation for RGMC on Dynamics 365 Business Central 27 and LS Central.",
      stack: ["AL", "Dynamics 365 Business Central 27", "LS Central", "RDLC reports", "OData v4 API pages", "Code39 barcodes", "VS Code AL tooling"],
      commits: 43,
      role: "Co-author (RGMC_AL_v2) and primary author (RGMC_ERAR)",
    },
    description: [
      "Real-time barcode scanner pages for warehouse picks, transfer order shipping and receiving, and warehouse receipts, with excess-scan guards and a PIN gate before a pick is registered.",
      "Custom RDLC delivery receipts and pull-out slips with barcode encoding, plus OData API pages for retail customers, contacts and sales return orders. A second extension adds inventory cutoff period management and exposes it through OData for external inventory systems.",
    ],
    visual: {
      kind: "sketch",
      title: "Extension surface",
      nodes: [
        { label: "Scanner pages", sub: "picks, transfers, receipts" },
        { label: "PIN gate", sub: "device and owner tracked" },
        { label: "RDLC reports", sub: "DR, pull-out slip, Code39" },
        { label: "OData API pages", sub: "customers, contacts, returns, cutoffs" },
      ],
      notes: ["Business Central 27 platform, LS Central retail layer", "Philippine tax and accounting modules as dependencies", "Cutoff period generator with auto-activation", "Consumed by the FastAPI integration layer"],
    },
    outcomes: ["Live scan-to-quantity updates", "Printable delivery documents", "External API exposure", "Inventory cutoff automation"],
  },
];

/* ---------- RGMC Group: every other contribution ---------- */

export const rgmcRepos: Repo[] = [
  {
    name: "rgmc-gcp-api",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Backend & integration",
    blurb: "Unified FastAPI backend bridging Business Central, the Trade Portal on MSSQL and SBIC BigQuery, deployed on Cloud Run.",
    stack: ["FastAPI", "SQLAlchemy", "pyodbc", "BigQuery", "Cloud Logging", "Cloud Storage", "pandas", "Docker"],
    commits: 100,
    role: "Primary author",
  },
  {
    name: "TradePortalAPI_V2",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Backend & integration",
    blurb: "Python API for the RGMC Trade Portal pull-out app: brands, SKUs, packing lists and pull-outs.",
    stack: ["Python", "FastAPI", "MSSQL", "Docker"],
    commits: 24,
    role: "Primary author",
  },
  {
    name: "RGMCTradePortalAPI",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Backend & integration",
    blurb: "ASP.NET Core Web API built specifically for the RGMC Trade Portal module.",
    stack: ["C#", "ASP.NET Core", "MS SQL Server"],
    commits: 14,
    role: "Contributor",
  },
  {
    name: "RGMCInventoryAPI",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Backend & integration",
    blurb: "API for the RGMC Inventory and RGMC Creatives sites; migrated its connection to Cloud SQL.",
    stack: ["C#", "ASP.NET Core", "Cloud SQL"],
    commits: 4,
    role: "Contributor",
  },
  {
    name: "rgmc-it-bot",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Automation & AI",
    blurb: "Microsoft Teams bot that pushes Adaptive Card ticket notifications from the Gateway helpdesk and answers ticket status lookups.",
    stack: ["TypeScript", "Node 20", "Bot Framework v4", "Express", "Supabase", "Docker"],
    commits: 31,
    role: "Primary author",
  },
  {
    name: "sbic-invoice-splitter",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Automation & AI",
    blurb: "Drops a multi-page invoice PDF, splits it per page, reads each SI number with a three-engine OCR chain and returns named PDFs in a ZIP.",
    stack: ["Python", "Flask 3", "PyMuPDF", "RapidOCR", "EasyOCR", "Tesseract", "Cloud Storage", "Cloud Tasks", "Cloud Run"],
    commits: 52,
    role: "Primary author",
  },
  {
    name: "rgmc-attribute-checker-ai",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Automation & AI",
    blurb: "Flask web service that analyses clothing product images with GPT-4.1 Vision and generates structured attributes for e-commerce listings.",
    stack: ["Python 3.12", "Flask 3", "OpenAI GPT-4.1 Vision", "XlsxWriter", "Pillow", "Gunicorn", "Cloud Run"],
    commits: 8,
    role: "Primary author",
  },
  {
    name: "sbic-manual-trigger",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Automation & AI",
    blurb: "Small Flask service that lets SBIC staff trigger backend requests manually, built for Cloud Build.",
    stack: ["Python", "Flask 3", "Gunicorn", "Cloud Build"],
    commits: 2,
    role: "Primary author",
  },
  {
    name: "RGMCCreative",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Web & mobile",
    blurb: "RGMC Creative portal: an Angular client on an ASP.NET Core host, moved to a dedicated API subdomain.",
    stack: ["C#", "ASP.NET Core", "Angular 12", "MS SQL Server"],
    commits: 56,
    role: "Primary author",
  },
  {
    name: "RGMCProduction",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Web & mobile",
    blurb: "Production monitoring app for the garment group: purchase order tracking, fabric procurement, approvals and SignalR team chat.",
    stack: ["Angular 14", "ASP.NET Core 6", "SignalR", "Entity Framework Core", "Cloud SQL"],
    commits: 6,
    role: "Contributor: UI redesign and Cloud SQL migration",
  },
  {
    name: "RGMCInventory",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Web & mobile",
    blurb: "First generation of the RGMC inventory system with a .NET web client and an Android companion.",
    stack: ["C#", ".NET", "Android"],
    commits: 14,
    role: "Contributor: versioned releases",
  },
  {
    name: "RGMCInventoryMobile",
    owner: "rgmc-apps",
    visibility: "public",
    category: "Web & mobile",
    blurb: "Offline-capable Android app for store audits: pulls NAV quantities, scans EAN-13 barcodes with live variance, collects signatures and pushes results back.",
    stack: ["Kotlin", "Room", "Retrofit", "ML Kit Barcode", "CameraX", "Coroutines"],
    commits: 5,
    role: "Primary author",
  },
  {
    name: "RGMC_ERAR",
    owner: "rgmc-apps",
    visibility: "public",
    category: "ERP (Business Central)",
    blurb: "AL extension that adds inventory cutoff period management and exposes cutoffs and item ledger entries over OData v4.",
    stack: ["AL", "Business Central 27", "LS Central", "OData v4"],
    commits: 26,
    role: "Primary author",
  },
  {
    name: "RGMC_AL",
    owner: "rgmc-apps",
    visibility: "private",
    category: "ERP (Business Central)",
    blurb: "Earlier AL project for RGMC page and table extensions.",
    stack: ["AL", "Business Central"],
    commits: 8,
    role: "Primary author",
  },
  {
    name: "sbic-prod-db",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Data",
    blurb: "Database scripts for the SBIC production database: tables, triggers and indexes.",
    stack: ["SQL Server", "T-SQL"],
    commits: 5,
    role: "Primary author",
  },
  {
    name: "trade_portal_db, accounting_prod_db, creative_prod_db, travel_and_expense_db",
    owner: "rgmc-apps",
    visibility: "private",
    category: "Data",
    blurb: "Schema repositories for the Trade Portal, accounting, creatives and travel and expense SQL Server databases.",
    stack: ["SQL Server"],
    role: "Author",
  },
];

/* ---------- Personal products ---------- */

export type PersonalProject = {
  id: string;
  title: string;
  kicker: string;
  repos: Repo[];
  description: string[];
  visual: Visual;
  highlights: string[];
};

export const personalProjects: PersonalProject[] = [
  {
    id: "seven-lions",
    title: "Seven Lions Studio",
    kicker: "Booking and admin platform for a rehearsal and recording studio",
    repos: [
      {
        name: "seven-lions",
        owner: "erar404",
        visibility: "public",
        category: "Web & mobile",
        blurb: "A website made for Seven Lions Recording Studio in Tandang Sora, Quezon City.",
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "NextAuth v5", "FullCalendar", "React Hook Form", "Nodemailer", "Google Calendar API", "Playwright"],
      },
    ],
    description: [
      "Clients browse services, book rehearsal slots on a calendar with live conflict detection, request recording, lessons, repairs or video shoots, and track their history. Admins approve bookings, manage pricing, moderate reviews, sync to Google Calendar and edit every piece of public content from one dashboard.",
      "Bookings follow a deliberate approval flow (submit, approve, pay, confirm) and a loyalty programme runs automatically on completed sessions.",
    ],
    visual: {
      kind: "image",
      src: "/projects/seven-lions.jpg",
      alt: "Seven Lions Studio home page with the studio facade behind the headline",
      width: 1280,
      height: 900,
      secondary: { src: "/projects/seven-lions-services.jpg", alt: "Seven Lions services page listing studio rental pricing", width: 1280, height: 900 },
    },
    highlights: ["4-step booking wizard", "Admin-managed content", "Google Calendar sync", "Loyalty programme"],
  },
  {
    id: "spoiled-brats",
    title: "Spoiled Brats HQ",
    kicker: "One app for a cafe and a music studio under the same roof",
    repos: [
      {
        name: "spoiled-brats-hq",
        owner: "erar404",
        visibility: "public",
        category: "Web & mobile",
        blurb: "A website dedicated to Spoiled Brats cafe and Kajon Music studio.",
        stack: ["Ionic React", "React 18", "TypeScript", "Vite 5", "Supabase", "FullCalendar", "React Router", "Docker", "nginx", "Cloud Run"],
      },
    ],
    description: [
      "A split-photo home page introduces both venues, each with its own overview, gallery, promos, reviews and booking flow. Cafe and studio bookings run on FullCalendar against Supabase with auth, storage and realtime.",
      "Hero photos, promos and amenities are editable from an admin panel, so the owners update the site without a deploy. Shipped as a multi-stage Docker image served by nginx on Cloud Run.",
    ],
    visual: {
      kind: "image",
      src: "/projects/spoiled-brats.jpg",
      alt: "Interior of Spoiled Brats cafe with pendant lamps and tall windows, the hero photo used on the site",
      width: 1200,
      height: 1500,
      secondary: { src: "/projects/spoiled-brats-studio.jpg", alt: "Kajon Music studio room used on the studio page", width: 720, height: 960 },
    },
    highlights: ["Two venues, one codebase", "Cafe and studio bookings", "Admin-editable photos and promos", "Containerised deploy"],
  },
  {
    id: "bandapa",
    title: "Bandapa",
    kicker: "A shared calendar that resolves scheduling conflicts for bands",
    repos: [
      {
        name: "bandapa",
        owner: "erar404",
        visibility: "public",
        category: "Web & mobile",
        blurb: "Kotlin Multiplatform app (Android and iOS) that gives bands a shared calendar with conflict detection.",
        stack: ["Kotlin 2.1", "Compose Multiplatform", "Supabase (postgrest, auth, realtime, storage)", "Ktor", "Koin", "Coil 3", "Google Places API"],
      },
      {
        name: "bandapa-web",
        owner: "rgmc-apps",
        visibility: "public",
        category: "Web & mobile",
        blurb: "Web companion: admin portal, APK distribution, email and Google auth, realtime announcements.",
        stack: ["Next.js 15", "TypeScript 5", "Tailwind CSS v4", "Supabase", "Google Maps JavaScript API", "Docker", "Cloud Run"],
        commits: 43,
      },
    ],
    description: [
      "Members create personal and band events, get warned when schedules overlap, and vote to cancel or keep a conflicting event. The vote resolves automatically through database triggers. Venues come from Google Places autocomplete and are stored with coordinates for reuse.",
      "The web companion handles what the app cannot: account verification, APK distribution, an admin portal for bands, artists, venues and albums, and announcements that appear in the app in real time.",
    ],
    visual: {
      kind: "image",
      src: "/projects/bandapa-web.jpg",
      alt: "Bandapa bands screen mockup on a phone showing band list and recent activity",
      width: 1600,
      height: 1000,
      secondary: { src: "/projects/bandapa-app.jpg", alt: "Bandapa join-a-band screen with a six character invite code", width: 1600, height: 1000 },
    },
    highlights: ["Conflict detection in the database", "Invite-code joining", "Realtime announcements", "Android, iOS and web"],
  },
];

export const myHrTeams = [
  {
    team: "Payroll Team",
    size: "Team of 3",
    role: "Software Engineer",
    work: "Improvements and fixes to timekeeping and payroll processing based on business rules set by different enterprise clients.",
    stack: ["FoxPro", "MS SQL", "Python", "MySQL"],
  },
  {
    team: "Middleware Team",
    size: "Team of 2",
    role: "Software Engineer",
    work: "Python Celery workers for new-hire, separation and person-detail upload processes, plus microservices posting HR analytics data.",
    stack: ["Python", "Celery", "MS SQL", "MongoDB"],
  },
  {
    team: "Web Team",
    size: "Team of 4",
    role: "Software Engineer",
    work: "New front-end modules built to specification on the classic Angular stack.",
    stack: ["Angular (classic)", "JavaScript", "CSS", "HTML5"],
  },
];

export const myHrModules = ["Core HR", "Timekeeping", "Payroll", "Leave Ledger", "Compressed Work Week", "Auto-IDs", "HR Analytics", "Employee Movements"];
