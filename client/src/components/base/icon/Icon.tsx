import React from 'react';
import classNames from 'classnames';

import CopyIcon from './icons/copy.svg?react';
import HomeIcon from './icons/home.svg?react';
import LoaderIcon from './icons/loader.svg?react';
import PlusIcon from './icons/plus.svg?react';
import RepeatIcon from './icons/repeat.svg?react';
import TrashIcon from './icons/trash.svg?react';
import CheckIcon from './icons/check.svg?react';
import styles from './styles.module.scss';

const ICONS = {
  copy: CopyIcon,
  home: HomeIcon,
  loader: LoaderIcon,
  plus: PlusIcon,
  repeat: RepeatIcon,
  trash: TrashIcon,
  check: CheckIcon,
} as const;

export type TIconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as TIconName[];

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
