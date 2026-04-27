type StudyStepProgressProps = {
  label: string;
  currentStepLabel: string;
  stepIndex: number;
  stepCount: number;
  progressPercent: number;
};

export function StudyStepProgress({
  label,
  currentStepLabel,
  stepIndex,
  stepCount,
  progressPercent
}: StudyStepProgressProps) {
  return (
    <div className="study-progress-shell" aria-label={label}>
      <div className="study-progress-copy">
        <span>{label}</span>
        <strong>{currentStepLabel}</strong>
      </div>
      <div className="study-progress-meta">
        <span>
          {stepIndex} / {stepCount}
        </span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span className="progress-fill" style={{ width: `${Math.max(progressPercent, 8)}%` }} />
      </div>
    </div>
  );
}
