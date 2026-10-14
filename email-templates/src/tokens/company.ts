/**
 * Company details shared by every template (footer legal line, links).
 * `{{unsubscribeUrl}}` is a placeholder the backend replaces at send time.
 */
export const company = {
  name: 'TheUrbanNet',
  legalName: 'UrbanNet is a company registered in Scotland (No.09446231)',
  address: 'Broadwalk House, 5 Appold Street, London EC2A 2AG',
  websiteUrl: 'https://theurbannet.com',
  providerUrl: 'https://provider.theurbannet.com/',
  unsubscribeUrl: '{{unsubscribeUrl}}',
} as const;
