// 04 / City zine — provider edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/city-zine.tsx.
import { CityZine } from '../../src/waitlist/designs/city-zine';
import type { DesignProps } from '../../src/waitlist/parts';

export default function CityZineProvider(props: DesignProps) {
  return <CityZine {...props} edition="provider" />;
}

CityZineProvider.PreviewProps = {} satisfies DesignProps;
