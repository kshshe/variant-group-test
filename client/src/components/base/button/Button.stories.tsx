import type { Story } from '@ladle/react';

import { Icon } from '../icon/Icon';
import { Button } from './Button';
import '../global.scss';

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
} as const;

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '16px',
} as const;

const fullWidthWrapStyle = {
  display: 'grid',
  gap: '16px',
  width: '320px',
  maxWidth: '100%',
} as const;

export const AllButtons: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div style={sectionStyle}>
      <strong>With Content</strong>
      <div style={sectionStyle}>
        <div style={rowStyle}>
          <Button size="small">
            <Icon name="copy" />
            Small Button
          </Button>
          <Button size="medium">
            <Icon name="home" />
            Medium Button
          </Button>
          <Button size="large">
            <Icon name="loader" size="large" />
            Large Button
          </Button>
        </div>
        <div style={rowStyle}>
          <Button color="secondary" size="small">
            <Icon name="plus" />
            Small Button
          </Button>
          <Button color="secondary" size="medium">
            <Icon name="repeat" />
            Medium Button
          </Button>
          <Button color="secondary" size="large">
            <Icon name="trash" size="large" />
            Large Button
          </Button>
        </div>
      </div>
    </div>

    <div style={sectionStyle}>
      <strong>Icon Only</strong>
      <div style={rowStyle}>
        <Button aria-label="Add" iconOnly size="small">
          <Icon name="plus" />
        </Button>
        <Button aria-label="Add" iconOnly size="small" color="secondary">
          <Icon name="plus" />
        </Button>
        <Button aria-label="Copy" iconOnly size="medium">
          <Icon name="copy" />
        </Button>
        <Button aria-label="Home" color="secondary" iconOnly size="medium">
          <Icon name="copy" />
        </Button>
        <Button aria-label="Refresh" iconOnly size="large">
          <Icon name="trash" size="large" />
        </Button>
        <Button aria-label="Delete" color="secondary" iconOnly size="large">
          <Icon name="trash" size="large" />
        </Button>
      </div>
    </div>

    <div style={sectionStyle}>
      <strong>Full Width</strong>
      <div style={fullWidthWrapStyle}>
        <Button fullWidth>
          <Icon name="plus" />
          Generate Now
        </Button>
        <Button color="secondary" fullWidth>
          <Icon name="repeat" />
          Try Again
        </Button>
      </div>
    </div>

    <div style={sectionStyle}>
      <strong>Disabled</strong>
      <div style={rowStyle}>
        <Button disabled size="small">
          <Icon name="copy" />
          Small Button
        </Button>
        <Button color="secondary" disabled size="medium">
          <Icon name="repeat" />
          Medium Button
        </Button>
        <Button
          aria-label="Delete"
          color="secondary"
          disabled
          iconOnly
          size="large"
        >
          <Icon name="trash" size="large" />
        </Button>
      </div>
    </div>
  </div>
);
