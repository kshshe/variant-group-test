import type { Story } from '@ladle/react';

import '../global.scss';
import { Container } from './Container';

const boxStyle = {
  padding: '12px 16px',
  border: '1px solid #D0D5DD',
  borderRadius: '6px',
  backgroundColor: '#F9FAFB',
} as const;

const sectionStyle = {
  display: 'grid',
  gap: '16px',
} as const;

const storyStyle = {
  padding: '24px',
  backgroundColor: '#F2F4F7',
  borderRadius: '12px',
} as const;

export const Variants: Story = () => (
  <div style={sectionStyle}>
    <div style={storyStyle}>
      <Container justify="between" direction="row" style={{ width: '420px' }}>
        <div style={boxStyle}>Left</div>
        <div style={boxStyle}>Right</div>
      </Container>
    </div>

    <div style={storyStyle}>
      <Container direction="row" gap="12px">
        <div style={boxStyle}>One</div>
        <div style={boxStyle}>Two</div>
        <div style={boxStyle}>Three</div>
      </Container>
    </div>

    <div style={storyStyle}>
      <Container direction="column" gap="12px">
        <div style={boxStyle}>Top</div>
        <div style={boxStyle}>Middle</div>
        <div style={boxStyle}>Bottom</div>
      </Container>
    </div>
  </div>
);
