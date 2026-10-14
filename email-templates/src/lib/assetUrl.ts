/**
 * Build URLs for static email images.
 *
 * The preview server (`npm run dev`) serves `emails/static/` at `/static/...`.
 * For real sends, set EMAIL_ASSET_BASE_URL to the CDN origin that hosts the same
 * `static/` folder before rendering, e.g. EMAIL_ASSET_BASE_URL=https://cdn.example.com
 */
declare const process: { env?: { EMAIL_ASSET_BASE_URL?: string } } | undefined;

const BASE_URL =
  typeof process !== 'undefined' && process?.env?.EMAIL_ASSET_BASE_URL
    ? process.env.EMAIL_ASSET_BASE_URL.replace(/\/$/, '')
    : '';

export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}
