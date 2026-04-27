import { Link } from 'wouter';

import { ProgressPills } from './ProgressPills';

interface AppHeaderProps {
  documentsCount: number;
}

export function AppHeader({ documentsCount }: AppHeaderProps) {
  const progressCount = Math.min(documentsCount, 5);

  return (
    <header>
      <p>
        <strong>Alt+Shift</strong>
      </p>
      <nav>
        <Link href="/">Dashboard</Link>
        {' | '}
        <Link href="/create">Create</Link>
      </nav>
      <p>{progressCount}/5 applications generated</p>
      <ProgressPills current={progressCount} />
    </header>
  );
}
