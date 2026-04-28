import { Container } from '../base/container/Container';
import styles from './styles.module.scss';
import classNames from 'classnames';

type TProgressProps = {
  style: 'dots' | 'pills';
  current: number;
  total: number;
  gap: number;
};

export const Progress = ({ style, current, total, gap }: TProgressProps) => {
  return (
    <Container direction="row" gap={gap} align="center">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={classNames(
            styles.baseItem,
            {
              [styles.dot]: style === 'dots',
              [styles.pill]: style === 'pills',
            },
            { [styles.completed]: index < current },
          )}
        />
      ))}
    </Container>
  );
};
