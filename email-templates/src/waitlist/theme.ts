import type { TailwindConfig } from 'react-email';
import { template2MobileStyles } from '../../emails/template-2/theme';

// Theme for the waitlist confirmation recreations: the five designs from the CEO's
// inspiration boards (Cover story, Lookbook, Backstage pass, City zine, Atelier).
// Colours are matched to the boards; each paper is the background of one design.
const colors = {
  'paper-cover': '#F7F5F0',
  'paper-lookbook': '#F9F7F2',
  'paper-zine': '#EEE9DF',
  'paper-atelier': '#F1F0EA',
  ink: '#111111',
  'ink-backstage': '#12130F',
  'ink-zine': '#1B1B19',
  green: '#1B3A16',
  orange: '#F57C00',
  fg: '#111111',
  'fg-2': '#4A4A46',
  'fg-3': '#9A968E',
  'on-dark': '#F7F5F0',
  'on-dark-2': '#B9B7AE',
  'on-green-2': '#C9D2C3',
  rule: '#DDD8CE',
  'rule-dark': '#33342F',
  'rule-green': '#3B5735',
} as const;

export const waitlistTailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        // Body and the heavy display sans (LOCAL LOOKS GOOD., YOU'RE, the wordmark).
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        // High-contrast display serif (You're on the list., Good things are local.).
        display: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
        // The plain book serif used for section headings on the boards.
        serif: ['Times New Roman', 'Times', 'Georgia', 'serif'],
      },
    },
  },
};

/** Phone styles: template-2's shared mob-* rules plus the few these designs need. */
export const waitlistMobileStyles = `${template2MobileStyles}
  @media (max-width: 600px) {
    table.mob-px-5 > tbody > tr > td, td.mob-px-5 { padding-left: 20px !important; padding-right: 20px !important; }
    td.mob-w-auto { width: auto !important; }
    td.mob-pl-0 { padding-left: 0 !important; }
    td.mob-px-0 { padding-left: 0 !important; padding-right: 0 !important; }
    td.mob-pt-3 { padding-top: 12px !important; }
    td.mob-pt-4 { padding-top: 16px !important; }
    td.mob-pt-6 { padding-top: 24px !important; }
    td.mob-border-0 { border-left: 0 !important; border-right: 0 !important; }
    td.mob-border-t { border-top: 1px solid #DDD8CE !important; }
    .mob-text-left { text-align: left !important; }
    .mob-h-xl { font-size: 46px !important; line-height: 1 !important; }
    .mob-h-lg { font-size: 40px !important; line-height: 1 !important; }
    .mob-h-md { font-size: 30px !important; line-height: 1.1 !important; }
    .mob-h-sm { font-size: 24px !important; line-height: 1.15 !important; }
    .mob-h-wordmark { font-size: 30px !important; }
  }
`;
