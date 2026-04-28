import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type PageProps = React.PropsWithChildren<
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>
>;

export const Page = ({ children, className, ...props }: PageProps) => {
  return (
    <div className={classNames(styles.page, className)} {...props}>
      {children}
    </div>
  );
};
