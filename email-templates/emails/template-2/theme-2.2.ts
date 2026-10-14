import type { TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';
import { fontScale, template2TailwindConfig } from './theme';

/**
 * Template 2.2 — template-2 on a peach base (#FFE7DD), with the closing panel flipped to
 * espresso so it becomes the one dark, high-contrast moment.
 * Phone styles and base type scale come from template-2 (./theme); heading font is its own.
 *
 * Contrast measured (WCAG 2.x):
 *   on peach — fg 15.6 · fg-2 9.2 · fg-3 5.6 · link (#AB360A, deeper step of the brand hue) 5.4
 *   on the espresso panel — fg-inverted 17.8 · link-inverted (#DF582E) 4.9
 * Brand orange #DF582E is 3.18 on peach, so on peach it's decorative only (top stripe).
 * stroke and bg-2 are decorative.
 */
const colors = {
  bg: '#FFE7DD',
  'bg-2': '#F9D5C6',
  'bg-3': '#1C110C',
  fg: '#1C110C',
  'fg-2': '#4A392F',
  'fg-3': '#6E584C',
  'fg-inverted': '#FFFAF4',
  stroke: '#F2CBBA',
  brand: '#DF582E',
  link: '#AB360A',
  'link-inverted': '#DF582E',
} as const;

/**
 * Instrument Serif headings: a slim editorial serif with one (400) weight — the face the
 * layout was first drawn around, so its 72px display size fits the layout again.
 * The panel heading moves up to 28px so the single light weight still holds its own.
 */
const fontScale22 = {
  ...fontScale,
  22: { fontSize: '28px', lineHeight: '1.2', letterSpacing: '-0.2px', fontWeight: '400' },
  display: { fontSize: '72px', lineHeight: '1', letterSpacing: '-0.52px', fontWeight: '400' },
} as const;

export const template22TailwindConfig: TailwindConfig = {
  ...template2TailwindConfig,
  plugins: [
    plugin(({ addUtilities }) => {
      const utilities: Record<string, Record<string, string>> = {};
      for (const [step, token] of Object.entries(fontScale22)) {
        utilities[`.font-${step}`] = token;
      }
      addUtilities(utilities);
    }),
  ],
  theme: {
    ...template2TailwindConfig.theme,
    extend: {
      ...template2TailwindConfig.theme?.extend,
      colors,
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
};
