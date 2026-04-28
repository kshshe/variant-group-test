import React from 'react';
import classNames from 'classnames';

import { Input, type TInputProps } from '../input/Input';
import styles from './styles.module.scss';

type TFieldProps = TInputProps & {
  bottomLabel?: string;
  label: string;
};

export const Field = ({
  bottomLabel,
  error = false,
  id,
  label,
  ...props
}: TFieldProps) => {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <Input {...props} error={error} id={fieldId} />
      {bottomLabel ? (
        <div
          className={classNames(styles.bottomLabel, {
            [styles.error]: error,
          })}
        >
          {bottomLabel}
        </div>
      ) : null}
    </div>
  );
};
