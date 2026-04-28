import type { Story } from '@ladle/react';

import '../global.scss';
import { ICON_NAMES, Icon } from './Icon';

export const AllIcons: Story = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px',
    }}
  >
    {ICON_NAMES.map((name) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          padding: '12px',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
        }}
      >
        <strong>{name}</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon name={name} size="small" />
          <Icon name={name} size="large" />
        </div>
      </div>
    ))}
  </div>
);

export const ColoredIcons: Story = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      color: '#4F46E5',
    }}
  >
    <Icon name="copy" />
    <Icon name="plus" />
    <Icon name="repeat" size="large" />
    <Icon name="trash" />
  </div>
);
