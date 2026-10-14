// 03 / Backstage pass — recreated from the CEO's inspiration board.
// The ticket's tilt is a CSS rotate: Apple Mail shows it, Gmail and Outlook show it straight.

import { Column, Img, Row, Section, Text } from 'react-email';
import { buttonLabel, intro, story, things } from '../content';
import { BlockButton, type DesignProps, type Edition, Footer, image, Label, Shell, Wordmark, waitlistUrl } from '../parts';

export function BackstagePass({ edition, url = waitlistUrl }: DesignProps & { edition: Edition }) {
  return (
    <Shell
      page="bg-ink-backstage"
      paper="bg-ink-backstage"
      preview={edition === 'customer' ? 'You’re in. The list is officially open.' : 'You’re next. The list is officially open.'}
    >
      <Section className="mob-px-6 px-[24px] pt-[28px]">
        <Row>
          <Column className="align-middle">
            <Wordmark base="text-on-dark" size="text-[20px]" />
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-on-dark text-right">
              Backstage / 001
              <br />
              Early access edition
            </Label>
          </Column>
        </Row>
      </Section>

      <Section className="mob-px-6 px-[24px] pt-[40px]">
        <Label>The list is officially open</Label>
        <Text className="text-on-dark mob-h-xl m-0 mt-[12px] font-sans text-[76px] font-black uppercase leading-[0.9] tracking-[-3px]">
          You’re
        </Text>
        <Text className="text-orange mob-h-xl m-0 font-display text-[84px] italic leading-[0.95] tracking-[-1px]">
          {edition === 'customer' ? 'in.' : 'next.'}
        </Text>
        <Text className="text-on-dark m-0 mt-[20px] max-w-[340px] font-sans text-[13px] leading-[1.6]">{intro[edition]}</Text>
      </Section>

      <Section className="mob-px-6 mt-[30px] px-[24px]">
        <Img
          src={image('something-good-is-coming-landscape.jpg')}
          alt="Something good is coming. A newspaper reading Urbannet: you’re on the list, held above a hand reaching up against a concrete wall."
          width={552}
          height={368}
          className="block h-auto w-full max-w-full"
        />
      </Section>

      {/* The ticket */}
      <Section className="mob-px-5 mt-[26px] px-[20px]">
        <Section className="bg-orange" style={{ transform: 'rotate(-1.5deg)' }}>
          <Section className="px-[24px] pt-[22px]">
            <Row>
              <Column className="align-top">
                <Label className="text-fg">TheUrbanNet / Special access</Label>
              </Column>
              <Column className="text-right align-top">
                <Label className="text-fg text-right">Waitlist confirmed ✓</Label>
              </Column>
            </Row>
            <Text className="text-fg mob-h-md m-0 mt-[22px] font-sans text-[40px] font-black uppercase leading-[0.95] tracking-[-1.5px]">
              Good
              <br />
              things ahead.
            </Text>
            <Text className="text-fg m-0 mt-[14px] max-w-[400px] pb-[22px] font-sans text-[13px] leading-[1.55]">
              {story[edition]}
            </Text>
          </Section>
          <Section className="border-0 border-t-[2px] border-dashed border-ink px-[24px] py-[14px]">
            <Row>
              <Column className="align-middle">
                <Label className="text-fg">Admit one / First look</Label>
              </Column>
              <Column className="text-right align-middle">
                <Label className="text-fg text-right">Est. for the independents</Label>
              </Column>
            </Row>
          </Section>
        </Section>
      </Section>

      {/* What's backstage */}
      <Section className="mob-px-6 px-[24px] pt-[44px]">
        <Text className="text-on-dark mob-h-md m-0 font-serif text-[32px] leading-[1.15]">What’s backstage?</Text>
        <Section className="mt-[18px]">
          {things[edition].map((t, i) => (
            <Row key={t.title} className="border-0 border-t border-solid border-rule-dark">
              <Column className="w-[52px] py-[14px] align-top">
                <Text className="text-orange m-0 font-sans text-[13px] font-extrabold leading-[1.5]">0{i + 1}</Text>
              </Column>
              <Column className="py-[14px] align-top">
                <Text className="text-on-dark m-0 font-sans text-[13px] font-semibold leading-[1.5]">{t.title}</Text>
                <Text className="text-on-dark-2 m-0 font-sans text-[11px] leading-[1.5]">{t.body}</Text>
              </Column>
            </Row>
          ))}
        </Section>
      </Section>

      <Section className="px-[24px] pb-[40px] pt-[36px] text-center">
        <BlockButton href={url} colours="bg-orange text-fg">
          {buttonLabel[edition]}
        </BlockButton>
      </Section>

      <Footer dark />
    </Shell>
  );
}
