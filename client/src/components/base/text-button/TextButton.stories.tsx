import type { Story } from '@ladle/react';

import '../global.scss';
import { Icon } from '../icon/Icon';
import { TextButton } from './TextButton';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
} as const;

export const Variants: Story = () => (
  <div style={layoutStyle}>
    <TextButton>Skip for now</TextButton>
    <TextButton>
      <Icon name="plus" />
      Add section
    </TextButton>
  </div>
);
