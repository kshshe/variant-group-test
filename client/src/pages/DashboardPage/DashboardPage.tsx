import { useLocation } from 'wouter';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { ApplicationList } from '../../components/ApplicationList/ApplicationList';
import { GoalBanner } from '../../components/GoalBanner/GoalBanner';
import type { JobApplicationDocument } from '../../lib/storage/DocumentsStorage';
import { Container } from '../../components/base/container/Container';
import { Text } from '../../components/base/text/Text';
import { Button } from '../../components/base/button/Button';
import { Icon } from '../../components/base/icon/Icon';
import { TitleGap } from '../../components/TitleGap/TitleGap';

interface DashboardPageProps {
  documents: JobApplicationDocument[];
  onDelete: (documentId: string) => void;
}

export function DashboardPage({ documents, onDelete }: DashboardPageProps) {
  const [, navigate] = useLocation();
  return (
    <main>
      <AppHeader documentsCount={documents.length} />

      <Container
        justify="between"
        align="center"
        direction="row"
        gap="16px"
        mDirection="column"
        mAlign="start"
        mJustify="start"
      >
        <Text size="xlarge" color="primary" as="h1">
          Applications
        </Text>
        <Button size="medium" onClick={() => navigate('/create')}>
          <Icon name="plus" />
          Create New
        </Button>
      </Container>
      <TitleGap />
      <ApplicationList documents={documents} onDelete={onDelete} />
      <GoalBanner documentsCount={documents.length} />
    </main>
  );
}
