import { useLocation } from 'wouter';
import Logo from './logo.svg?react';

import { Container } from '../base/container/Container';
import { Text } from '../base/text/Text';
import { Button } from '../base/button/Button';
import { Icon } from '../base/icon/Icon';
import { Progress } from '../Progress/Progress';

interface AppHeaderProps {
  documentsCount: number;
}

export function AppHeader({ documentsCount }: AppHeaderProps) {
  const progressCount = Math.min(documentsCount, 5);
  const [, navigate] = useLocation();

  return (
    <Container
      as="header"
      justify="between"
      align="center"
      direction="row"
      gap="12px"
    >
      <Logo />
      <Container justify="between" align="center" direction="row" gap="16px">
        <Text size="regular" color="secondary">
          {progressCount}/5 applications generated
        </Text>
        <Progress style="dots" current={progressCount} total={5} gap={4} />
        <Button
          size="small"
          color="secondary"
          iconOnly
          onClick={() => navigate('/')}
        >
          <Icon name="home" />
        </Button>
      </Container>
    </Container>
  );
}
