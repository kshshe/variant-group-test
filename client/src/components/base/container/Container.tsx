import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type TContainerAlign = 'center' | 'end' | 'start';
type TContainerJustify = 'between' | 'center' | 'end' | 'start';
type TContainerDirection = 'column' | 'row';

type TContainerProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
    align?: TContainerAlign;
    justify?: TContainerJustify;
    className?: string;
    direction?: TContainerDirection;
    gap?: number | string;
    as?: React.ElementType;
  }
>;

export const Container = ({
  align = 'start',
  as = 'div',
  children,
  className,
  justify = 'start',
  direction = 'row',
  gap,
  style,
  ...props
}: TContainerProps) => {
  const Component = as as React.ElementType;

  return (
    <Component
      className={classNames(
        styles.container,
        className,
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        styles[direction],
      )}
      style={{
        ...style,
        gap,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
