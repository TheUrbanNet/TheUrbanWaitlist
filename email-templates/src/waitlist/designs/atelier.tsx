// 05 / The atelier — recreated from the CEO's inspiration board.

import { Column, Row, Section, Text } from 'react-email';
import { buttonLabel, closing, intro, story, things } from '../content';
import { BlockButton, type DesignProps, type Edition, Footer, Label, Photo, Shell, Wordmark, waitlistUrl } from '../parts';

export function Atelier({ edition, url = waitlistUrl }: DesignProps & { edition: Edition }) {
  return (
    <Shell
      page="bg-paper-atelier"
      paper="bg-paper-atelier"
      preview={edition === 'customer' ? 'Good things are local. You’re on the list.' : 'Made to be seen. You’re on the list.'}
    >
      <Section className="mob-px-6 px-[28px] pt-[28px]">
        <Row>
          <Column className="align-middle">
            <Wordmark size="text-[22px]" />
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-fg-2 text-right">A curated introduction / No. 001</Label>
          </Column>
        </Row>
      </Section>

      <Section className="mob-px-6 px-[28px] pb-[34px] pt-[44px] text-center">
        <Label className="text-orange text-center">You’re on the list</Label>
        <Text className="text-fg mob-h-xl m-0 mt-[14px] text-center font-display text-[62px] leading-[1] tracking-[-1px]">
          {edition === 'customer' ? (
            <>
              Good things
              <br />
              are <span className="font-display italic">local.</span>
            </>
          ) : (
            <>
              Made to
              <br />
              <span className="font-display italic">be seen.</span>
            </>
          )}
        </Text>
        <Text className="text-fg m-0 mx-auto mt-[18px] max-w-[340px] text-center font-sans text-[12px] leading-[1.6]">
          {intro[edition]}
        </Text>
      </Section>

      <Photo
        file="atelier-portrait.jpg"
        alt="A woman with glowing skin, orange and gold eyeshadow and glossy lips, one hand resting in her long dark hair"
        height={493}
      />

      {/* Deep green panel */}
      <Section className="bg-green mob-px-6 px-[30px] pb-[44px] pt-[44px]">
        <Label>The things worth waiting for</Label>
        <Text className="text-on-dark mob-h-md m-0 mt-[14px] font-display text-[42px] leading-[1.05]">
          A closer look
          <br />
          at what’s coming.
        </Text>
        <Section className="mt-[26px]">
          {things[edition].map((t, i) => (
            <Row key={t.title} className="border-0 border-t border-solid border-rule-green">
              <Column className="w-[52px] py-[16px] align-top">
                <Text className="text-orange m-0 font-display text-[22px] leading-[1.2]">0{i + 1}</Text>
              </Column>
              <Column className="py-[16px] align-top">
                <Text className="text-on-dark m-0 font-sans text-[13px] font-semibold leading-[1.5]">{t.title}</Text>
                <Text className="text-on-green-2 m-0 mt-[2px] font-sans text-[11px] leading-[1.5]">{t.body}</Text>
              </Column>
            </Row>
          ))}
        </Section>
      </Section>

      <Section className="mob-px-6 px-[28px] pb-[40px] pt-[44px] text-center">
        <Text className="text-fg mob-h-sm m-0 text-center font-serif text-[28px] leading-[1.2]">{closing[edition]}</Text>
        <Text className="text-fg m-0 mx-auto mt-[10px] max-w-[380px] text-center font-sans text-[12px] leading-[1.6]">
          {story[edition]}
        </Text>
        <Section className="mt-[22px]">
          <BlockButton href={url} colours="bg-green text-on-dark">
            {buttonLabel[edition]}
          </BlockButton>
        </Section>
      </Section>

      <Footer />
    </Shell>
  );
}
