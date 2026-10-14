// 02 / The lookbook — customer edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/lookbook.tsx.
import { Lookbook } from '../../src/waitlist/designs/lookbook';
import type { DesignProps } from '../../src/waitlist/parts';

export default function LookbookCustomer(props: DesignProps) {
  return <Lookbook {...props} edition="customer" />;
}

LookbookCustomer.PreviewProps = {} satisfies DesignProps;
