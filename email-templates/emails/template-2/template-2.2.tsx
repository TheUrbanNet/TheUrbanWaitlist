// Template 2.2: THE REFERENCE TEMPLATE. Start new templates from this file.
// Peach background, Instrument Serif headings and images from the company's Canva designs.
// Layout based on React Email's "Arcane" welcome demo:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails/04-Arcane

import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import { assetUrl } from '../../src/lib/assetUrl';
import { company } from '../../src/tokens/company';
import { Template22Fonts, template22MobileStyles } from './fonts-2.2';
import { template2MobileStyles } from './theme';
import { template22TailwindConfig } from './theme-2.2';

const image = (file: string) => assetUrl(`/static/template-2/${file}`);

type Feature = {
  title: string;
  body: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
};
interface TemplateProps {
  companyName: string;
  url: string;
}
const features: Feature[] = [
  {
    title: 'Find your next favourite',
    body: "Explore independent service providers' profiles and find the service that feels right for you.",
    ctaLabel: 'Browse local providers \u2192',
    imageSrc: image('feature-1-why-choose-us.jpg'),
    imageAlt:
      'More choice. Better discovery. Easier connections. The Urbannet logo above a table of home-cooked dishes.',
    imagePosition: 'left',
  },
  {
    title: 'Explore',
    body: 'Looking for something specific or just seeing what’s out there? Browse by category and discover independent service providers.',
    ctaLabel: 'Explore categories \u2192',
    imageSrc: image('feature-2-explore.jpg'),
    imageAlt:
      'More than a directory: the TheUrbanNet app showing recommended providers by category',
    imagePosition: 'right',
  },
];
export const Template22 = ({ companyName, url }: TemplateProps) => {
  return (
    <Tailwind config={template22TailwindConfig}>
      <Html lang="en">
        <Head>
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
          <Template22Fonts />
          <style>{template2MobileStyles}</style>
          <style>{template22MobileStyles}</style>
        </Head>

        <Body className="font-15 m-0 bg-white p-0 font-sans">
          <Preview>Welcome to {companyName}</Preview>
          <Section className="m-0 bg-white p-0">
            <Container className="bg-bg mx-auto w-full max-w-[640px]">
              {/* Brand stripe — decorative */}
              <Section className="bg-brand h-[4px] text-[0px] leading-[0px]">&nbsp;</Section>

              <Section className="m-0 p-0">
                <Img
                  src={image('rectangle-2162.jpg')}
                  alt="TheUrbanNet"
                  width="864"
                  className="block h-auto w-full max-w-full"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </Section>

              <Section className="mob-px-6 mob-pt-12 px-[40px] pt-[64px]">
                <Text className="mob-max-w-full font-display mob-font-display text-fg font-heading m-0 [text-wrap:balance]">
                  Welcome to TheUrbanNet
                </Text>
                <Text className="mob-max-w-full font-15 text-fg-2 m-0 mt-[24px] max-w-[480px] font-sans">
                  Explore local providers across food, fashion, wellness, home and beauty, all in
                  one place.
                </Text>
              </Section>

              <Section className="bg-bg-2 mob-mt-10 mt-[64px]">
                <Img
                  src={image('hero-canva-short.jpg')}
                  alt="Five independent providers side by side: a chef, a stylist, a fitness coach, a home host and a skincare specialist"
                  width={640}
                  className="mob-max-w-full block w-full max-w-[640px]"
                />
              </Section>

              <Section className="mob-px-6 mob-pt-12 px-[40px] pt-[88px]">
                <Text className="mob-max-w-full font-display mob-font-display text-fg font-heading m-0 max-w-[560px] [text-wrap:balance]">
                  Good things start local
                </Text>
                <Section className="mob-mt-10 mt-[64px]">
                  {features.map((feature, idx) => {
                    const isImgLeft = feature.imagePosition === 'left';
                    const imgBlock = (
                      <Column
                        key="img"
                        dir="ltr"
                        className="mob-block mob-w-full mob-max-w-full w-[320px] max-w-[320px] align-top"
                      >
                        <Img
                          src={feature.imageSrc}
                          alt={feature.imageAlt}
                          width={320}
                          className="mob-max-w-full block w-full max-w-[320px] rounded-[8px]"
                        />
                      </Column>
                    );
                    const textBlock = (
                      <Column
                        key="txt"
                        dir="ltr"
                        className="mob-block mob-w-full mob-pt-8 mob-max-w-full text-left align-top"
                      >
                        <Section className="mob-py-6 py-[40px]">
                          <Text className="mob-pr-0 mob-max-w-full text-fg m-0 pr-[32px] font-sans text-[20px] font-bold leading-[26px]">
                            {feature.title}
                          </Text>
                          <Text className="mob-max-w-full font-15 text-fg-2 m-0 mt-[16px] font-sans">
                            {feature.body}
                          </Text>
                          <Section className="mt-[16px]">
                            <Link href={url} className="font-15 text-link font-sans">
                              {feature.ctaLabel}
                            </Link>
                          </Section>
                        </Section>
                      </Column>
                    );
                    const gap = <Column key="gap" className="mob-hidden w-[24px]" />;
                    return (
                      <Section key={idx} className={idx > 0 ? 'mob-mt-10 mt-[64px]' : ''}>
                        {/* Image is always first in the markup so phones stack image → text.
                            dir="rtl" on the row mirrors the columns on desktop (image on the right);
                            each column resets to ltr so its content reads normally. */}
                        <Row className="align-top" dir={isImgLeft ? 'ltr' : 'rtl'}>
                          {imgBlock}
                          {gap}
                          {textBlock}
                        </Row>
                      </Section>
                    );
                  })}
                </Section>
              </Section>

              <Section className="mob-px-6 mob-pt-12 mob-pb-10 mt-[80px] px-[40px]">
                <Section className="mob-panel bg-bg-3 border-brand border-0 border-t-[4px] border-solid px-[40px] py-[80px] text-center">
                  <Text className="text-fg-inverted font-heading text-center text-[36px] leading-[1.2] tracking-[-0.2px]">
                    Your city has more to discover
                  </Text>
                  <Text className="font-20 text-fg-inverted mt-[24px] text-center font-sans">
                    Start with a service you need or follow your curiosity. Your next great local
                    find could be just around the corner.
                  </Text>
                  <Section className="mt-[28px]">
                    <Link
                      href={url}
                      className="bg-brand text-fg-inverted font-15 rounded-[999px] px-[24px] py-[14px] font-sans font-semibold"
                    >
                      Start Exploring
                    </Link>
                  </Section>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="mob-px-6 border-stroke mt-12 border-t px-[40px] pb-[64px] pt-[80px]">
                <Text className="font-13 text-fg-3 m-0 max-w-[320px] font-sans">
                  {companyName} helps you discover and connect with independent service providers
                  across food, fashion, wellness, home and beauty.
                </Text>
                <Row align="left">
                  <Column className="w-full align-top">
                    <Section align="left" className="mt-8 w-[152px]">
                      <Row align="left">
                        <Column className="w-[20px] pr-6">
                          <Link href={url} className="inline-block">
                            <Img
                              src={image('social-instagram-deep-orange.png')}
                              alt="Instagram"
                              width="20"
                              height="20"
                              className="block"
                            />
                          </Link>
                        </Column>
                        <Column className="w-[20px] pr-6">
                          <Link href={url} className="inline-block">
                            <Img
                              src={image('social-tiktok-deep-orange.png')}
                              alt="TikTok"
                              width="20"
                              height="20"
                              className="block"
                            />
                          </Link>
                        </Column>
                        <Column className="w-[20px] pr-6">
                          <Link href={url} className="inline-block">
                            <Img
                              src={image('social-x-deep-orange.png')}
                              alt="X"
                              width="20"
                              height="20"
                              className="block"
                            />
                          </Link>
                        </Column>
                        <Column className="w-[20px]">
                          <Link href={url} className="inline-block">
                            <Img
                              src={image('social-linkedin-deep-orange.png')}
                              alt="LinkedIn"
                              width="20"
                              height="20"
                              className="block"
                            />
                          </Link>
                        </Column>
                      </Row>
                    </Section>
                  </Column>
                </Row>
                <Row align="left">
                  <Column className="w-full pt-8 align-top">
                    <Text className="font-11 text-fg-3 m-0 font-sans">
                      {company.legalName}
                      <br />
                      {company.address}
                    </Text>
                  </Column>
                </Row>
                <Row align="left">
                  <Column className="w-full pt-5 align-top">
                    <Text className="font-11 text-fg-3 m-0 max-w-[169px] font-sans">
                      <Link href={company.unsubscribeUrl} className="text-link">
                        Unsubscribe
                      </Link>{' '}
                      from {companyName} marketing emails.
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

Template22.PreviewProps = {
  companyName: 'TheUrbanNet',
  url: company.websiteUrl,
} satisfies TemplateProps;

export default Template22;
