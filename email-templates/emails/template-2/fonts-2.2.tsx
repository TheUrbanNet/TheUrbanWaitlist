import { Font } from 'react-email';

/** Latin subsets (Instrument Serif ships a single 400 weight; Manrope is variable). */
const instrumentSerifWoff2 =
  'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2';
const manropeWoff2 = 'https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2';

/**
 * Template 2.2 fonts — Instrument Serif (headings) + Manrope (body, the website's font).
 * Web fonts load in Apple Mail / iOS Mail; Gmail and Outlook fall back to Georgia / Helvetica.
 * Manrope is declared last so it is the document default.
 */
export function Template22Fonts() {
  return (
    <>
      <Font
        fontFamily="Instrument Serif"
        fallbackFontFamily={['Georgia', 'serif']}
        webFont={{ url: instrumentSerifWoff2, format: 'woff2' }}
        fontWeight={400}
        fontStyle="normal"
      />
      {[400, 600, 700].map((weight) => (
        <Font
          key={`manrope-${weight}`}
          fontFamily="Manrope"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{ url: manropeWoff2, format: 'woff2' }}
          fontWeight={weight}
          fontStyle="normal"
        />
      ))}
    </>
  );
}

/**
 * Phone size for the serif display headings. Instrument Serif is far narrower than
 * Space Grotesk, so it holds 56px on a phone (template-2's shared rule shrinks to 44px).
 * Rendered after template2MobileStyles so it wins.
 */
export const template22MobileStyles = `
  @media (max-width: 600px) {
    .mob-font-display { font-size: 56px !important; line-height: 1 !important; letter-spacing: -0.36px !important; }
  }
`;
