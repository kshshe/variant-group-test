import { Link } from 'wouter';

import { ProgressPills } from './ProgressPills';

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
      <ProgressPills current={progressCount} />
      <p>{progressCount} out of 5</p>
    </section>
  );
}
