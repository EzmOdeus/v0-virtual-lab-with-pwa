'use client';

import { Question } from '@/lib/questions';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: string) => void;
  language: 'ar' | 'en';
  disabled?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  language,
  disabled = false,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const questionText = language === 'ar' ? question.questionAr : question.questionEn;
  const description = language === 'ar' ? question.descriptionAr : question.descriptionEn;

  const handleSelectAnswer = (answer: string) => {
    if (!disabled) {
      setSelectedAnswer(answer);
      onAnswer(answer);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {language === 'ar' ? 'السؤال' : 'Question'} {questionNumber}/{totalQuestions}
          </h3>
          <div className="text-sm text-slate-400">
            {language === 'ar'
              ? `مستوى الصعوبة: ${question.difficulty === 'easy' ? 'سهل' : question.difficulty === 'medium' ? 'متوسط' : 'صعب'}`
              : `Difficulty: ${question.difficulty}`}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">{questionText}</h2>
        {description && <p className="mt-2 text-slate-400">{description}</p>}
      </div>

      {question.type === 'mcq' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => {
            const optionText = language === 'ar' ? option.textAr : option.textEn;
            const isSelected = selectedAnswer === optionText;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(optionText)}
                disabled={disabled}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-600'
                    }`}
                  />
                  <span className="text-lg font-medium">{optionText}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div className="grid grid-cols-2 gap-4">
          {['true', 'false'].map((value) => {
            const displayText = value === 'true' 
              ? (language === 'ar' ? 'صحيح' : 'True')
              : (language === 'ar' ? 'خاطئ' : 'False');
            
            const isSelected = selectedAnswer === value;

            return (
              <button
                key={value}
                onClick={() => handleSelectAnswer(value)}
                disabled={disabled}
                className={`rounded-lg border-2 p-4 font-semibold transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {displayText}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
