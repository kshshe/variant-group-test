import LoadingIcon from './loading.svg?react';

import styles from './styles.module.scss';

export function CreateApplicationLoader() {
  return (
    <div className={styles.loadingPlaceholder}>
      <LoadingIcon className={styles.loadingIcon} />
    </div>
  );
}
