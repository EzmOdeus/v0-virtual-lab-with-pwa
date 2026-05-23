'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { experiments } from '@/lib/experiments';
import { useParams } from 'next/navigation';

function ExperimentContent() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const params = useParams();
  const experimentId = params.id as string;

  const experiment = experiments.find((exp) => exp.id === experimentId);

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
              <div className="text-5xl">{experiment.icon}</div>
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
