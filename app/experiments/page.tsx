'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ExperimentsGrid } from '@/components/ExperimentsGrid';

export default function ExperimentsPage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {language === 'ar' ? 'جميع التجارب' : 'All Experiments'}
            </h1>
            <p className="text-lg text-slate-400">
              {language === 'ar'
                ? 'اختر من بين 11 تجربة تفاعلية لاستكشاف قوانين الفيزياء والكيمياء والأحياء'
                : 'Choose from 11 interactive experiments to explore the laws of Physics, Chemistry, and Biology'}
            </p>
          </div>

          {/* Experiments Grid */}
          <ExperimentsGrid language={language} />
        </div>
      </main>
    </>
  );
}
