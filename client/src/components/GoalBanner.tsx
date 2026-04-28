import { Link } from 'wouter';

import { Progress } from './Progress/Progress';

interface GoalBannerProps {
  documentsCount: number;
}

export function GoalBanner({ documentsCount }: GoalBannerProps) {
  const progressCount = Math.min(documentsCount, 5);
  const isGoalMet = progressCount >= 5;

  return (
    <section>
      <h2>{isGoalMet ? 'Goal reached' : 'Hit your goal'}</h2>
      <p>
        {isGoalMet
          ? 'You already have five generated applications in this browser.'
          : 'Generate and send out a couple more job applications today to get hired faster.'}
      </p>
      <p>
        <Link href="/create">Create New</Link>
      </p>
      <Progress style="pills" current={progressCount} total={5} gap={8} />
      <p>{progressCount} out of 5</p>
    </section>
  );
}
