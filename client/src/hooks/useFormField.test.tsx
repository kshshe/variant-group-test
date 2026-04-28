import { act } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { useFormField } from './useFormField';

type RenderedField = ReturnType<typeof useFormField>;

function HookHarness({
  onRender,
}: {
  onRender: (field: RenderedField) => void;
}) {
  const field = useFormField({
    rules: [
      {
        validate: (value) => value.trim().length > 0,
        message: 'Job title is required.',
      },
    ],
    validateOnChange: true,
  });

  onRender(field);

  return null;
}

describe('useFormField', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let latestField: RenderedField | null = null;

  function renderHook() {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(
        <HookHarness
          onRender={(field) => {
            latestField = field;
          }}
        />,
      );
    });
  }

  afterEach(() => {
    act(() => {
      root?.unmount();
    });

    latestField = null;
    root = null;
    container?.remove();
    container = null;
  });

  it('marks the field as touched and exposes the first validation error', () => {
    renderHook();

    expect(latestField?.isTouched).toBe(false);
    expect(latestField?.error).toBeNull();

    act(() => {
      latestField?.validate();
    });

    expect(latestField?.isTouched).toBe(true);
    expect(latestField?.error).toBe('Job title is required.');
    expect(latestField?.errors).toEqual(['Job title is required.']);
  });

  it('revalidates on change when validateOnChange is enabled', () => {
    renderHook();

    act(() => {
      latestField?.validate();
    });

    act(() => {
      latestField?.inputProps.onChange('Product manager');
    });

    expect(latestField?.value).toBe('Product manager');
    expect(latestField?.isDirty).toBe(true);
    expect(latestField?.error).toBeNull();
    expect(latestField?.errors).toEqual([]);
  });
});
