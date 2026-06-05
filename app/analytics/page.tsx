'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <section className="border-b border-slate-700 bg-slate-900/50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {language === 'ar' ? 'لوحة التحليلات' : 'Analytics Dashboard'}
                </h1>
                <p className="text-slate-400">
                  {language === 'ar'
                    ? 'تتبع تقدمك وأدائك في جميع التجارب'
                    : 'Track your progress and performance across all experiments'}
                </p>
              </div>
              <div className="text-5xl">📊</div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnalyticsDashboard language={language} />

            {/* Back Button */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                {language === 'ar' ? '← العودة للرئيسية' : '← Back to Home'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
