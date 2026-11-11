const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/articles');

const mappings = {
  '9-common-saas-seo-mistakes.md': [
    { text: 'SEO blogs', url: '/blog' },
    { text: 'SaaS websites', url: '/blog/saas-website-architecture' },
    { text: 'what B2B SaaS actually means', url: '/blog/what-is-b2b-saas' },
    { text: 'how to scale a SaaS business', url: '/blog/how-to-scale-a-saas-business' },
    { text: 'what is B2B SaaS', url: '/blog/what-is-b2b-saas' },
    { text: 'How Much Does SaaS Development Cost in 2026?', url: '/blog/saas-development-cost' },
    { text: 'SaaS company', url: '/blog/saas-development-agency-vs-freelancer' }
  ],
  'customer-success-in-saas-2026.md': [
    { text: 'AI feature costs', url: '/blog/cost-of-ai-in-saas' },
    { text: 'technical SaaS SEO strategy', url: '/blog/9-common-saas-seo-mistakes' },
    { text: 'how to scale a SaaS business', url: '/blog/how-to-scale-a-saas-business' },
    { text: 'what is SaaS sales', url: '/blog/what-is-saas-sales' },
    { text: 'B2B SaaS', url: '/blog/what-is-b2b-saas' }
  ],
  'how-to-scale-a-saas-business.md': [
    { text: 'SaaS growth', url: '/blog/category/growth-strategy' },
    { text: 'pricing', url: '/blog/saas-platform-development-cost-2025-2026-per-feature' },
    { text: 'common scaling mistake', url: '/blog/why-most-saas-mvps-fail' },
    { text: 'SaaS business grow', url: '/blog/what-is-b2b-saas' },
    { text: 'pre-launch SaaS audit', url: '/blog/saas-audit-checklist-before-launch' }
  ],
  'mvp-development-cost.md': [
    { text: 'development cost in 2026', url: '/blog/saas-development-cost' },
    { text: 'startup product development', url: '/blog/saas-product-development' },
    { text: 'how to validate a SaaS idea before spending $1', url: '/blog/validate-saas-idea' },
    { text: '30-day SaaS MVP execution plan', url: '/blog/saas-mvp-in-30-days' },
    { text: 'no-code SaaS guide', url: '/blog/no-code-saas-guide' },
    { text: 'complete SaaS product development roadmap', url: '/blog/saas-product-development' },
    { text: 'why most SaaS MVPs fail in the first 90 days', url: '/blog/why-most-saas-mvps-fail' }
  ],
  'saas-development-agency-vs-freelancer.md': [
    { text: 'Node.js backend', url: '/blog/backend-choices-for-saas' },
    { text: 'SaaS development', url: '/blog/saas-development-cost' }
  ],
  'validate-saas-idea.md': [
    { text: 'SaaS MVP development costs', url: '/blog/mvp-development-cost' },
    { text: 'SaaS MVP in 30 days', url: '/blog/saas-mvp-in-30-days' },
    { text: 'pre-launch SaaS audit checklist', url: '/blog/saas-audit-checklist-before-launch' }
  ],
  'what-is-b2b-saas.md': [
    { text: 'customer', url: '/blog/customer-success-in-saas-2026' },
    { text: 'What Is SaaS Sales?', url: '/blog/what-is-saas-sales' },
    { text: 'How to Scale a SaaS Business', url: '/blog/how-to-scale-a-saas-business' },
    { text: 'Common SaaS SEO Mistakes', url: '/blog/9-common-saas-seo-mistakes' },
    { text: 'Common UX Mistakes That Kill Conversion', url: '/blog/common-ux-mistakes-saas-conversion-rates' },
    { text: 'How to Choose a SaaS Development Partner in 2026', url: '/blog/choose-saas-development-partner' },
    { text: 'How to Validate a SaaS Idea Before Spending $1', url: '/blog/validate-saas-idea' },
    { text: 'Enterprise SaaS backend', url: '/blog/backend-choices-for-saas' },
    { text: 'SaaS Development Agency vs Freelancer', url: '/blog/saas-development-agency-vs-freelancer' },
    { text: 'How Much Does It Cost to Add AI to a SaaS?', url: '/blog/cost-of-ai-in-saas' },
    { text: 'How Much Does\u00a0SaaS Development\u00a0Cost in 2026?', url: '/blog/saas-development-cost' },
    { text: 'SaaS Audit Checklist Before Launch', url: '/blog/saas-audit-checklist-before-launch' },
    { text: 'B2B SaaS', url: '/blog/category/growth-strategy' },
    { text: 'Why Most SaaS MVPs Fail in the First 90 Days', url: '/blog/why-most-saas-mvps-fail' }
  ],
  'why-most-saas-mvps-fail.md': [
    { text: 'SaaS launch', url: '/blog/saas-audit-checklist-before-launch' }
  ]
};

Object.entries(mappings).forEach(([file, items]) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  items.forEach(({ text, url }) => {
    // Escape text for regex
    const escapedText = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\[${escapedText}\\]\\(\\/blog\\/?\\)`, 'g');
    content = content.replace(regex, `[${text}](${url})`);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated links in ${file}`);
});
