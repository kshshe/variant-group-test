import classNames from 'classnames';

import styles from './styles.module.scss';

interface TitleGapProps {
  size?: 'small' | 'medium';
}

export function TitleGap({ size = 'medium' }: TitleGapProps) {
  return <div className={classNames(styles.titleGap, styles[size])} />;
}
