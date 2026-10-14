// 03 / Backstage pass — customer edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/backstage-pass.tsx.
import { BackstagePass } from '../../src/waitlist/designs/backstage-pass';
import type { DesignProps } from '../../src/waitlist/parts';

export default function BackstagePassCustomer(props: DesignProps) {
  return <BackstagePass {...props} edition="customer" />;
}

BackstagePassCustomer.PreviewProps = {} satisfies DesignProps;
