import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { ICONS, type TIconName } from './iconRegistry';

type TIconSize = 'small' | 'large';

type TIconProps = Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> & {
  name: TIconName;
  size?: TIconSize;
};

export const Icon = ({
  className,
  name,
  size = 'small',
  ...props
}: TIconProps) => {
  const SvgIcon = ICONS[name];

  return (
    <span
      aria-hidden="true"
      className={classNames(styles.icon, className, {
        [styles.small]: size === 'small',
        [styles.large]: size === 'large',
      })}
      {...props}
    >
      <SvgIcon className={styles.content} />
    </span>
  );
};
