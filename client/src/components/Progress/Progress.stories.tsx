import type { Story } from '@ladle/react';

import '../base/global.scss';
import { Progress } from './Progress';

const sectionStyle = {
  display: 'grid',
  gap: '24px',
} as const;

const rowStyle = {
  display: 'grid',
  gap: '12px',
} as const;

const labelStyle = {
  color: 'var(--secondary-text-color)',
  fontSize: '14px',
} as const;

export const Variants: Story = () => (
  <div style={sectionStyle}>
    <div style={rowStyle}>
      <span style={labelStyle}>Dots</span>
      <Progress style="dots" current={2} total={5} gap={8} />
    </div>

    <div style={rowStyle}>
      <span style={labelStyle}>Pills</span>
      <Progress style="pills" current={3} total={5} gap={8} />
    </div>
  </div>
);
