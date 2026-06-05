'use client';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  stage: 'pre' | 'post';
  language: 'ar' | 'en';
  onClose: () => void;
}

export function QuizResults({
  score,
  totalQuestions,
  stage,
  language,
  onClose,
}: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;
  const isNeedImprovement = percentage < 60;

  const getPerformanceMessage = () => {
    if (isExcellent) {
      return language === 'ar'
        ? 'ممتاز! أنت فهمت الموضوع جيداً'
        : 'Excellent! You understood the topic well';
    } else if (isGood) {
      return language === 'ar'
        ? 'جيد! لكن حاول التركيز أكثر على بعض المفاهيم'
        : 'Good! But try to focus more on some concepts';
    } else {
      return language === 'ar'
        ? 'تحتاج لمزيد من التركيز. حاول مراجعة الموضوع مرة أخرى'
        : 'You need more focus. Try reviewing the topic again';
    }
  };

  const getProgressColor = () => {
    if (isExcellent) return 'from-green-600 to-emerald-600';
    if (isGood) return 'from-blue-600 to-cyan-600';
    return 'from-orange-600 to-red-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-900 p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {language === 'ar' ? 'نتائج الاختبار' : 'Quiz Results'}
          </h2>
          <p className="text-slate-400 mb-8">
            {language === 'ar'
              ? stage === 'pre'
                ? 'اختبار قبلي'
                : 'اختبار بعدي'
              : stage === 'pre'
              ? 'Pre-Test'
              : 'Post-Test'}
          </p>

          {/* Score circle */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={isExcellent ? '#10b981' : isGood ? '#0ea5e9' : '#f97316'}
                  strokeWidth="8"
                  strokeDasharray={`${(percentage / 100) * (2 * Math.PI * 90)} ${2 * Math.PI * 90}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-5xl font-bold text-white">{percentage.toFixed(0)}%</div>
                  <div className="text-sm text-slate-400 mt-2">
                    {score} / {totalQuestions}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance message */}
          <div className="mb-8 rounded-lg bg-slate-800/50 border border-slate-700 p-6">
            <p className="text-lg font-semibold text-white">
              {getPerformanceMessage()}
            </p>
          </div>

          {/* Feedback */}
          <div className="mb-8 space-y-4 text-left">
            <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4">
              <p className="text-sm text-slate-400 mb-2">
                {language === 'ar' ? 'الأسئلة الصحيحة' : 'Correct Answers'}
              </p>
              <p className="text-2xl font-bold text-green-400">{score}</p>
            </div>
            <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4">
              <p className="text-sm text-slate-400 mb-2">
                {language === 'ar' ? 'الأسئلة الخاطئة' : 'Incorrect Answers'}
              </p>
              <p className="text-2xl font-bold text-red-400">{totalQuestions - score}</p>
            </div>
          </div>

          {/* Next steps */}
          <div className="mb-8 rounded-lg bg-blue-600/20 border border-blue-500/50 p-6">
            <p className="text-slate-300">
              {language === 'ar'
                ? stage === 'pre'
                  ? 'الآن قم بإجراء التجربة وتعلم المزيد'
                  : 'تهانينا! لقد أكملت التجربة والاختبار البعدي'
                : stage === 'pre'
                ? 'Now perform the experiment and learn more'
                : 'Congratulations! You completed the experiment and post-test'}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
