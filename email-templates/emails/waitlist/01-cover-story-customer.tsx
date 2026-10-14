// 01 / Cover story — customer edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/cover-story.tsx.
import { CoverStory } from '../../src/waitlist/designs/cover-story';
import type { DesignProps } from '../../src/waitlist/parts';

export default function CoverStoryCustomer(props: DesignProps) {
  return <CoverStory {...props} edition="customer" />;
}

CoverStoryCustomer.PreviewProps = {} satisfies DesignProps;
