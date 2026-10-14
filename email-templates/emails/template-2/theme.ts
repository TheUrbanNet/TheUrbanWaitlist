import type { TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';

// Shared base for every template in this folder: template 2's colours, the type scale
// (reused by 2.1 and 2.2) and the phone styles. Phone layout uses plain mob-* classes, not
// Tailwind's mobile: variant, because with this repo's package versions mobile: rules get
// inlined and apply on desktop too.

/**
 * Template 2 palette: espresso base, cream text, peach panel,
 * brand orange for links (the one interactive colour). Contrast measured (WCAG 2.x):
 *   fg on bg 17.8 · fg-2 on bg 14.3 · fg-3 on bg 6.4 · link on bg 4.9
 *   fg-inverted on bg-3 15.6 · link-inverted on bg-3 5.4
 * stroke (1.3 on bg) is a decorative divider only.
 * brand (#DF582E) appears only on links/icons (interactive) and two decorative 4px edges:
 * the top stripe and the panel's top border. Never on static text.
 */
const colors = {
  bg: '#1C110C',
  'bg-2': '#2C1E18',
  'bg-3': '#FFE7DD',
  fg: '#FFFAF4',
  'fg-2': '#ECE1D3',
  'fg-3': '#A79486',
  'fg-inverted': '#1C110C',
  stroke: '#362821',
  brand: '#DF582E',
  link: '#DF582E',
  'link-inverted': '#AB360A',
} as const;

/**
 * Type scale for Space Grotesk (headings) + Manrope (body). Space Grotesk is wide, so the
 * display step is 56px (44px on phones) with tighter tracking. 2.1 and 2.2 extend this
 * scale with their own heading sizes.
 */
export const fontScale = {
  11: { fontSize: '11px', lineHeight: '1.6', letterSpacing: '0px' },
  13: { fontSize: '13px', lineHeight: '1.55', letterSpacing: '0px' },
  15: { fontSize: '15px', lineHeight: '1.6', letterSpacing: '0px' },
  16: { fontSize: '16px', lineHeight: '1.5', letterSpacing: '0px', fontWeight: '600' },
  20: { fontSize: '20px', lineHeight: '1.5', letterSpacing: '0px' },
  22: { fontSize: '22px', lineHeight: '1.3', letterSpacing: '-0.22px', fontWeight: '500' },
  display: { fontSize: '56px', lineHeight: '1.05', letterSpacing: '-1.68px', fontWeight: '500' },
} as const;

export const template2TailwindConfig: TailwindConfig = {
  plugins: [
    plugin(({ addUtilities }) => {
      const utilities: Record<string, Record<string, string>> = {};
      for (const [step, token] of Object.entries(fontScale)) {
        utilities[`.font-${step}`] = token;
      }
      addUtilities(utilities);
    }),
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Space Grotesk', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};

/**
 * Phone styles (600px breakpoint). `!important` is needed to beat the inlined desktop styles.
 *
 * Padding rules target the inner cell. React Email's <Section> keeps its class on the outer
 * <table> but puts the padding on the inner <td>, so a rule on the class alone would ADD
 * padding around the cell instead of replacing it (40px desktop + 24px = 64px phone margins).
 * The td.* and p.* selectors cover classes placed directly on a <Column> or <Text>.
 */
export const template2MobileStyles = `
  @media (max-width: 600px) {
    table.mob-px-6 > tbody > tr > td, td.mob-px-6 { padding-left: 24px !important; padding-right: 24px !important; }
    table.mob-pt-8 > tbody > tr > td, td.mob-pt-8 { padding-top: 32px !important; }
    table.mob-pt-12 > tbody > tr > td, td.mob-pt-12 { padding-top: 48px !important; }
    table.mob-pb-10 > tbody > tr > td, td.mob-pb-10 { padding-bottom: 40px !important; }
    table.mob-py-6 > tbody > tr > td, td.mob-py-6 { padding-top: 24px !important; padding-bottom: 24px !important; }
    p.mob-pr-0, td.mob-pr-0 { padding-right: 0 !important; }
    table.mob-panel > tbody > tr > td { padding: 56px 24px !important; }
    .mob-mt-10 { margin-top: 40px !important; }
    .mob-block { display: block !important; }
    .mob-w-full { width: 100% !important; }
    .mob-max-w-full { max-width: 100% !important; }
    .mob-hidden { display: none !important; }
    .mob-font-display { font-size: 44px !important; line-height: 1.08 !important; letter-spacing: -1.32px !important; }
  }
`;
