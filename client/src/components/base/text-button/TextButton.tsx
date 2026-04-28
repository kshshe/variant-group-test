import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TTextButtonProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
    className?: string;
  }
>;

export const TextButton = ({
  children,
  className,
  type = 'button',
  ...props
}: TTextButtonProps) => (
  <button
    className={classNames(styles.button, className)}
    type={type}
    {...props}
  >
    {children}
  </button>
);
