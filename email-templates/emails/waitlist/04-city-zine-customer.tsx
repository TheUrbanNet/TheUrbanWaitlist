// 04 / City zine — customer edition. Recreated from the CEO's inspiration board; layout in src/waitlist/designs/city-zine.tsx.
import { CityZine } from '../../src/waitlist/designs/city-zine';
import type { DesignProps } from '../../src/waitlist/parts';

export default function CityZineCustomer(props: DesignProps) {
  return <CityZine {...props} edition="customer" />;
}

CityZineCustomer.PreviewProps = {} satisfies DesignProps;
