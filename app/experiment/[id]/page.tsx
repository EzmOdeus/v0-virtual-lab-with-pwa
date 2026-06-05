'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { experiments } from '@/lib/experiments';
import { useParams } from 'next/navigation';
import { getQuestionsByExperiment, getRandomQuestions } from '@/lib/questions';
import { QuizModal } from '@/components/QuizModal';
import { getExperimentQuizStats } from '@/lib/storage';
import { getChallengesByExperiment, getChallengesByDifficulty, Difficulty } from '@/lib/levels';
import { DifficultySelector } from '@/components/DifficultySelector';
import { ChallengeCard } from '@/components/ChallengeCard';
import { getChallengeProgress } from '@/lib/storage';

const categoryIcons: Record<string, string> = {
  physics: '/physics-icon.jpg',
  chemistry: '/chemistry-icon.jpg',
  biology: '/biology-icon.jpg',
};

function ExperimentContent() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [preTestOpen, setPreTestOpen] = useState(false);
  const [postTestOpen, setPostTestOpen] = useState(false);
  const [quizStats, setQuizStats] = useState(null as any);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('basic');
  const [challenges, setChallenges] = useState<any[]>([]);
  const params = useParams();
  const experimentId = params.id as string;

  const experiment = experiments.find((exp) => exp.id === experimentId);
  
  // Load quiz stats and challenges on mount
  useEffect(() => {
    const stats = getExperimentQuizStats(experimentId);
    setQuizStats(stats);
    
    const allChallenges = getChallengesByExperiment(experimentId);
    setChallenges(allChallenges);
  }, [experimentId]);

  if (!experiment) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {language === 'ar' ? 'لم يتم العثور على التجربة' : 'Experiment Not Found'}
            </h1>
            <Link href="/experiments" className="text-blue-400 hover:underline">
              {language === 'ar' ? 'العودة للتجارب' : 'Back to Experiments'}
            </Link>
          </div>
        </div>
      </>
    );
  }

  const title = language === 'ar' ? experiment.titleAr : experiment.titleEn;
  const description = language === 'ar' ? experiment.descriptionAr : experiment.descriptionEn;

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/experiments"
            className="inline-flex items-center gap-2 mb-8 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'ar' ? 'العودة للتجارب' : 'Back to Experiments'}
          </Link>

          {/* Experiment Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={categoryIcons[experiment.category] || '/favicon.jpg'}
                  alt={experiment.titleEn}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{title}</h1>
                <p className="text-lg text-slate-400">{description}</p>
              </div>
            </div>
          </div>

          {/* Experiment Viewer */}
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 mb-8 overflow-hidden">
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                src={experiment.iframe}
                width={experiment.width}
                height={experiment.height}
                className="w-full h-full border-0"
                allowFullScreen
                title={title}
              />
              
              {/* Fallback message */}
              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-black/50 text-white" id="fallback">
                <p className="mb-4">{language === 'ar' ? 'جاري تحميل التجربة...' : 'Loading experiment...'}</p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="mb-8 rounded-lg border border-blue-500/50 bg-blue-600/10 p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' ? 'اختبر معرفتك' : 'Test Your Knowledge'}
              </h3>
              <p className="text-slate-300">
                {language === 'ar'
                  ? 'قم بإجراء الاختبار القبلي والبعدي لقياس فهمك للموضوع'
                  : 'Take the pre-test and post-test to measure your understanding of the topic'}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Pre-Test Button */}
              <button
                onClick={() => setPreTestOpen(true)}
                className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-left hover:border-blue-500/50 hover:bg-slate-800 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {language === 'ar' ? 'اختبار قبلي' : 'Pre-Test'}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      {language === 'ar'
                        ? 'اختبر معرفتك قبل التجربة'
                        : 'Test your knowledge before the experiment'}
                    </p>
                    {quizStats?.preTestCompleted && (
                      <div className="inline-block rounded-full bg-green-600/20 px-3 py-1 text-xs font-semibold text-green-400">
                        {language === 'ar' ? 'مكتمل' : 'Completed'} - {quizStats?.preTestScore?.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <div className="text-2xl">
                    {quizStats?.preTestCompleted ? '✓' : '→'}
                  </div>
                </div>
              </button>

              {/* Post-Test Button */}
              <button
                onClick={() => setPostTestOpen(true)}
                className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-left hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {language === 'ar' ? 'اختبار بعدي' : 'Post-Test'}
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      {language === 'ar'
                        ? 'اختبر ما تعلمته من التجربة'
                        : 'Test what you learned from the experiment'}
                    </p>
                    {quizStats?.postTestCompleted && (
                      <div className="inline-block rounded-full bg-cyan-600/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                        {language === 'ar' ? 'مكتمل' : 'Completed'} - {quizStats?.postTestScore?.toFixed(1)}%
                      </div>
                    )}
                    {quizStats?.improvement !== undefined && (
                      <div className={`inline-block ml-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        quizStats.improvement >= 0
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-red-600/20 text-red-400'
                      }`}>
                        {quizStats.improvement >= 0 ? '+' : ''}{quizStats.improvement?.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <div className="text-2xl">
                    {quizStats?.postTestCompleted ? '✓' : '→'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Challenges Section */}
          {challenges.length > 0 && (
            <div className="mb-8 rounded-lg border border-purple-500/50 bg-purple-600/10 p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'ar' ? 'التحديات' : 'Challenges'}
                </h3>
                <p className="text-slate-300">
                  {language === 'ar'
                    ? 'اقبل التحديات واختبر مهاراتك في مستويات مختلفة من الصعوبة'
                    : 'Accept challenges and test your skills at different difficulty levels'}
                </p>
              </div>

              {/* Difficulty Selector */}
              <DifficultySelector
                selected={selectedDifficulty}
                onSelect={setSelectedDifficulty}
                language={language}
              />

              {/* Challenge Cards */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {challenges
                  .filter((c) => c.difficulty === selectedDifficulty)
                  .map((challenge) => {
                    const progress = getChallengeProgress(challenge.id);
                    const previousLevelComplete = challenge.minScoreRequired
                      ? challenges.find(
                          (c) =>
                            c.difficulty === 'basic' &&
                            getChallengeProgress(c.id)?.bestScore &&
                            getChallengeProgress(c.id).bestScore >= challenge.minScoreRequired
                        )
                      : true;

                    return (
                      <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        language={language}
                        isLocked={!previousLevelComplete && challenge.minScoreRequired}
                      />
                    );
                  })}
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'ar' ? 'عن هذه التجربة' : 'About This Experiment'}
              </h3>
              <p className="text-slate-300 leading-relaxed">{description}</p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'ar' ? 'معلومات' : 'Information'}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">
                    {language === 'ar' ? 'الفئة' : 'Category'}
                  </p>
                  <p className="text-slate-300 font-medium capitalize">{experiment.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    {language === 'ar' ? 'المصدر' : 'Source'}
                  </p>
                  <a
                    href="https://phet.colorado.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    PhET Interactive Simulations
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </p>
                  <p className="text-slate-300 font-medium">
                    {language === 'ar' ? 'محاكاة تفاعلية' : 'Interactive Simulation'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex gap-4 justify-center">
            <Link
              href="/experiments"
              className="px-6 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors font-medium"
            >
              {language === 'ar' ? 'استكشف المزيد' : 'Explore More'}
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800/50 transition-colors font-medium"
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
          </div>
        </div>

        {/* Quiz Modals */}
        <QuizModal
          isOpen={preTestOpen}
          onClose={() => {
            setPreTestOpen(false);
            const stats = getExperimentQuizStats(experimentId);
            setQuizStats(stats);
          }}
          questions={getRandomQuestions(experimentId, 'pre', 3)}
          experimentId={experimentId}
          stage="pre"
          language={language}
        />

        <QuizModal
          isOpen={postTestOpen}
          onClose={() => {
            setPostTestOpen(false);
            const stats = getExperimentQuizStats(experimentId);
            setQuizStats(stats);
          }}
          questions={getRandomQuestions(experimentId, 'post', 3)}
          experimentId={experimentId}
          stage="post"
          language={language}
        />
      </main>
    </>
  );
}

export default function ExperimentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" /></div>}>
      <ExperimentContent />
    </Suspense>
  );
}
