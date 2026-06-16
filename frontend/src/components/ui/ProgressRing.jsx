import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

function getColor(score) {
  if (score >= 75) return '#10B981'; // green
  if (score >= 50) return '#F59E0B'; // amber
  return '#EF4444';                  // red
}

function getGrade(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 45) return 'Needs Work';
  return 'Poor';
}

export function ProgressRing({ score = 0, size = 140, strokeWidth = 10, className, showGrade = true }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(score);
  const grade = getGrade(score);
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = score / 60;
      const counter = setInterval(() => {
        start += increment;
        if (start >= score) {
          setDisplayScore(score);
          clearInterval(counter);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(counter);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1E293B"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.3s ease' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-100" style={{ color }}>
            {displayScore}
          </span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      {showGrade && (
        <span className="text-sm font-semibold" style={{ color }}>{grade}</span>
      )}
    </div>
  );
}