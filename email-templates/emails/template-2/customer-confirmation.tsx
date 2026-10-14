// Customer waitlist confirmation. Built from template-2.2 (the reference template): the header,
// brown feature box and footer match it, minus the unsubscribe line (this is not a marketing
// email). Starting copy from lib/emails/confirmation.js.

import {
  Body,
  Button,
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

interface CustomerConfirmationProps {
  companyName: string;
  url: string;
  firstName?: string;
}

export const CustomerConfirmation = ({
  companyName,
  url,
  firstName,
}: CustomerConfirmationProps) => {
  // Same rule as confirmation.js: first word of the name, or "there" if it's missing.
  const greetingName = firstName?.trim().split(/\s+/)[0] || 'there';

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
          <Preview>Thanks for joining. We’ll email you when {companyName} launches.</Preview>
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

              <Section className="mob-px-6 px-[40px] pt-[48px]">
                <Text className="mob-max-w-full font-display mob-font-display text-fg font-heading m-0 break-words [text-wrap:balance]">
                  Hi {greetingName}, you’re on the list
                </Text>
                <Text className="mob-max-w-full font-15 text-fg-2 m-0 mt-[24px] max-w-[480px] font-sans">
                  Thanks for joining {companyName}. We’re building one place to find trusted local
                  providers for food, fashion, wellness, home and beauty.
                </Text>
              </Section>

              <Section className="bg-bg-2 mt-[48px]">
                <Img
                  src={image('customer-providers-welcome-hero.jpg')}
                  alt="Real people. Real services. Real easy. A woman walks down an orange-carpeted corridor as a chef, a stylist, a fitness coach and a barber smile from their doorways."
                  width={640}
                  className="mob-max-w-full block w-full max-w-[640px]"
                />
              </Section>

              <Section className="mob-px-6 px-[40px] pt-[48px]">
                <Row className="align-top">
                  <Column className="mob-block mob-w-full mob-max-w-full w-[320px] max-w-[320px] align-top">
                    <Img
                      src={image('feature-2-explore.jpg')}
                      alt="More than a directory: the TheUrbanNet app on a phone, showing recommended trends by category, including wellness, home, beauty and fashion"
                      width={320}
                      className="mob-max-w-full block w-full max-w-[320px] rounded-[8px]"
                    />
                  </Column>
                  <Column className="mob-hidden w-[24px]" />
                  <Column className="mob-block mob-w-full mob-max-w-full text-left align-top">
                    <Section className="pt-[24px]">
                      <Text className="text-fg m-0 font-sans text-[20px] font-bold leading-[26px]">
                        What happens next
                      </Text>
                      <Text className="font-15 text-fg-2 m-0 mt-[24px] font-sans">
                        We’ll email you as soon as we launch, so you can be one of the first to
                        explore.
                      </Text>
                      <Text className="font-15 text-fg-2 m-0 mt-[16px] font-sans">
                        There’s nothing else you need to do for now.
                      </Text>
                    </Section>
                  </Column>
                </Row>
              </Section>

              <Section className="mob-px-6 mob-pb-10 mt-[48px] px-[40px]">
                <Section className="mob-panel bg-bg-3 border-brand border-0 border-t-[4px] border-solid px-[40px] py-[80px] text-center">
                  <Text className="text-fg-inverted font-heading m-0 break-words text-center text-[44px] leading-[1.1] tracking-[-0.2px] [text-wrap:balance]">
                    Save the providers you love
                  </Text>
                  <Text className="font-15 text-fg-inverted m-0 mt-[24px] text-center font-sans">
                    Tap the heart on any profile to keep it in your favourites. We’ll send a gentle
                    reminder when it’s time to book again.
                  </Text>
                  <Section className="mt-[28px]">
                    <Button
                      href={url}
                      className="bg-brand text-fg-inverted font-15 rounded-[999px] px-[24px] py-[14px] font-sans font-semibold"
                    >
                      Explore {companyName}
                    </Button>
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
              </Section>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

CustomerConfirmation.PreviewProps = {
  companyName: 'TheUrbanNet',
  url: company.websiteUrl,
  firstName: 'Mitchell',
} satisfies CustomerConfirmationProps;

export default CustomerConfirmation;
