// 03 / Backstage pass — provider edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/backstage-pass.tsx.
import { BackstagePass } from '../../src/waitlist/designs/backstage-pass';
import type { DesignProps } from '../../src/waitlist/parts';

export default function BackstagePassProvider(props: DesignProps) {
  return <BackstagePass {...props} edition="provider" />;
}

BackstagePassProvider.PreviewProps = {} satisfies DesignProps;
