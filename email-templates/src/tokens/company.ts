/**
 * Company details shared by every template (footer legal line, links).
 * `{{unsubscribeUrl}}` is a placeholder the backend replaces at send time.
 */
export const company = {
  name: 'TheUrbanNet',
  legalName: 'TheUrbanNet LTD is a company registered in Scotland (No. SC867664)',
  /* Registered office address. Left empty until a registered office service
     is in place; footers hide the line while it is empty. */
  address: '',
  websiteUrl: 'https://theurbannet.com',
  providerUrl: 'https://provider.theurbannet.com/',
  unsubscribeUrl: '{{unsubscribeUrl}}',
} as const;
