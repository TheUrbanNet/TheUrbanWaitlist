// 01 / Cover story — provider edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/cover-story.tsx.
import { CoverStory } from '../../src/waitlist/designs/cover-story';
import type { DesignProps } from '../../src/waitlist/parts';

export default function CoverStoryProvider(props: DesignProps) {
  return <CoverStory {...props} edition="provider" />;
}

CoverStoryProvider.PreviewProps = {} satisfies DesignProps;
