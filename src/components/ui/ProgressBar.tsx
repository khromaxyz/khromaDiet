interface ProgressBarProps {
  value: number;
  className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div className={className ? `progress-bar-wrapper ${className}` : 'progress-bar-wrapper'}>
      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
};

