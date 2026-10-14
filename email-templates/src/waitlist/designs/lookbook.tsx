// 02 / The lookbook — recreated from the CEO's inspiration board.

import { Column, Img, Row, Section, Text } from 'react-email';
import { buttonLabel, closing, intro, things } from '../content';
import { BlockButton, type DesignProps, type Edition, Footer, image, Label, Photo, Shell, Wordmark, waitlistUrl } from '../parts';

const headline = {
  customer: ['Local', 'Looks', 'Good.'],
  provider: ['Your', 'Work.', 'Seen.'],
} as const;

const strip = [
  { file: 'strip-fashion-studio.jpg', alt: 'A designer in a bold patterned jacket fits an orange fabric wrap on a client in a fashion studio' },
  { file: 'strip-braiding-salon.jpg', alt: 'A stylist braids a client’s hair in a warm, plant-filled salon' },
  { file: 'strip-living-room.jpg', alt: 'A styled living room with a curved orange sofa, cream armchairs and gold pendant lights' },
];

export function Lookbook({ edition, url = waitlistUrl }: DesignProps & { edition: Edition }) {
  const h = headline[edition];
  return (
    <Shell
      page="bg-paper-lookbook"
      paper="bg-paper-lookbook"
      preview={edition === 'customer' ? 'Local looks good. Your invitation has been received.' : 'Your work. Seen. Your invitation has been received.'}
    >
      {/* Orange masthead */}
      <Section className="bg-orange mob-px-6 px-[24px] py-[18px]">
        <Row>
          <Column className="align-middle">
            <Wordmark base="text-on-dark" net="text-on-dark" size="text-[20px]" />
          </Column>
          <Column className="text-right align-middle">
            <Label className="text-on-dark text-right">
              The lookbook
              <br />
              Vol. 01 / Pre-launch
            </Label>
          </Column>
        </Row>
      </Section>

      <Section className="mob-px-6 px-[24px] pb-[20px] pt-[26px]">
        <Label className="text-fg">Your invitation has been received</Label>
        <Text className="text-fg mob-h-lg m-0 mt-[12px] font-sans text-[64px] font-black uppercase leading-[0.92] tracking-[-2.5px]">
          {h[0]}
          <br />
          <span className="text-orange font-sans font-black">{h[1]}</span>
          <br />
          {h[2]}
        </Text>
        <Text className="text-fg m-0 mt-[16px] max-w-[340px] font-sans text-[13px] leading-[1.6]">{intro[edition]}</Text>
      </Section>

      <Photo
        file="something-good-is-coming-landscape.jpg"
        alt="Something good is coming. A newspaper reading Urbannet: you’re on the list, held above a hand reaching up against a concrete wall."
        height={400}
      />

      {/* Three-photo strip on a black frame */}
      <Section className="bg-ink px-[6px] pb-[6px] pt-[6px]">
        <Row>
          {strip.map((s, i) => (
            <Column key={s.file} className={`w-1/3 align-top ${['pr-[4px]', 'px-[2px]', 'pl-[4px]'][i]}`}>
              <Img src={image(s.file)} alt={s.alt} width={192} className="block h-auto w-full max-w-full" />
            </Column>
          ))}
        </Row>
      </Section>

      {/* The things to look out for */}
      <Section className="mob-px-6 px-[24px] pt-[30px]">
        <Row>
          <Column className="align-top">
            <Text className="text-fg mob-h-md m-0 font-serif text-[32px] leading-[1.15]">
              The things
              <br />
              to look out for.
            </Text>
          </Column>
          <Column className="w-[120px] text-right align-top">
            <Label className="text-orange text-right">
              Inside the issue
              <br />↘ 001 / 003
            </Label>
          </Column>
        </Row>
        <Section className="mt-[20px]">
          {things[edition].map((t, i) => (
            <Row key={t.title} className="border-0 border-t border-solid border-rule">
              <Column className="w-[42px] py-[14px] align-top">
                <Text className="text-orange m-0 font-sans text-[11px] font-extrabold leading-[1.6]">0{i + 1}</Text>
              </Column>
              <Column className="py-[14px] align-top">
                <Text className="text-fg m-0 font-sans text-[13px] font-semibold leading-[1.5]">{t.title}</Text>
                <Text className="text-fg-2 m-0 mt-[2px] font-sans text-[12px] leading-[1.5]">{t.body}</Text>
              </Column>
            </Row>
          ))}
        </Section>
      </Section>

      {/* Orange closing band */}
      <Section className="bg-orange mob-px-6 mt-[30px] px-[24px] py-[30px] text-center">
        <Text className="text-fg mob-h-sm m-0 text-center font-serif text-[24px] leading-[1.4]">{closing[edition]}</Text>
        <Section className="mt-[18px]">
          <BlockButton href={url}>{buttonLabel[edition]}</BlockButton>
        </Section>
      </Section>

      <Footer border={false} />
    </Shell>
  );
}
