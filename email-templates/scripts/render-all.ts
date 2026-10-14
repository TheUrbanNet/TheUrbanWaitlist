import { render } from '@react-email/render';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'dist', 'html');

const emails: { name: string; path: string }[] = [
  { name: 'template-2.2', path: '../emails/template-2/template-2.2' },
  { name: 'customer-confirmation', path: '../emails/template-2/customer-confirmation' },
  { name: 'customer-confirmation-feature-card', path: '../emails/template-2/customer-confirmation-feature-card' },
  { name: 'business-confirmation', path: '../emails/template-2/business-confirmation' },
  // Waitlist confirmations recreated from the CEO's inspiration boards.
  { name: 'waitlist-01-cover-story-customer', path: '../emails/waitlist/01-cover-story-customer' },
  { name: 'waitlist-01-cover-story-provider', path: '../emails/waitlist/01-cover-story-provider' },
  { name: 'waitlist-02-lookbook-customer', path: '../emails/waitlist/02-lookbook-customer' },
  { name: 'waitlist-02-lookbook-provider', path: '../emails/waitlist/02-lookbook-provider' },
  { name: 'waitlist-03-backstage-pass-customer', path: '../emails/waitlist/03-backstage-pass-customer' },
  { name: 'waitlist-03-backstage-pass-provider', path: '../emails/waitlist/03-backstage-pass-provider' },
  { name: 'waitlist-04-city-zine-customer', path: '../emails/waitlist/04-city-zine-customer' },
  { name: 'waitlist-04-city-zine-provider', path: '../emails/waitlist/04-city-zine-provider' },
  { name: 'waitlist-05-atelier-customer', path: '../emails/waitlist/05-atelier-customer' },
  { name: 'waitlist-05-atelier-provider', path: '../emails/waitlist/05-atelier-provider' },
];


async function main() {
  mkdirSync(outDir, { recursive: true });

  for (const email of emails) {
    const mod = await import(email.path);
    const Component = mod.default;
    const html = await render(Component(Component.PreviewProps ?? {}));
    const filePath = join(outDir, `${email.name}.html`);
    writeFileSync(filePath, html, 'utf-8');
    console.log(`Rendered: ${filePath}`);
  }

  console.log(`\nDone — ${emails.length} templates rendered to dist/html/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
