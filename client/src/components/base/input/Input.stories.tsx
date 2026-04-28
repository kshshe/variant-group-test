import React from 'react';
import type { Story } from '@ladle/react';

import '../global.scss';
import { Input } from './Input';

const inputWrapStyle = {
  width: '320px',
  maxWidth: '100%',
} as const;

const textareaWrapStyle = {
  width: '420px',
  maxWidth: '100%',
} as const;

export const TextInput: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={inputWrapStyle}>
      <Input
        onChange={setValue}
        placeholder="Enter application title"
        value={value}
      />
    </div>
  );
};

export const TextareaInput: Story = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={textareaWrapStyle}>
      <Input
        onChange={setValue}
        placeholder="Write a short description"
        rows={5}
        type="textarea"
        value={value}
      />
    </div>
  );
};

export const ErrorInput: Story = () => {
  const [value, setValue] = React.useState('Broken value');

  return (
    <div style={inputWrapStyle}>
      <Input
        error
        onChange={setValue}
        placeholder="Enter application title"
        value={value}
      />
    </div>
  );
};
