import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TButtonProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
    className?: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    fullWidth?: boolean;
    iconOnly?: boolean;
    size?: 'small' | 'medium' | 'large';
  }
>;

export const Button = ({
  className,
  color = 'primary',
  disabled = false,
  fullWidth = false,
  iconOnly = false,
  size = 'medium',
  children,
  ...props
}: TButtonProps) => (
  <button
    className={classNames(
      styles.button,
      className,
      styles[color],
      styles[size],
      {
        [styles.disabled]: disabled,
        [styles.fullWidth]: fullWidth,
        [styles.iconOnly]: iconOnly,
      },
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
