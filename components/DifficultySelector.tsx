'use client';

import { Difficulty, difficulties } from '@/lib/levels';

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  language: 'ar' | 'en';
}

export function DifficultySelector({ selected, onSelect, language }: DifficultySelectorProps) {
  return (
    <div className="mb-8 rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        {language === 'ar' ? 'اختر مستوى الصعوبة' : 'Choose Difficulty Level'}
      </h3>
      
      <div className="grid gap-3 grid-cols-3">
        {(difficulties as any[]).map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelect(diff.id as Difficulty)}
            className={`group relative overflow-hidden rounded-lg border-2 p-4 text-center transition-all ${
              selected === diff.id
                ? `border-[${diff.color}] bg-slate-700`
                : 'border-slate-600 bg-slate-800 hover:border-slate-500'
            }`}
            style={{
              borderColor: selected === diff.id ? diff.color : undefined,
              backgroundColor: selected === diff.id ? `${diff.color}20` : undefined,
            }}
          >
            <div className="text-3xl mb-2">{diff.icon}</div>
            <div className="text-sm font-semibold text-white">
              {language === 'ar' ? diff.labelAr : diff.labelEn}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
