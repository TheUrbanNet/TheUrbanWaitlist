// 02 / The lookbook — provider edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/lookbook.tsx.
import { Lookbook } from '../../src/waitlist/designs/lookbook';
import type { DesignProps } from '../../src/waitlist/parts';

export default function LookbookProvider(props: DesignProps) {
  return <Lookbook {...props} edition="provider" />;
}

LookbookProvider.PreviewProps = {} satisfies DesignProps;
