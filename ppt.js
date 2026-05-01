const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon helper
async function iconToBase64Png(iconName, color = "#FFFFFF", size = 256) {
  const icons = require("react-icons/fa");
  const IconComponent = icons[iconName];
  if (!IconComponent) return null;
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ─── Color palette ─────────────────────────────────────────
const C = {
  DARK:       "0A1628",
  MID:        "112240",
  CARD:       "162A45",
  TEAL:       "00BFA5",
  TEAL_DIM:   "008A77",
  WHITE:      "FFFFFF",
  OFFWHITE:   "F0F4F8",
  NAVY_TEXT:  "0A1628",
  GRAY:       "64748B",
  LIGHT_GRAY: "CBD5E1",
};

// ─── Typography ─────────────────────────────────────────────
const F = {
  HEAD: "Trebuchet MS",
  BODY: "Calibri",
};

// ─── Helpers ────────────────────────────────────────────────
function darkSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.DARK };
  return s;
}

function lightSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  return s;
}

// Left-accent title bar for light slides
function lightTitle(slide, text, sub) {
  slide.addShape("rect", {
    x: 0.4, y: 0.28, w: 0.07, h: 0.65,
    fill: { color: C.TEAL }, line: { color: C.TEAL }
  });
  slide.addText(text, {
    x: 0.6, y: 0.22, w: 8.5, h: 0.55,
    fontFace: F.HEAD, fontSize: 26, bold: true, color: C.NAVY_TEXT,
    valign: "middle", margin: 0
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.6, y: 0.78, w: 8.5, h: 0.3,
      fontFace: F.BODY, fontSize: 12, color: C.GRAY, margin: 0
    });
  }
}

// Teal heading for dark slides
function darkTitle(slide, text, sub) {
  slide.addText(text, {
    x: 0.5, y: 0.2, w: 9, h: 0.55,
    fontFace: F.HEAD, fontSize: 26, bold: true, color: C.TEAL,
    margin: 0
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.5, y: 0.72, w: 9, h: 0.28,
      fontFace: F.BODY, fontSize: 12, color: C.LIGHT_GRAY, margin: 0
    });
  }
}

// Card on dark slide
function darkCard(slide, x, y, w, h, title, body, iconData) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: C.CARD },
    line: { color: C.TEAL, width: 0.8 },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.3 }
  });
  if (iconData) {
    slide.addImage({ data: iconData, x: x + 0.15, y: y + 0.12, w: 0.32, h: 0.32 });
  }
  const tx = iconData ? x + 0.55 : x + 0.18;
  slide.addText(title, {
    x: tx, y: y + 0.08, w: w - (iconData ? 0.65 : 0.25), h: 0.35,
    fontFace: F.HEAD, fontSize: 13, bold: true, color: C.TEAL,
    margin: 0, valign: "middle"
  });
  if (body) {
    slide.addText(body, {
      x: x + 0.15, y: y + 0.42, w: w - 0.3, h: h - 0.5,
      fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY,
      margin: 0, valign: "top"
    });
  }
}

// Card on light slide
function lightCard(slide, x, y, w, h, title, body) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: C.WHITE },
    line: { color: C.LIGHT_GRAY, width: 0.5 },
    shadow: { type: "outer", color: "000000", blur: 5, offset: 1, angle: 135, opacity: 0.08 }
  });
  slide.addShape("rect", {
    x, y, w: 0.06, h,
    fill: { color: C.TEAL }, line: { color: C.TEAL }
  });
  slide.addText(title, {
    x: x + 0.16, y: y + 0.1, w: w - 0.24, h: 0.32,
    fontFace: F.HEAD, fontSize: 12, bold: true, color: C.NAVY_TEXT, margin: 0
  });
  if (body) {
    slide.addText(body, {
      x: x + 0.16, y: y + 0.42, w: w - 0.24, h: h - 0.52,
      fontFace: F.BODY, fontSize: 10.5, color: C.GRAY, margin: 0, valign: "top"
    });
  }
}

// ─── MAIN ────────────────────────────────────────────────────
async function buildPresentation() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Homeaze — End-Term Presentation";
  pres.author = "Prateek Yadav & Nilesh Sharma";

  // Pre-load icons
  const iUser   = await iconToBase64Png("FaUser",        "#00BFA5");
  const iWorker = await iconToBase64Png("FaTools",       "#00BFA5");
  const iAdmin  = await iconToBase64Png("FaUserShield",  "#00BFA5");
  const iLock   = await iconToBase64Png("FaLock",        "#00BFA5");
  const iDB     = await iconToBase64Png("FaDatabase",    "#00BFA5");
  const iCloud  = await iconToBase64Png("FaCloud",       "#00BFA5");
  const iPay    = await iconToBase64Png("FaCreditCard",  "#00BFA5");
  const iAI     = await iconToBase64Png("FaBrain",       "#00BFA5");
  const iDocker = await iconToBase64Png("FaDocker",      "#00BFA5");
  const iCheck  = await iconToBase64Png("FaCheckCircle", "#00BFA5");
  const iCode   = await iconToBase64Png("FaCode",        "#00BFA5");
  const iMobile = await iconToBase64Png("FaMobile",      "#00BFA5");
  const iCalendar = await iconToBase64Png("FaCalendarAlt","#00BFA5");
  const iStar   = await iconToBase64Png("FaStar",        "#00BFA5");
  const iRocket = await iconToBase64Png("FaRocket",      "#00BFA5");
  const iGoogle = await iconToBase64Png("FaGoogle",      "#FFFFFF");
  const iServer = await iconToBase64Png("FaServer",      "#00BFA5");

  // ══════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);

    // Left accent panel
    s.addShape("rect", {
      x: 0, y: 0, w: 3.8, h: 5.625,
      fill: { color: C.MID }, line: { color: C.MID }
    });
    s.addShape("rect", {
      x: 3.8, y: 0, w: 0.06, h: 5.625,
      fill: { color: C.TEAL }, line: { color: C.TEAL }
    });

    // Logo placeholder circle
    s.addShape("oval", {
      x: 1.2, y: 0.5, w: 1.4, h: 1.4,
      fill: { color: C.TEAL }, line: { color: C.TEAL }
    });
    s.addText("H", {
      x: 1.2, y: 0.5, w: 1.4, h: 1.4,
      fontFace: F.HEAD, fontSize: 42, bold: true, color: C.DARK,
      align: "center", valign: "middle"
    });

    // Brand name
    s.addText("HOMEAZE", {
      x: 0.2, y: 2.1, w: 3.4, h: 0.55,
      fontFace: F.HEAD, fontSize: 30, bold: true, color: C.TEAL,
      align: "center", charSpacing: 4
    });
    s.addText("Household Services Platform", {
      x: 0.2, y: 2.65, w: 3.4, h: 0.3,
      fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY, align: "center"
    });

    // Divider
    s.addShape("line", {
      x: 0.4, y: 3.1, w: 3.0, h: 0,
      line: { color: C.TEAL_DIM, width: 0.5 }
    });

    s.addText("Prepared By", {
      x: 0.2, y: 3.25, w: 3.4, h: 0.25,
      fontFace: F.BODY, fontSize: 10, color: C.GRAY, align: "center"
    });
    s.addText("Prateek Yadav  (2023BTech059)\nNilesh Sharma  (2023BTech052)", {
      x: 0.2, y: 3.5, w: 3.4, h: 0.55,
      fontFace: F.BODY, fontSize: 11, bold: true, color: C.WHITE, align: "center"
    });
    s.addText("Faculty Guide: Dr. Deepika Prakash", {
      x: 0.2, y: 4.15, w: 3.4, h: 0.25,
      fontFace: F.BODY, fontSize: 10, color: C.LIGHT_GRAY, align: "center"
    });
    s.addText("IET, JK Lakshmipat University  •  April 2026", {
      x: 0.2, y: 5.2, w: 3.4, h: 0.25,
      fontFace: F.BODY, fontSize: 9.5, color: C.GRAY, align: "center"
    });

    // Right panel content
    s.addText("Minor Project", {
      x: 4.1, y: 0.5, w: 5.5, h: 0.35,
      fontFace: F.BODY, fontSize: 13, color: C.TEAL, bold: true
    });
    s.addText("End-Term Presentation", {
      x: 4.1, y: 0.82, w: 5.5, h: 0.65,
      fontFace: F.HEAD, fontSize: 32, bold: true, color: C.WHITE
    });
    s.addText("A web application that delivers household\nservices using a centralized workload system.", {
      x: 4.1, y: 1.55, w: 5.5, h: 0.7,
      fontFace: F.BODY, fontSize: 13.5, color: C.LIGHT_GRAY
    });

    // Feature tags
    const tags = ["MERN Stack", "Google OAuth 2.0", "Razorpay Payments", "AI Bio Generator", "Docker Deployed"];
    tags.forEach((tag, i) => {
      const col = i % 2 === 0 ? 4.1 : 6.9;
      const row = 2.55 + Math.floor(i / 2) * 0.45;
      s.addShape("rect", {
        x: col, y: row, w: 2.5, h: 0.34,
        fill: { color: C.CARD }, line: { color: C.TEAL, width: 0.6 }
      });
      s.addText(tag, {
        x: col + 0.1, y: row, w: 2.3, h: 0.34,
        fontFace: F.BODY, fontSize: 11, color: C.WHITE, valign: "middle"
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 2 — Agenda
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Agenda", "What we'll cover today");

    const items = [
      ["01", "Project Overview & Problem"],
      ["02", "System Architecture & Tech Stack"],
      ["03", "Authentication & Data Models"],
      ["04", "Booking Engine & Payment"],
      ["05", "AI Integration & DevOps"],
      ["06", "Application UI Demo"],
      ["07", "Results, Future Work & Conclusion"],
    ];

    items.forEach(([num, label], i) => {
      const col = i < 4 ? 0.5 : 5.3;
      const row = 1.15 + (i < 4 ? i : i - 4) * 0.88;
      s.addShape("rect", {
        x: col, y: row, w: 4.4, h: 0.72,
        fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.5 }
      });
      s.addText(num, {
        x: col + 0.1, y: row, w: 0.55, h: 0.72,
        fontFace: F.HEAD, fontSize: 18, bold: true, color: C.TEAL,
        align: "center", valign: "middle"
      });
      s.addShape("rect", {
        x: col + 0.65, y: row + 0.18, w: 0.03, h: 0.36,
        fill: { color: C.TEAL }, line: { color: C.TEAL }
      });
      s.addText(label, {
        x: col + 0.78, y: row, w: 3.5, h: 0.72,
        fontFace: F.BODY, fontSize: 13, color: C.WHITE, valign: "middle"
      });
    });

    // Last item in last column alone
    const lastRow = 1.15 + 3 * 0.88;
    s.addShape("rect", {
      x: 5.3, y: lastRow, w: 4.4, h: 0.72,
      fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.5 }
    });
    // Override last with conclusion
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 3 — Project Overview
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Project Overview", "What is Homeaze?");

    s.addText("Homeaze is a full-stack web application that connects homeowners with verified local service workers. Built on the MERN stack, it features three independent applications: User Frontend, Admin & Worker Panel, and a RESTful Backend API.", {
      x: 0.5, y: 1.2, w: 9.0, h: 0.65,
      fontFace: F.BODY, fontSize: 12.5, color: C.GRAY
    });

    const features = [
      [iUser,   "User App",     "Browse workers, book slots, pay online, manage bookings"],
      [iWorker, "Worker Panel", "Manage availability, view earnings, mark jobs complete"],
      [iAdmin,  "Admin Panel",  "Onboard workers, monitor bookings, oversee platform"],
      [iLock,   "Auth System",  "JWT + Google OAuth 2.0 for all three roles"],
      [iPay,    "Payments",     "Razorpay with HMAC-SHA256 server-side verification"],
      [iAI,     "AI Features",  "Groq LLaMA-3.3-70B auto-generates worker bios"],
    ];

    features.forEach(([icon, title, body], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.4 + col * 3.1;
      const y = 2.05 + row * 1.5;
      lightCard(s, x, y, 2.95, 1.35, title, body);
      if (icon) s.addImage({ data: icon, x: x + 2.5, y: y + 0.08, w: 0.3, h: 0.3 });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 4 — Problem Statement
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Problem Statement", "What pain points does Homeaze solve?");

    const problems = [
      ["No Centralized Directory", "Users cannot easily discover or compare workers across categories like plumber, electrician, or cleaner."],
      ["No Transparent Scheduling", "Booking is done over phone calls with no visibility into a worker's real availability."],
      ["Trust Deficit", "No verification, profile standardization, or accountability mechanism for service providers."],
      ["Payment Insecurity", "Cash-only transactions provide no proof of payment or dispute resolution path."],
    ];

    problems.forEach(([title, body], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      darkCard(s, 0.4 + col * 4.65, 1.15 + row * 1.9, 4.4, 1.72, title, body);
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 5 — System Architecture
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "System Architecture", "Three-tier client-server model");

    // Tier boxes
    const tiers = [
      { label: "PRESENTATION", tech: "React 19 + Vite\nTailwindCSS", role: "User & Admin/Worker UIs", x: 0.4 },
      { label: "APPLICATION",  tech: "Node.js + Express 5\nMVC Pattern",  role: "REST API, Auth, Business Logic", x: 3.55 },
      { label: "DATA",         tech: "MongoDB Atlas\nCloudinary CDN", role: "Persistence & Media Storage", x: 6.7 },
    ];

    tiers.forEach(({ label, tech, role, x }) => {
      s.addShape("rect", {
        x, y: 1.15, w: 2.85, h: 3.5,
        fill: { color: C.OFFWHITE }, line: { color: C.LIGHT_GRAY, width: 0.6 }
      });
      s.addShape("rect", {
        x, y: 1.15, w: 2.85, h: 0.5,
        fill: { color: C.NAVY_TEXT }, line: { color: C.NAVY_TEXT }
      });
      s.addText(label, {
        x: x + 0.05, y: 1.15, w: 2.75, h: 0.5,
        fontFace: F.HEAD, fontSize: 11, bold: true, color: C.TEAL,
        align: "center", valign: "middle"
      });
      s.addText(tech, {
        x: x + 0.1, y: 1.8, w: 2.65, h: 0.8,
        fontFace: F.BODY, fontSize: 12, bold: true, color: C.NAVY_TEXT, align: "center"
      });
      s.addText(role, {
        x: x + 0.1, y: 2.7, w: 2.65, h: 0.6,
        fontFace: F.BODY, fontSize: 10.5, color: C.GRAY, align: "center"
      });
    });

    // Arrows between tiers
    ["→", "→"].forEach((arrow, i) => {
      s.addText(arrow, {
        x: 3.35 + i * 3.15, y: 2.5, w: 0.35, h: 0.5,
        fontFace: F.HEAD, fontSize: 22, color: C.TEAL, align: "center"
      });
    });

    // Third-party services row
    s.addText("External Integrations", {
      x: 0.4, y: 4.82, w: 9.2, h: 0.3,
      fontFace: F.BODY, fontSize: 10, bold: true, color: C.GRAY
    });
    const services = ["Razorpay\n(Payments)", "Cloudinary\n(Images)", "Groq AI\n(LLaMA-3.3)", "Google OAuth\n(Auth)"];
    services.forEach((svc, i) => {
      s.addShape("rect", {
        x: 0.4 + i * 2.4, y: 5.1, w: 2.15, h: 0.4,
        fill: { color: C.TEAL }, line: { color: C.TEAL }
      });
      s.addText(svc, {
        x: 0.4 + i * 2.4 + 0.05, y: 5.1, w: 2.05, h: 0.4,
        fontFace: F.BODY, fontSize: 9.5, color: C.DARK, align: "center", valign: "middle", bold: true
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 6 — Tech Stack
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Technology Stack", "Full-stack MERN architecture");

    const layers = [
      ["Frontend (User)", "React 19, Vite 7, React Router 7, TailwindCSS 3, Axios, @react-oauth/google"],
      ["Admin/Worker Panel", "React 19, Vite 7, React Router 7, TailwindCSS 3/4, Axios, React Toastify"],
      ["Backend API", "Node.js, Express 5, Mongoose 9, JWT, bcrypt, Multer, Validator"],
      ["Database & Storage", "MongoDB Atlas (NoSQL) + Cloudinary (Image CDN)"],
      ["Payments & Auth", "Razorpay SDK with HMAC-SHA256 + Google OAuth 2.0"],
      ["AI & DevOps", "Groq SDK (LLaMA-3.3-70B), Docker Compose, Nginx proxy"],
    ];

    layers.forEach(([label, tech], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 4.85;
      const y = 1.1 + row * 1.35;
      s.addShape("rect", { x, y, w: 4.55, h: 1.2, fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.6 } });
      s.addShape("rect", { x, y, w: 4.55, h: 0.38, fill: { color: C.MID }, line: { color: C.MID } });
      s.addText(label, {
        x: x + 0.12, y: y + 0.02, w: 4.3, h: 0.35,
        fontFace: F.HEAD, fontSize: 12.5, bold: true, color: C.TEAL, valign: "middle", margin: 0
      });
      s.addText(tech, {
        x: x + 0.12, y: y + 0.43, w: 4.3, h: 0.7,
        fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY, valign: "top", margin: 0
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 7 — Data Models
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Data Models", "Three core MongoDB collections");

    const models = [
      {
        name: "User",
        fields: ["name", "email", "password (bcrypt)", "image (Cloudinary)", "phone", "address", "gender", "dob", "googleId", "authProvider"],
      },
      {
        name: "Worker",
        fields: ["name", "email", "password (bcrypt)", "image (Cloudinary)", "speciality", "degree", "experience", "about (AI-generated)", "available", "fees", "slots_booked (map)", "address"],
      },
      {
        name: "Booking",
        fields: ["userId", "docId (workerId)", "slotDate", "slotTime", "userData", "docData", "amount", "cancelled", "payment", "isCompleted", "razorpayOrderId"],
      },
    ];

    models.forEach(({ name, fields }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape("rect", { x, y: 1.15, w: 2.98, h: 4.25, fill: { color: C.WHITE }, line: { color: C.LIGHT_GRAY, width: 0.5 } });
      s.addShape("rect", { x, y: 1.15, w: 2.98, h: 0.48, fill: { color: C.NAVY_TEXT }, line: { color: C.NAVY_TEXT } });
      s.addText(name, {
        x: x + 0.1, y: 1.15, w: 2.78, h: 0.48,
        fontFace: F.HEAD, fontSize: 14, bold: true, color: C.TEAL,
        align: "center", valign: "middle"
      });
      s.addText(
        fields.map(f => ({ text: f, options: { bullet: true, breakLine: true } })),
        {
          x: x + 0.18, y: 1.72, w: 2.7, h: 3.6,
          fontFace: F.BODY, fontSize: 10.5, color: C.GRAY, valign: "top"
        }
      );
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 8 — Authentication Architecture
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Authentication Architecture", "JWT + Google OAuth 2.0 across three roles");

    const roles = [
      {
        role: "User",
        icon: iUser,
        points: ["Email/password registration OR Google OAuth", "JWT token — 7-day expiry", "Stored in localStorage", "Auto-created on first Google sign-in"],
        color: "00BFA5",
      },
      {
        role: "Worker",
        icon: iWorker,
        points: ["Pre-registered by Admin only", "Login with credentials OR Google OAuth", "JWT token — 1-day expiry", "Must be pre-registered to use OAuth"],
        color: "00BFA5",
      },
      {
        role: "Admin",
        icon: iAdmin,
        points: ["Single super-admin account", "Credentials via environment variables", "JWT derived from ADMIN_EMAIL + ADMIN_PASSWORD", "No self-registration allowed"],
        color: "00BFA5",
      },
    ];

    roles.forEach(({ role, icon, points, color }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape("rect", { x, y: 1.12, w: 2.95, h: 4.22, fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.6 } });
      s.addShape("rect", { x, y: 1.12, w: 2.95, h: 0.65, fill: { color: C.MID }, line: { color: C.MID } });
      if (icon) s.addImage({ data: icon, x: x + 0.15, y: 1.17, w: 0.42, h: 0.42 });
      s.addText(role, {
        x: x + 0.65, y: 1.12, w: 2.2, h: 0.65,
        fontFace: F.HEAD, fontSize: 16, bold: true, color: C.TEAL,
        valign: "middle", margin: 0
      });
      s.addText(
        points.map((p, pi) => ({ text: p, options: { bullet: true, breakLine: pi < points.length - 1 } })),
        {
          x: x + 0.18, y: 1.88, w: 2.65, h: 3.3,
          fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY, valign: "top"
        }
      );
    });

    // HMAC note
    s.addShape("rect", { x: 0.4, y: 5.1, w: 9.2, h: 0.35, fill: { color: C.MID }, line: { color: C.TEAL, width: 0.5 } });
    s.addText("🔐  Razorpay payments verified server-side using HMAC-SHA256 cryptographic signatures to prevent tampering.", {
      x: 0.55, y: 5.1, w: 9.0, h: 0.35,
      fontFace: F.BODY, fontSize: 10.5, color: C.TEAL, valign: "middle"
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 9 — Booking Engine
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Slot-Based Booking Engine", "Real-time scheduling with double-booking prevention");

    // Steps flow
    const steps = [
      ["01", "Browse Workers", "Filter by 7 categories with availability indicators"],
      ["02", "Select Slot", "7-day rolling calendar, 30-min slots 10AM–9PM"],
      ["03", "Book Slot", "Slot locked in slots_booked map keyed by date"],
      ["04", "Pay Online", "Razorpay checkout → server-side verification"],
      ["05", "Track Status", "Paid / Cancelled / Completed badges"],
    ];

    steps.forEach(([num, title, desc], i) => {
      const x = 0.4 + i * 1.9;
      s.addShape("oval", { x: x + 0.5, y: 1.1, w: 0.9, h: 0.9, fill: { color: C.NAVY_TEXT }, line: { color: C.TEAL } });
      s.addText(num, { x: x + 0.5, y: 1.1, w: 0.9, h: 0.9, fontFace: F.HEAD, fontSize: 14, bold: true, color: C.TEAL, align: "center", valign: "middle" });
      s.addText(title, { x, y: 2.15, w: 1.85, h: 0.4, fontFace: F.HEAD, fontSize: 11, bold: true, color: C.NAVY_TEXT, align: "center" });
      s.addText(desc, { x, y: 2.55, w: 1.85, h: 0.6, fontFace: F.BODY, fontSize: 9.5, color: C.GRAY, align: "center" });
      if (i < 4) {
        s.addText("→", { x: x + 1.85, y: 1.35, w: 0.4, h: 0.4, fontFace: F.HEAD, fontSize: 18, color: C.TEAL, align: "center" });
      }
    });

    // Key rules
    s.addText("Engine Rules", {
      x: 0.5, y: 3.35, w: 5, h: 0.35,
      fontFace: F.HEAD, fontSize: 13, bold: true, color: C.NAVY_TEXT
    });
    const rules = [
      "Past time slots for current day are automatically excluded",
      "Already-booked slots are hidden from selection",
      "Cancellation releases the slot back (slots_booked map updated)",
      "30-minute intervals from 10:00 AM to 9:00 PM",
    ];
    s.addText(
      rules.map((r, ri) => ({ text: r, options: { bullet: true, breakLine: ri < rules.length - 1 } })),
      { x: 0.5, y: 3.72, w: 4.5, h: 1.65, fontFace: F.BODY, fontSize: 11.5, color: C.GRAY }
    );

    // Booking model summary
    s.addShape("rect", { x: 5.4, y: 3.25, w: 4.2, h: 2.2, fill: { color: C.OFFWHITE }, line: { color: C.LIGHT_GRAY } });
    s.addShape("rect", { x: 5.4, y: 3.25, w: 4.2, h: 0.38, fill: { color: C.NAVY_TEXT }, line: { color: C.NAVY_TEXT } });
    s.addText("Booking Document", { x: 5.5, y: 3.25, w: 4.0, h: 0.38, fontFace: F.HEAD, fontSize: 11.5, bold: true, color: C.TEAL, valign: "middle", margin: 0 });
    const bFields = ["slotDate / slotTime", "cancelled  •  payment", "isCompleted", "razorpayOrderId"];
    s.addText(
      bFields.map((f, fi) => ({ text: f, options: { bullet: true, breakLine: fi < bFields.length - 1 } })),
      { x: 5.55, y: 3.72, w: 3.9, h: 1.6, fontFace: F.BODY, fontSize: 11, color: C.GRAY }
    );
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 10 — Payment Integration
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Payment Integration — Razorpay", "Secure online transactions with cryptographic verification");

    // Flow steps
    const flow = [
      ["1", "Create Order", "Backend creates Razorpay order & returns order_id"],
      ["2", "Checkout", "Client-side Razorpay modal collects payment details"],
      ["3", "Payment Callback", "Razorpay sends razorpay_order_id + payment_id + signature"],
      ["4", "HMAC Verification", "Backend computes HMAC-SHA256 & compares signatures"],
      ["5", "DB Update", "On match → booking.payment = true, paymentId stored"],
    ];

    flow.forEach(([num, title, desc], i) => {
      const y = 1.12 + i * 0.83;
      s.addShape("oval", { x: 0.4, y: y + 0.07, w: 0.6, h: 0.6, fill: { color: C.TEAL }, line: { color: C.TEAL } });
      s.addText(num, { x: 0.4, y: y + 0.07, w: 0.6, h: 0.6, fontFace: F.HEAD, fontSize: 14, bold: true, color: C.DARK, align: "center", valign: "middle" });
      s.addShape("rect", { x: 1.2, y, w: 8.2, h: 0.72, fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.4 } });
      s.addText(title, { x: 1.35, y: y + 0.04, w: 3, h: 0.33, fontFace: F.HEAD, fontSize: 12.5, bold: true, color: C.TEAL, valign: "middle", margin: 0 });
      s.addText(desc, { x: 1.35, y: y + 0.38, w: 7.9, h: 0.3, fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY, valign: "middle", margin: 0 });
      if (i < 4) {
        s.addShape("line", { x: 0.695, y: y + 0.67, w: 0, h: 0.16, line: { color: C.TEAL_DIM, width: 1 } });
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 11 — AI Integration
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "AI Integration — Groq LLaMA-3.3-70B", "Auto-generate professional worker bios");

    // Left: how it works
    s.addText("How It Works", { x: 0.5, y: 1.15, w: 4.5, h: 0.35, fontFace: F.HEAD, fontSize: 14, bold: true, color: C.NAVY_TEXT });

    const aiSteps = [
      ["Admin Input", "Name, Speciality, Experience, Degree entered in Add Worker form"],
      ["API Call", "POST /api/ai/generate-bio → Backend calls Groq SDK"],
      ["LLM Prompt", "Structured prompt sent to LLaMA-3.3-70B-Versatile model"],
      ["Bio Returned", "2-3 sentence professional bio inserted into form"],
    ];

    aiSteps.forEach(([title, desc], i) => {
      lightCard(s, 0.4, 1.58 + i * 0.92, 4.55, 0.82, title, desc);
    });

    // Right: code snippet style box
    s.addShape("rect", { x: 5.3, y: 1.15, w: 4.3, h: 4.22, fill: { color: "1E293B" }, line: { color: C.TEAL, width: 0.5 } });
    s.addText("Sample Prompt", { x: 5.45, y: 1.2, w: 4.0, h: 0.3, fontFace: F.BODY, fontSize: 10, color: C.TEAL, bold: true });
    s.addText(`const prompt = \`Write a professional
"About" section for a home
service worker profile.
Keep it 2-3 sentences.

Name: \${name}
Speciality: \${speciality}
Experience: \${experience}
Education: \${degree}\`;

model: "llama-3.3-70b-versatile"
temperature: 0.7
max_tokens: 200`, {
      x: 5.4, y: 1.55, w: 4.1, h: 3.6,
      fontFace: "Courier New", fontSize: 9.5, color: "A8B4C8",
      valign: "top", margin: [0, 0, 0, 0]
    });

    // Benefit tag
    s.addShape("rect", { x: 0.4, y: 5.15, w: 4.55, h: 0.32, fill: { color: C.TEAL }, line: { color: C.TEAL } });
    s.addText("✓  Reduces admin onboarding time significantly", {
      x: 0.5, y: 5.15, w: 4.35, h: 0.32, fontFace: F.BODY, fontSize: 11, color: C.DARK, bold: true, valign: "middle"
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 12 — Application UI [PLACEHOLDER]
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Application UI Screenshots", "End-to-end user experience");

    const screens = [
      { label: "Home Page", desc: "Hero banner, category menu, top workers" },
      { label: "Worker Listing", desc: "Filterable by 7 categories, availability" },
      { label: "Booking Page", desc: "7-day calendar, 30-min slot picker" },
      { label: "My Bookings", desc: "Paid / Cancelled / Completed status" },
      { label: "Admin Dashboard", desc: "Stats: workers, bookings, users" },
      { label: "Worker Dashboard", desc: "Earnings, appointments, customers" },
    ];

    screens.forEach(({ label, desc }, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.4 + col * 3.15;
      const y = 1.1 + row * 2.3;
      s.addShape("rect", {
        x, y, w: 2.95, h: 2.1,
        fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.6 }
      });
      // Placeholder image area
      s.addShape("rect", {
        x: x + 0.08, y: y + 0.08, w: 2.79, h: 1.35,
        fill: { color: C.MID }, line: { color: C.TEAL_DIM, width: 0.4 }
      });
      s.addText("[UI Screenshot\nPlaceholder]", {
        x: x + 0.08, y: y + 0.08, w: 2.79, h: 1.35,
        fontFace: F.BODY, fontSize: 11, color: C.TEAL_DIM,
        align: "center", valign: "middle", italic: true
      });
      s.addText(label, {
        x: x + 0.1, y: y + 1.5, w: 2.75, h: 0.28,
        fontFace: F.HEAD, fontSize: 11, bold: true, color: C.WHITE, margin: 0
      });
      s.addText(desc, {
        x: x + 0.1, y: y + 1.78, w: 2.75, h: 0.27,
        fontFace: F.BODY, fontSize: 9.5, color: C.GRAY, margin: 0
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 13 — Work Completed: Backend
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Work Completed — Backend", "APIs, Authentication & Server Logic");

    const items = [
      [iLock,   "Google OAuth 2.0",       "Implemented for all three roles. Users auto-created on first Google sign-in; Workers must be pre-registered."],
      [iPay,    "Razorpay Gateway",        "Full pipeline: order creation → client checkout → HMAC-SHA256 server-side verification → DB update."],
      [iCalendar,"Slot Booking Engine",    "slots_booked map keyed by date. Auto-excludes past times & already-booked slots. Cancellation releases slot."],
      [iDB,     "Appointment Lifecycle",   "Full booking, cancellation (with slot release), payment tracking, and job completion across all three roles."],
      [iAI,     "AI Bio Generation",       "Groq SDK + LLaMA-3.3-70B. Admin clicks \"AI Generate Bio\" → professional 2-3 sentence worker bio created."],
      [iCloud,  "Cloudinary Pipeline",     "Profile images uploaded via Multer middleware, stored on Cloudinary CDN with secure URLs returned."],
    ];

    items.forEach(([icon, title, body], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75;
      const y = 1.12 + row * 1.38;
      lightCard(s, x, y, 4.5, 1.25, title, body);
      if (icon) s.addImage({ data: icon, x: x + 4.05, y: y + 0.05, w: 0.3, h: 0.3 });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 14 — Work Completed: Frontend
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Work Completed — Frontend (User App)", "UI/UX Implementation");

    const pages = [
      ["Home Page",     "Hero banner, speciality category menu, top workers grid, CTA banner"],
      ["Worker Listing","Filterable by 7 categories with availability indicators"],
      ["Booking Page",  "Worker profile, 7-day slot calendar, 30-min time-slot picker"],
      ["My Bookings",   "Status badges (Paid/Cancelled/Completed), cancel & pay actions"],
      ["My Profile",    "Editable profile with Cloudinary image upload"],
      ["Auth Pages",    "Dual-mode login/register with Google OAuth + auto-redirect"],
    ];

    pages.forEach(([title, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75;
      const y = 1.1 + row * 1.38;
      darkCard(s, x, y, 4.5, 1.25, title, desc);
    });

    s.addShape("rect", { x: 0.4, y: 5.15, w: 9.2, h: 0.32, fill: { color: C.MID }, line: { color: C.TEAL_DIM } });
    s.addText("📱  Responsive Design — Mobile-first TailwindCSS layout with hamburger menu navigation", {
      x: 0.55, y: 5.15, w: 9.0, h: 0.32, fontFace: F.BODY, fontSize: 10.5, color: C.TEAL, valign: "middle"
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 15 — Work Completed: Admin & Worker Panel
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Work Completed — Admin & Worker Panel", "Role-based management interfaces");

    // Two columns: Admin | Worker
    s.addText("Admin Features", { x: 0.4, y: 1.12, w: 4.5, h: 0.38, fontFace: F.HEAD, fontSize: 14, bold: true, color: C.NAVY_TEXT });
    s.addText("Worker Features", { x: 5.2, y: 1.12, w: 4.5, h: 0.38, fontFace: F.HEAD, fontSize: 14, bold: true, color: C.NAVY_TEXT });

    const adminItems = [
      ["Dashboard", "Summary cards: total workers, bookings, users + latest bookings"],
      ["Add Worker", "Full form with image upload, speciality, experience, fees & AI bio"],
      ["Workers List", "View all workers with availability toggle"],
      ["All Bookings", "Platform-wide management with cancellation capability"],
    ];

    const workerItems = [
      ["Worker Dashboard", "Earnings summary, appointment count, unique customer count"],
      ["Appointments", "View and manage assigned bookings (complete / cancel)"],
      ["Worker Profile", "Update fees, address, and availability status"],
      ["Role-Based Login", "Shared login page with Admin/Worker toggle + Google OAuth"],
    ];

    adminItems.forEach(([title, desc], i) => {
      lightCard(s, 0.4, 1.58 + i * 0.95, 4.5, 0.85, title, desc);
    });

    workerItems.forEach(([title, desc], i) => {
      lightCard(s, 5.2, 1.58 + i * 0.95, 4.5, 0.85, title, desc);
    });

    // Divider
    s.addShape("line", { x: 4.98, y: 1.1, w: 0, h: 4.3, line: { color: C.LIGHT_GRAY, width: 0.5 } });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 16 — DevOps & Docker
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "DevOps & Deployment", "Docker Compose orchestration for reproducible deployment");

    // Three service boxes
    const services = [
      { name: "Frontend", port: "5173", tech: "Vite → Nginx", desc: "Multi-stage build: Vite compiles → Nginx serves static files" },
      { name: "Admin Panel", port: "5174", tech: "Vite → Nginx", desc: "Separate Nginx instance for Admin/Worker UI" },
      { name: "Backend API", port: "4000", tech: "Node.js + Express", desc: "REST API with all business logic, auth & integrations" },
    ];

    services.forEach(({ name, port, tech, desc }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape("rect", { x, y: 1.1, w: 2.95, h: 2.1, fill: { color: C.CARD }, line: { color: C.TEAL, width: 0.7 } });
      s.addShape("rect", { x, y: 1.1, w: 2.95, h: 0.5, fill: { color: C.MID }, line: { color: C.MID } });
      s.addText(name, { x: x + 0.1, y: 1.1, w: 2.0, h: 0.5, fontFace: F.HEAD, fontSize: 13, bold: true, color: C.TEAL, valign: "middle", margin: 0 });
      s.addText(`Port: ${port}`, { x: x + 2.1, y: 1.1, w: 0.75, h: 0.5, fontFace: F.BODY, fontSize: 9, color: C.GRAY, valign: "middle", align: "right", margin: 0 });
      s.addText(tech, { x: x + 0.12, y: 1.7, w: 2.7, h: 0.3, fontFace: F.BODY, fontSize: 11, bold: true, color: C.WHITE, margin: 0 });
      s.addText(desc, { x: x + 0.12, y: 2.05, w: 2.7, h: 1.0, fontFace: F.BODY, fontSize: 10.5, color: C.LIGHT_GRAY, valign: "top", margin: 0 });
    });

    // Docker compose diagram
    s.addText("docker-compose.yml orchestrates all three services with:", {
      x: 0.5, y: 3.35, w: 9.0, h: 0.3, fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY
    });

    const dcFeatures = [
      ["Environment Injection", ".env files for MongoDB URI, JWT secret, Razorpay keys, API keys"],
      ["Nginx Reverse Proxy", "Production-grade routing and static file serving"],
      ["Multi-Stage Builds", "Separate build and serve stages for optimized images"],
      ["One-Command Deploy", "docker-compose up — all three services start together"],
    ];

    dcFeatures.forEach(([title, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      s.addShape("rect", { x: 0.4 + col * 4.75, y: 3.72 + row * 0.82, w: 4.5, h: 0.72, fill: { color: C.MID }, line: { color: C.TEAL_DIM } });
      s.addText(title + ": ", { x: 0.55 + col * 4.75, y: 3.72 + row * 0.82, w: 1.8, h: 0.72, fontFace: F.BODY, fontSize: 11, bold: true, color: C.TEAL, valign: "middle", margin: 0 });
      s.addText(desc, { x: 2.2 + col * 4.75, y: 3.72 + row * 0.82, w: 2.8, h: 0.72, fontFace: F.BODY, fontSize: 10.5, color: C.LIGHT_GRAY, valign: "middle", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 17 — Results & Outcomes
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Results & Outcomes", "What we achieved this term");

    const outcomes = [
      [iCheck,  "Fully Functional Platform", "End-to-end flow: registration → booking → payment → job completion"],
      [iUser,   "Three-Role System", "Distinct experiences for Users, Workers & Admins with auth guards"],
      [iPay,    "Secure Payments", "Razorpay + cryptographic verification — tamper-proof transactions"],
      [iAI,     "AI Integration", "Groq LLaMA-3.3-70B generates professional worker bios on demand"],
      [iGoogle, "Google OAuth", "Frictionless sign-in across all roles, eliminating password friction"],
      [iDocker, "Container-Ready", "Docker Compose enables one-command deployment of all services"],
    ];

    // Icon circle color for light slide
    const iCheckL  = await iconToBase64Png("FaCheckCircle", "#0A1628");

    outcomes.forEach(([icon, title, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75;
      const y = 1.12 + row * 1.35;
      s.addShape("rect", { x, y, w: 4.5, h: 1.22, fill: { color: C.WHITE }, line: { color: C.LIGHT_GRAY, width: 0.4 } });
      // Teal number circle
      s.addShape("oval", { x: x + 0.12, y: y + 0.37, w: 0.42, h: 0.42, fill: { color: C.NAVY_TEXT }, line: { color: C.TEAL } });
      s.addText(String(i + 1), { x: x + 0.12, y: y + 0.37, w: 0.42, h: 0.42, fontFace: F.HEAD, fontSize: 12, bold: true, color: C.TEAL, align: "center", valign: "middle" });
      s.addText(title, { x: x + 0.65, y: y + 0.1, w: 3.7, h: 0.35, fontFace: F.HEAD, fontSize: 12.5, bold: true, color: C.NAVY_TEXT, margin: 0 });
      s.addText(desc, { x: x + 0.65, y: y + 0.47, w: 3.7, h: 0.68, fontFace: F.BODY, fontSize: 10.5, color: C.GRAY, valign: "top", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 18 — Future Work
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    darkTitle(s, "Future Work", "Planned enhancements for subsequent iterations");

    const future = [
      ["Map Visualization", "Google Maps/Mapbox integration for nearby worker discovery with real-time ETA"],
      ["Rating & Reviews", "1-5 star ratings, text reviews post-completion; aggregate scores for ranking"],
      ["AI Recommendations", "Recommendation engine using booking history, ratings & user preferences"],
      ["Fake Review Detection", "Apache Spark pipeline detecting rating spikes, bot patterns & duplicates"],
      ["Real-Time Notifications", "Socket.IO push notifications for bookings, payments & job status updates"],
      ["Mobile App", "React Native apps for Android & iOS to extend platform reach"],
    ];

    future.forEach(([title, desc], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75;
      const y = 1.1 + row * 1.38;
      s.addShape("rect", { x, y, w: 4.5, h: 1.25, fill: { color: C.CARD }, line: { color: C.TEAL_DIM, width: 0.5 } });
      s.addShape("oval", { x: x + 0.12, y: y + 0.38, w: 0.4, h: 0.4, fill: { color: C.TEAL }, line: { color: C.TEAL } });
      s.addText(String(i + 1), { x: x + 0.12, y: y + 0.38, w: 0.4, h: 0.4, fontFace: F.HEAD, fontSize: 12, bold: true, color: C.DARK, align: "center", valign: "middle" });
      s.addText(title, { x: x + 0.65, y: y + 0.1, w: 3.7, h: 0.33, fontFace: F.HEAD, fontSize: 12, bold: true, color: C.TEAL, margin: 0 });
      s.addText(desc, { x: x + 0.65, y: y + 0.45, w: 3.7, h: 0.72, fontFace: F.BODY, fontSize: 10.5, color: C.LIGHT_GRAY, valign: "top", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 19 — Conclusion
  // ══════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres);
    lightTitle(s, "Conclusion", "What we built & where we're headed");

    s.addShape("rect", {
      x: 0.4, y: 1.1, w: 9.2, h: 0.72,
      fill: { color: C.OFFWHITE }, line: { color: C.LIGHT_GRAY }
    });
    s.addText("Homeaze provides a digital solution for connecting service providers and customers, simplifying household service access while creating income opportunities for skilled individuals.", {
      x: 0.6, y: 1.1, w: 8.9, h: 0.72,
      fontFace: F.BODY, fontSize: 13, color: C.NAVY_TEXT, valign: "middle"
    });

    const pillars = [
      [iUser,   "Service Access", "Simplified platform connecting users with skilled workers through verified profiles and real-time booking"],
      [iPay,    "Economic Impact", "Earning opportunities for individuals with practical household skills, expanding market reach digitally"],
      [iCode,   "Modern Tech Stack", "Full-stack MERN solution: React 19, Node.js, MongoDB, Razorpay, Groq AI & Docker"],
    ];

    pillars.forEach(([icon, title, desc], i) => {
      const x = 0.4 + i * 3.15;
      lightCard(s, x, 2.0, 2.95, 2.2, title, desc);
      if (icon) s.addImage({ data: icon, x: x + 2.5, y: 2.08, w: 0.32, h: 0.32 });
    });

    // Future
    s.addShape("rect", { x: 0.4, y: 4.35, w: 9.2, h: 0.42, fill: { color: C.NAVY_TEXT }, line: { color: C.NAVY_TEXT } });
    s.addText("Future Enhancements:  🗺 Map Integration   ⭐ Rating System   🤖 AI Recommendations   📱 Mobile App   ⚡ Real-Time Notifications", {
      x: 0.55, y: 4.35, w: 9.0, h: 0.42,
      fontFace: F.BODY, fontSize: 11, color: C.TEAL, valign: "middle"
    });

    // Key learnings
    s.addText("Key Learnings", { x: 0.4, y: 4.92, w: 9.2, h: 0.28, fontFace: F.HEAD, fontSize: 12, bold: true, color: C.NAVY_TEXT });
    s.addText("RESTful API design with role-based middleware  •  OAuth 2.0 flows  •  HMAC payment verification  •  LLM API integration  •  Docker orchestration  •  React Context API state management", {
      x: 0.4, y: 5.2, w: 9.2, h: 0.3,
      fontFace: F.BODY, fontSize: 10, color: C.GRAY
    });
  }

  // ══════════════════════════════════════════════════════════
  // SLIDE 20 — Thank You
  // ══════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);

    // Left panel
    s.addShape("rect", { x: 0, y: 0, w: 4.2, h: 5.625, fill: { color: C.MID }, line: { color: C.MID } });
    s.addShape("rect", { x: 4.2, y: 0, w: 0.06, h: 5.625, fill: { color: C.TEAL }, line: { color: C.TEAL } });

    s.addShape("oval", { x: 1.4, y: 0.6, w: 1.4, h: 1.4, fill: { color: C.TEAL }, line: { color: C.TEAL } });
    s.addText("H", { x: 1.4, y: 0.6, w: 1.4, h: 1.4, fontFace: F.HEAD, fontSize: 42, bold: true, color: C.DARK, align: "center", valign: "middle" });

    s.addText("HOMEAZE", { x: 0.2, y: 2.2, w: 3.8, h: 0.55, fontFace: F.HEAD, fontSize: 28, bold: true, color: C.TEAL, align: "center", charSpacing: 4 });
    s.addText("Household Services Platform", { x: 0.2, y: 2.75, w: 3.8, h: 0.3, fontFace: F.BODY, fontSize: 11, color: C.LIGHT_GRAY, align: "center" });

    s.addShape("line", { x: 0.5, y: 3.2, w: 3.2, h: 0, line: { color: C.TEAL_DIM, width: 0.5 } });

    s.addText("Nilesh Sharma  •  Prateek Yadav", { x: 0.2, y: 3.4, w: 3.8, h: 0.35, fontFace: F.BODY, fontSize: 12, bold: true, color: C.WHITE, align: "center" });
    s.addText("Institute of Engineering & Technology\nJK Lakshmipat University", { x: 0.2, y: 3.8, w: 3.8, h: 0.55, fontFace: F.BODY, fontSize: 10.5, color: C.LIGHT_GRAY, align: "center" });
    s.addText("Faculty Guide: Dr. Deepika Prakash", { x: 0.2, y: 5.2, w: 3.8, h: 0.25, fontFace: F.BODY, fontSize: 9.5, color: C.GRAY, align: "center" });

    // Right panel
    s.addText("Thank You!", { x: 4.5, y: 1.5, w: 5.2, h: 1.0, fontFace: F.HEAD, fontSize: 46, bold: true, color: C.WHITE });
    s.addText("We appreciate your time\nand attention.", { x: 4.5, y: 2.6, w: 5.0, h: 0.7, fontFace: F.BODY, fontSize: 14, color: C.LIGHT_GRAY });

    s.addShape("rect", { x: 4.5, y: 3.5, w: 2.2, h: 0.52, fill: { color: C.TEAL }, line: { color: C.TEAL } });
    s.addText("Questions?", { x: 4.5, y: 3.5, w: 2.2, h: 0.52, fontFace: F.HEAD, fontSize: 16, bold: true, color: C.DARK, align: "center", valign: "middle" });
  }

  // ══════════════════════════════════════════════════════════
  // Save
  // ══════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "Homeaze_EndTerm_Presentation.pptx" });
  console.log("✓ Presentation saved!");
}

buildPresentation().catch(console.error);