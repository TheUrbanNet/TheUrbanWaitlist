// 04 / City zine — recreated from the CEO's inspiration board.

import { Column, Img, Row, Section, Text } from 'react-email';
import { buttonLabel, closing, intro, story } from '../content';
import { BlockButton, type DesignProps, type Edition, Footer, image, Label, Photo, Shell, waitlistUrl } from '../parts';

const headline = {
  customer: ['Your city.', 'Your people.'],
  provider: ['The city has', 'talent.'],
} as const;

const guide = {
  customer: ['Food & Catering', 'Fashion & Styling', 'Wellness & Fitness', 'Home & Lifestyle', 'Beauty & Grooming'],
  provider: ['Service Profiles', 'Category Discovery', 'Urban Plus', 'Urban Picks', 'Trends & Pairings'],
} as const;

export function CityZine({ edition, url = waitlistUrl }: DesignProps & { edition: Edition }) {
  const h = headline[edition];
  return (
    <Shell
      page="bg-paper-zine"
      paper="bg-paper-zine"
      preview={edition === 'customer' ? 'Your city. Your people. Your name is on the list.' : 'The city has talent. Your name is on the list.'}
    >
      {/* Masthead */}
      <Section className="mob-px-6 border-0 border-b-[4px] border-double border-ink px-[24px] pb-[12px] pt-[20px]">
        <Row>
          <Column className="align-middle">
            <Label className="text-fg">Edinburgh / First edition</Label>
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-fg text-right">Pre-launch · Vol 01</Label>
          </Column>
        </Row>
        <Text className="text-fg mob-h-wordmark m-0 mt-[10px] text-center font-serif text-[44px] font-bold uppercase leading-[1.05] tracking-[-1.5px]">
          TheUrban<span className="text-orange font-serif font-bold">Net</span>
        </Text>
        <Row className="mt-[10px]">
          <Column className="align-middle">
            <Label className="text-fg">The city of independents</Label>
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-fg text-right">Your name is on the list</Label>
          </Column>
        </Row>
      </Section>

      <Section className="mob-px-6 px-[24px] pb-[22px] pt-[24px]">
        <Text className="text-fg mob-h-xl m-0 font-serif text-[56px] leading-[1] tracking-[-1.5px]">
          {h[0]}
          <br />
          <span className="text-orange font-serif italic">{h[1]}</span>
        </Text>
        <Text className="text-fg m-0 mt-[16px] max-w-[440px] font-sans text-[13px] leading-[1.6]">{intro[edition]}</Text>
      </Section>

      <Photo
        file="something-good-is-coming-landscape.jpg"
        alt="Something good is coming. A newspaper reading Urbannet: you’re on the list, held above a hand reaching up against a concrete wall."
        height={400}
      />
      <Section className="mob-px-6 border-0 border-b-[2px] border-solid border-ink px-[24px] py-[8px]">
        <Label className="text-fg">Cover story // Something good is coming</Label>
      </Section>

      {/* The big picture + local spotlight */}
      <Section className="mob-px-6 px-[24px] py-[26px]">
        <Row>
          <Column className="mob-block mob-w-auto mob-pr-0 w-[50%] pr-[20px] align-top">
            <Label>01 / The big picture</Label>
            <Text className="text-fg m-0 mt-[10px] font-serif text-[28px] leading-[1.1]">
              Made for real
              <br />
              people.
            </Text>
            <Text className="text-fg m-0 mt-[12px] font-sans text-[12px] leading-[1.6]">{story[edition]}</Text>
          </Column>
          <Column className="mob-block mob-w-auto mob-pl-0 mob-pt-6 pl-[4px] align-top">
            <Img
              src={image('spotlight-patterned-fabrics.jpg')}
              alt="A designer in a bold patterned jacket fits an orange fabric wrap on a client in a fashion studio"
              width={264}
              className="block h-auto w-full max-w-full"
            />
            <Section className="mt-[12px]">
              <Label>02 / Local spotlight</Label>
              <Text className="text-fg m-0 font-sans text-[12px] leading-[1.5]">
                Independent talent. Interesting discoveries. A city full of possibilities.
              </Text>
            </Section>
          </Column>
        </Row>
      </Section>

      {/* Inside the city guide */}
      <Section className="mob-px-6 border-0 border-t-[2px] border-solid border-ink px-[24px] pt-[22px]">
        <Text className="text-fg mob-h-sm m-0 font-serif text-[30px] leading-[1.15]">Inside the city guide</Text>
        <Section className="mt-[14px]">
          {guide[edition].map((name, i) => (
            <Row key={name} className="border-0 border-t border-solid border-rule">
              <Column className="py-[9px] align-middle">
                <Text className="text-fg m-0 font-sans text-[12px] font-semibold leading-[1.5]">
                  0{i + 1} / {name}
                </Text>
              </Column>
              <Column className="w-[120px] py-[9px] text-right align-middle">
                <Text className="text-fg-2 m-0 text-right font-sans text-[11px] uppercase leading-[1.5] tracking-[0.6px]">
                  Explore soon ↗
                </Text>
              </Column>
            </Row>
          ))}
        </Section>
      </Section>

      {/* Black closing band */}
      <Section className="bg-ink-zine mob-px-6 mt-[28px] px-[24px] py-[30px]">
        <Row>
          <Column className="mob-block mob-w-auto mob-pr-0 w-[56%] pr-[16px] align-middle">
            <Text className="text-on-dark mob-h-sm m-0 font-serif text-[28px] leading-[1.15]">{closing[edition]}</Text>
          </Column>
          <Column className="mob-block mob-w-auto mob-pt-6 mob-text-left text-right align-middle">
            <BlockButton href={url} colours="bg-orange text-fg">
              {buttonLabel[edition]}
            </BlockButton>
          </Column>
        </Row>
      </Section>

      <Footer border={false} />
    </Shell>
  );
}
