import { useLocation } from 'wouter';

import { Progress } from '../Progress/Progress';
import { Container } from '../base/container/Container';
import { Text } from '../base/text/Text';
import { Button } from '../base/button/Button';
import { Icon } from '../base/icon/Icon';

import styles from './styles.module.scss';

interface GoalBannerProps {
  documentsCount: number;
}

export function GoalBanner({ documentsCount }: GoalBannerProps) {
  const progressCount = Math.min(documentsCount, 5);
  const isGoalMet = progressCount >= 5;
  const [, navigate] = useLocation();
  if (isGoalMet) {
    return null;
  }
  return (
    <Container
      as="section"
      direction="column"
      gap="32px"
      align="center"
      className={styles.banner}
    >
      <Container
        align="center"
        direction="column"
        gap="16px"
        className={styles.content}
      >
        <Text size="large" color="primary" as="h2">
          Hit your goal
        </Text>
        <Text size="regular" color="secondary">
          Generate and send out a couple more job applications today to get
          hired faster.
        </Text>
        <Button size="medium" onClick={() => navigate('/create')}>
          <Icon name="plus" />
          Create New
        </Button>
      </Container>
      <Container align="center" direction="column" gap="8px">
        <Progress style="pills" current={progressCount} total={5} gap={8} />
        <Text size="regular" color="secondary">
          {progressCount} out of 5
        </Text>
      </Container>
    </Container>
  );
}
