// 05 / The atelier — customer edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/atelier.tsx.
import { Atelier } from '../../src/waitlist/designs/atelier';
import type { DesignProps } from '../../src/waitlist/parts';

export default function AtelierCustomer(props: DesignProps) {
  return <Atelier {...props} edition="customer" />;
}

AtelierCustomer.PreviewProps = {} satisfies DesignProps;
