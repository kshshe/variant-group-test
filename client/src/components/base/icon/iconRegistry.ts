import CopyIcon from './icons/copy.svg?react';
import HomeIcon from './icons/home.svg?react';
import LoaderIcon from './icons/loader.svg?react';
import PlusIcon from './icons/plus.svg?react';
import RepeatIcon from './icons/repeat.svg?react';
import TrashIcon from './icons/trash.svg?react';
import CheckIcon from './icons/check.svg?react';

export const ICONS = {
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
