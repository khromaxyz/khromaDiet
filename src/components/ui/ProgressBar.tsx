interface ProgressBarProps {
  value: number;
  className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={className ? `progress-bar-wrapper ${className}` : 'progress-bar-wrapper'}>
      <div
        className={`progress-bar-fill${normalizedValue <= 0 ? ' progress-bar-empty' : ''}`}
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  );
};
