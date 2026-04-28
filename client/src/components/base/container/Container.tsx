import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TContainerAlign = 'between' | 'center' | 'end' | 'start';
type TContainerDirection = 'column' | 'row';

type TContainerProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
    align?: TContainerAlign;
    className?: string;
    direction?: TContainerDirection;
    gap?: number | string;
  }
>;

export const Container = ({
  align = 'start',
  children,
  className,
  direction = 'row',
  gap,
  style,
  ...props
}: TContainerProps) => (
  <div
    className={classNames(
      styles.container,
      className,
      styles[align],
      styles[direction],
    )}
    style={{
      ...style,
      gap,
    }}
    {...props}
  >
    {children}
  </div>
);
