// 01 / Cover story — recreated from the CEO's inspiration board.

import { Column, Row, Section, Text } from 'react-email';
import { BlockButton, type DesignProps, type Edition, Footer, Label, Photo, Shell, Wordmark, waitlistUrl } from '../parts';

const copy = {
  customer: {
    preview: 'You’re on the list. An invitation to something good.',
    headline: ['You’re on', 'the list.'],
    intro:
      'Something new is coming to local discovery. From the people who make your city feel like yours to the services you never knew you needed, we’re putting it all in one place.',
    edits: [
      { title: 'Urban Picks', body: 'A closer look at featured independent providers and services.' },
      { title: 'Insider Picks', body: 'Editorial favourites, selected by TheUrbanNet.' },
    ],
    closing: 'You’re early. That’s a good place to be.',
    button: 'Keep an eye on your inbox',
  },
  provider: {
    preview: 'Your work. In the frame. An invitation to something good.',
    headline: ['Your work.', 'In the frame.'],
    intro:
      'TheUrbanNet is creating a new place for independent providers to be seen. You bring the talent. We’re building the discovery experience that helps more people find it.',
    edits: [
      { title: 'Your provider profile', body: 'Showcase your services and the work behind them.' },
      { title: 'Visibility options', body: 'Explore Urban Plus and optional Urban Picks features.' },
    ],
    closing: 'The next chapter of your business starts with being found.',
    button: 'Watch for your launch update',
  },
} as const;

export function CoverStory({ edition, url = waitlistUrl }: DesignProps & { edition: Edition }) {
  const c = copy[edition];
  return (
    <Shell paper="bg-paper-cover" preview={c.preview}>
      {/* Masthead */}
      <Section className="mob-px-6 border-0 border-b-[2px] border-solid border-ink px-[32px] py-[26px]">
        <Row>
          <Column className="align-middle">
            <Wordmark />
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-fg text-right">
              The Urban Edit
              <br />
              Issue 001 · Waitlist
            </Label>
          </Column>
        </Row>
      </Section>

      {/* Cover line */}
      <Section className="mob-px-6 px-[32px] pb-[22px] pt-[40px]">
        <Label>An invitation to something good</Label>
        <Text className="text-fg mob-h-xl m-0 mt-[14px] font-display text-[64px] leading-[0.98] tracking-[-1px]">
          {c.headline[0]}
          <br />
          <span className="font-display italic">{c.headline[1]}</span>
        </Text>
      </Section>

      <Photo
        file="something-good-is-coming-portrait.jpg"
        alt="Something good is coming. A hand passes down a newspaper reading Urbannet: you’re on the list, towards a hand reaching up."
        height={750}
      />
      <Section className="bg-ink px-[16px] py-[12px]">
        <Row>
          <Column className="w-1/3 text-left">
            <Label className="text-on-dark">Real people</Label>
          </Column>
          <Column className="w-1/3 text-center">
            <Label className="text-on-dark text-center">Real services</Label>
          </Column>
          <Column className="w-1/3 text-right">
            <Label className="text-on-dark text-right">Real easy</Label>
          </Column>
        </Row>
      </Section>

      {/* Consider this your first look */}
      <Section className="mob-px-6 px-[32px] py-[32px]">
        <Row>
          <Column className="mob-block mob-w-auto mob-pr-0 w-[178px] pr-[20px] align-top">
            <Text className="text-fg mob-h-sm m-0 font-serif text-[26px] leading-[1.15]">
              Consider this your first look.
            </Text>
          </Column>
          <Column className="mob-block mob-w-auto mob-pt-4 align-top">
            <Text className="text-fg m-0 font-sans text-[13px] leading-[1.6]">{c.intro}</Text>
          </Column>
        </Row>
      </Section>

      {/* The edit */}
      <Section className="border-0 border-t border-solid border-rule">
        <Row>
          {c.edits.map((edit, i) => (
            <Column
              key={edit.title}
              className={`mob-block mob-w-auto mob-border-0 mob-px-6 w-1/2 px-[28px] py-[28px] align-top ${i === 1 ? 'mob-border-t border-0 border-l border-solid border-rule' : ''}`}
            >
              <Label>The edit / 0{i + 1}</Label>
              <Text className="text-fg m-0 mt-[12px] font-serif text-[24px] leading-[1.15]">{edit.title}</Text>
              <Text className="text-fg-2 m-0 mt-[10px] font-sans text-[12px] leading-[1.6]">{edit.body}</Text>
            </Column>
          ))}
        </Row>
      </Section>

      {/* Closing */}
      <Section className="mob-px-6 border-0 border-t border-solid border-rule px-[32px] pb-[40px] pt-[36px] text-center">
        <Label className="text-orange text-center">First look. First to know.</Label>
        <Text className="text-fg m-0 mt-[12px] text-center font-serif text-[22px] leading-[1.3]">{c.closing}</Text>
        <Section className="mt-[22px]">
          <BlockButton href={url}>{c.button}</BlockButton>
        </Section>
      </Section>

      <Footer />
    </Shell>
  );
}
