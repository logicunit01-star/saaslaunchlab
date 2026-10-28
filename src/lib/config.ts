export const siteConfig = {
  name: "SaaS Launch Lab",
  shortName: "LaunchLab",
  tagline: "The Engineering & Architecture Journal for High-Scale SaaS Founders",
  description:
    "In-depth blueprints, architectural breakdowns, MVP development strategies, and AI economics for founders, engineers, and product leaders building modern software.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://saaslaunchlab.com",
  contactEmail: "editorial@saaslaunchlab.com",
  categories: [
    "All",
    "Architecture",
    "AI & Automation",
    "MVP & Engineering",
    "Growth & Strategy",
    "Audits & Economics"
  ] as const,
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/#articles" },
    { label: "Contact", href: "/contact" }
  ]
};

export type Category = (typeof siteConfig.categories)[number];
