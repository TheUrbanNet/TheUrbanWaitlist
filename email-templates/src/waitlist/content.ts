import type { Edition } from './parts';

// Copy shared by several of the boards, word for word.

export const intro: Record<Edition, string> = {
  customer: 'A new way to discover independent talent, incredible services and the people behind them.',
  provider:
    'Your work deserves more than getting lost in a feed. Get ready to introduce your services to people looking locally.',
};

export const story: Record<Edition, string> = {
  customer:
    'Something new is coming to local discovery. From the people who make your city feel like yours to the services you never knew you needed, we’re putting it all in one place.',
  provider:
    'TheUrbanNet is creating a new place for independent providers to be seen. You bring the talent. We’re building the discovery experience that helps more people find it.',
};

export const things: Record<Edition, { title: string; body: string }[]> = {
  customer: [
    { title: 'Discover local', body: 'Find independent services across five categories.' },
    { title: 'Curated for curiosity', body: 'Explore Urban Picks, Insider Picks and emerging Trends.' },
    { title: 'Better together', body: 'See how independent services connect through Pairings.' },
  ],
  provider: [
    { title: 'Show what you do', body: 'Present your services, images and business profile in one place.' },
    { title: 'Be discoverable', body: 'Be part of category discovery and relevant Trends.' },
    { title: 'Explore more visibility', body: 'Learn about Urban Plus and paid Urban Picks opportunities.' },
  ],
};

export const closing: Record<Edition, string> = {
  customer: 'You’re early. That’s a good place to be.',
  provider: 'The next chapter of your business starts with being found.',
};

export const buttonLabel: Record<Edition, string> = {
  customer: 'Keep an eye on your inbox',
  provider: 'Watch for your launch update',
};
