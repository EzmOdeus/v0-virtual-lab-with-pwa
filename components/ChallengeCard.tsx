'use client';

import { Challenge } from '@/lib/levels';
import { getChallengeProgress } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface ChallengeCardProps {
  challenge: Challenge;
  language: 'ar' | 'en';
  isLocked?: boolean;
  onStart?: () => void;
}

export function ChallengeCard({ challenge, language, isLocked = false, onStart }: ChallengeCardProps) {
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    const prog = getChallengeProgress(challenge.id);
    setProgress(prog);
  }, [challenge.id]);

  const colors = {
    basic: { bg: '#10b98120', text: '#10b981', icon: '🟢' },
    intermediate: { bg: '#f59e0b20', text: '#f59e0b', icon: '🟡' },
    advanced: { bg: '#ef444420', text: '#ef4444', icon: '🔴' },
  };

  const color = colors[challenge.difficulty];

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border p-5 transition-all ${
        isLocked
          ? 'border-slate-700 bg-slate-900 opacity-60 cursor-not-allowed'
          : 'border-slate-700 bg-slate-800 hover:border-blue-500 hover:bg-slate-800/80 cursor-pointer'
      }`}
      onClick={() => !isLocked && onStart?.()}
      style={!isLocked ? { borderColor: color.text } : undefined}
    >
      {/* Locked Badge */}
      {isLocked && (
        <div className="absolute top-2 right-2 bg-red-600/30 rounded-full px-2 py-1 text-xs font-semibold text-red-300 flex items-center gap-1">
          <span>🔒</span>
          {language === 'ar' ? 'مقفل' : 'Locked'}
        </div>
      )}

      {/* Completed Badge */}
      {progress?.completed && (
        <div className="absolute top-2 right-2 bg-green-600/30 rounded-full px-2 py-1 text-xs font-semibold text-green-300 flex items-center gap-1">
          <span>✓</span>
          {language === 'ar' ? 'مكتمل' : 'Completed'}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{color.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-lg">{language === 'ar' ? challenge.titleAr : challenge.titleEn}</h4>
          <p className="text-sm text-slate-400 mt-1">
            {language === 'ar' ? challenge.descriptionAr : challenge.descriptionEn}
          </p>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-3 p-3 rounded bg-slate-900/50 border border-slate-700">
        <p className="text-xs font-semibold text-slate-300 mb-1">{language === 'ar' ? 'الهدف' : 'Goal'}:</p>
        <p className="text-sm text-slate-300">{challenge.goal}</p>
      </div>

      {/* Points & Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: color.text }}>
            {challenge.points}
          </span>
          <span className="text-xs text-slate-400">{language === 'ar' ? 'نقطة' : 'pts'}</span>
        </div>

        {progress && !isLocked && (
          <div className="text-xs text-slate-400">
            {progress.completed ? (
              <span style={{ color: color.text }}>
                {language === 'ar' ? `أفضل: ${progress.bestScore}%` : `Best: ${progress.bestScore}%`}
              </span>
            ) : (
              <span>{progress.attempts} {language === 'ar' ? 'محاولة' : 'attempt(s)'}</span>
            )}
          </div>
        )}
      </div>

      {/* Unlock Condition */}
      {isLocked && challenge.minScoreRequired && (
        <p className="text-xs text-yellow-400 mt-2">
          {language === 'ar'
            ? `متطلب: الحصول على ${challenge.minScoreRequired}% في المستوى السابق`
            : `Requires: ${challenge.minScoreRequired}% on previous level`}
        </p>
      )}
    </div>
  );
}
