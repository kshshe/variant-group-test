import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TTextElement = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
type TTextColor = 'primary' | 'secondary';
type TTextSize = 'large' | 'regular' | 'xlarge';

type TTextProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> & {
    as?: TTextElement;
    className?: string;
    color?: TTextColor;
    size?: TTextSize;
  }
>;

export const Text = ({
  as = 'span',
  children,
  className,
  color = 'primary',
  size = 'regular',
  ...props
}: TTextProps) => {
  const Component = as as React.ElementType;

  return (
    <Component
      className={classNames(
        styles.text,
        className,
        styles[color],
        styles[size],
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
