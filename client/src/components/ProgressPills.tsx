interface ProgressPillsProps {
  current: number;
  total?: number;
}

export function ProgressPills({ current, total = 5 }: ProgressPillsProps) {
  return (
    <ol>
      {Array.from({ length: total }, (_, index) => (
        <li key={index}>{index < current ? 'done' : 'pending'}</li>
      ))}
    </ol>
  );
}
