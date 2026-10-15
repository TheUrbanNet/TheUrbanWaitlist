import type { ReactNode } from 'react';
import { Body, Button, Container, Font, Head, Html, Img, Preview, Section, Tailwind, Text } from 'react-email';
import { assetUrl } from '../lib/assetUrl';
import { waitlistMobileStyles, waitlistTailwindConfig } from './theme';

export type Edition = 'customer' | 'provider';

export interface DesignProps {
  url?: string;
}

export const waitlistUrl = 'https://waitlist.theurbannet.com/LandingPage/waitlist';

export const image = (file: string) => assetUrl(`/static/waitlist/${file}`);

/**
 * Web fonts load in Apple Mail and iOS Mail; Gmail and Outlook fall back to Helvetica,
 * Georgia and Times. Inter is declared last because React Email makes the last Font the
 * page default (a `*` rule), which also means every <span> must name its own font class.
 */
function Fonts() {
  return (
    <>
      <Font
        fontFamily="Instrument Serif"
        fallbackFontFamily={['Georgia', 'serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Instrument Serif"
        fallbackFontFamily={['Georgia', 'serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="italic"
      />
      {[400, 600, 800, 900].map((weight) => (
        <Font
          key={weight}
          fontFamily="Inter"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
            format: 'woff2',
          }}
          fontWeight={weight}
          fontStyle="normal"
        />
      ))}
    </>
  );
}

/** Page frame. `page` is the colour around the email, `paper` the email itself. */
export function Shell({
  page = 'bg-paper-cover',
  paper,
  preview,
  children,
}: {
  page?: string;
  paper: string;
  preview: string;
  children: ReactNode;
}) {
  return (
    <Tailwind config={waitlistTailwindConfig}>
      <Html lang="en">
        <Head>
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
          <Fonts />
          <style>{waitlistMobileStyles}</style>
        </Head>
        <Body className={`m-0 p-0 font-sans ${page}`}>
          <Preview>{preview}</Preview>
          <Container className={`mx-auto w-full max-w-[600px] ${paper}`}>{children}</Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

/**
 * The "TheUrbanNet." text wordmark from the boards: heavy sans, with one word in a second
 * colour. `accent: 'net'` (the boards) colours "Net."; `accent: 'urban'` colours "Urban".
 */
export function Wordmark({
  base = 'text-fg',
  net = 'text-orange',
  size = 'text-[24px]',
  accent = 'net',
}: {
  base?: string;
  net?: string;
  size?: string;
  accent?: 'net' | 'urban';
}) {
  return (
    <Text className={`${base} ${size} m-0 whitespace-nowrap font-sans font-black leading-[1] tracking-[-0.8px]`}>
      {accent === 'urban' ? (
        <>
          The<span className={`${net} font-sans font-black`}>Urban</span>Net.
        </>
      ) : (
        <>
          TheUrban<span className={`${net} font-sans font-black`}>Net.</span>
        </>
      )}
    </Text>
  );
}

/** Small tracked uppercase label (eyebrows, masthead notes). */
export function Label({ className = 'text-orange', children }: { className?: string; children: ReactNode }) {
  return (
    <Text className={`${className} m-0 font-sans text-[10px] font-extrabold uppercase leading-[1.5] tracking-[1.6px]`}>
      {children}
    </Text>
  );
}

/** The boards' square-cornered button: uppercase, tracked, with a ↗. */
export function BlockButton({
  href,
  colours = 'bg-ink text-on-dark',
  children,
}: {
  href: string;
  colours?: string;
  children: ReactNode;
}) {
  return (
    <Button
      href={href}
      className={`${colours} whitespace-nowrap px-[22px] py-[14px] font-sans text-[11px] font-extrabold uppercase leading-[1.2] tracking-[1.2px]`}
    >
      {children} ↗
    </Button>
  );
}

export function Photo({ file, alt, height }: { file: string; alt: string; height: number }) {
  return <Img src={image(file)} alt={alt} width={600} height={height} className="block h-auto w-full max-w-full" />;
}

/** Footer copied from the boards, light or dark. */
export function Footer({ dark = false, border = true }: { dark?: boolean; border?: boolean }) {
  const strong = dark ? 'text-on-dark' : 'text-fg';
  const soft = dark ? 'text-on-dark-2' : 'text-fg-2';
  const faint = dark ? 'text-fg-2' : 'text-fg-3';
  const rule = border ? (dark ? 'border-0 border-t border-solid border-rule-dark' : 'border-0 border-t border-solid border-rule') : '';
  return (
    <Section className={`mob-px-6 px-[32px] pb-[40px] pt-[32px] ${rule}`}>
      <Text className={`${strong} m-0 font-sans text-[11px] font-extrabold leading-[1.5]`}>TheUrbanNet</Text>
      <Text className={`${soft} m-0 font-sans text-[11px] leading-[1.5]`}>Real People. Real Services. Real Easy.</Text>
      <Text className={`${soft} m-0 mt-[20px] font-sans text-[11px] leading-[1.6]`}>
        You’re receiving this because you signed up for TheUrbanNet waitlist. More details are on their way.
      </Text>
      <Text className={`${faint} m-0 font-sans text-[11px] leading-[1.6]`}>
        Preview concept · unsubscribe and contact links to be connected before sending.
      </Text>
    </Section>
  );
}
