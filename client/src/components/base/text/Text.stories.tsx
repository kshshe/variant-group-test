import type { Story } from '@ladle/react';

import '../global.scss';
import { Text } from './Text';

const sectionStyle = {
  display: 'grid',
  gap: '16px',
} as const;

const rowStyle = {
  display: 'grid',
  gap: '8px',
} as const;

export const Variants: Story = () => (
  <div style={sectionStyle}>
    <div style={rowStyle}>
      <Text as="h1" color="primary" size="xlarge">
        XLarge Primary Text
      </Text>
      <Text as="h2" color="primary" size="large">
        Large Primary Text
      </Text>
      <Text as="p" color="primary" size="regular">
        Regular Primary Text
      </Text>
    </div>

    <div style={rowStyle}>
      <Text as="h1" color="secondary" size="xlarge">
        XLarge Secondary Text
      </Text>
      <Text as="h2" color="secondary" size="large">
        Large Secondary Text
      </Text>
      <Text as="p" color="secondary" size="regular">
        Regular Secondary Text
      </Text>
    </div>
  </div>
);
