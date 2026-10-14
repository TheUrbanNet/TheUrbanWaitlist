// 05 / The atelier — provider edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/atelier.tsx.
import { Atelier } from '../../src/waitlist/designs/atelier';
import type { DesignProps } from '../../src/waitlist/parts';

export default function AtelierProvider(props: DesignProps) {
  return <Atelier {...props} edition="provider" />;
}

AtelierProvider.PreviewProps = {} satisfies DesignProps;
