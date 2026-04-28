import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TBaseInputProps = {
  className?: string;
  error?: boolean;
  onChange: (text: string) => void;
  value: string;
};

type TTextInputProps = TBaseInputProps &
  Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'children' | 'onChange' | 'type' | 'value'
  > & {
    type?: 'input';
  };

type TTextareaInputProps = TBaseInputProps &
  Omit<
    React.ComponentPropsWithoutRef<'textarea'>,
    'children' | 'onChange' | 'value'
  > & {
    type: 'textarea';
  };

export type TInputProps = TTextInputProps | TTextareaInputProps;

export const Input = (props: TInputProps) => {
  const { className, error = false, onChange, value } = props;

  if (props.type === 'textarea') {
    const {
      className: _className,
      onChange: _onChange,
      type: _type,
      value: _value,
      ...textareaProps
    } = props;

    return (
      <textarea
        {...textareaProps}
        aria-invalid={error}
        className={classNames(styles.field, styles.textarea, className, {
          [styles.error]: error,
        })}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    );
  }

  const {
    className: _className,
    onChange: _onChange,
    type: _type,
    value: _value,
    ...inputProps
  } = props;

  return (
    <input
      {...inputProps}
      aria-invalid={error}
      className={classNames(styles.field, className, {
        [styles.error]: error,
      })}
      onChange={(event) => onChange(event.target.value)}
      type="text"
      value={value}
    />
  );
};
