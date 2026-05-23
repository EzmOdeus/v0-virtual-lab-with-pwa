'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function Home() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 right-1/2 h-80 w-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-80 left-1/3 h-80 w-80 bg-cyan-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full bg-blue-600/20 px-4 py-1 text-sm font-semibold text-blue-300 border border-blue-500/30">
              {language === 'ar' ? '🚀 تعليم علمي تفاعلي' : '🚀 Interactive Science Learning'}
            </div>

            <h1 className="mb-6 text-balance text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600">
                {language === 'ar' 
                  ? 'اكتشف العلم بطريقة جديدة' 
                  : 'Discover Science in a New Way'}
              </span>
            </h1>

            <p className="mb-8 text-xl text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'منصة تعليمية تفاعلية تضم تجارب علمية حقيقية في الفيزياء والكيمياء والأحياء. اختبر قوانين الطبيعة بنفسك!'
                : 'An interactive educational platform with real science experiments in Physics, Chemistry, and Biology. Test the laws of nature yourself!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/experiments"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-blue-600/50 transition-all hover:scale-105"
              >
                {language === 'ar' ? 'اكتشف التجارب' : 'Explore Experiments'}
                <span className="ml-2">→</span>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-8 py-3 font-semibold text-slate-200 hover:bg-slate-800/50 transition-all"
              >
                {language === 'ar' ? 'تعرف أكثر' : 'Learn More'}
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {language === 'ar' ? 'خصائص المنصة' : 'Platform Features'}
              </h2>
              <p className="text-xl text-slate-400">
                {language === 'ar' 
                  ? 'كل ما تحتاجه لاستكشاف العلم'
                  : 'Everything you need to explore science'}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: '🔬',
                  titleAr: 'تجارب تفاعلية',
                  titleEn: 'Interactive Experiments',
                  descAr: '11 تجربة علمية متقدمة من PhET',
                  descEn: '11 advanced science experiments from PhET',
                },
                {
                  icon: '📱',
                  titleAr: 'تطبيق ويب',
                  titleEn: 'Web App',
                  descAr: 'استخدمها كتطبيق على هاتفك أو جهازك اللوحي',
                  descEn: 'Use it as an app on your phone or tablet',
                },
                {
                  icon: '🌍',
                  titleAr: 'ثنائي اللغة',
                  titleEn: 'Bilingual',
                  descAr: 'دعم كامل للعربية والإنجليزية',
                  descEn: 'Full support for Arabic and English',
                },
                {
                  icon: '⚡',
                  titleAr: 'سريع وسلس',
                  titleEn: 'Fast & Smooth',
                  descAr: 'أداء عالي وتحميل سريع',
                  descEn: 'High performance and quick loading',
                },
                {
                  icon: '📶',
                  titleAr: 'يعمل بلا انترنت',
                  titleEn: 'Offline Mode',
                  descAr: 'استخدم التطبيق حتى بدون اتصال',
                  descEn: 'Use the app even without internet',
                },
                {
                  icon: '🎓',
                  titleAr: 'تعليمي',
                  titleEn: 'Educational',
                  descAr: 'مناسب للطلاب والمعلمين والفضوليين',
                  descEn: 'Perfect for students, teachers, and curious minds',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group rounded-lg border border-slate-700 bg-slate-800/50 p-6 hover:border-blue-500 hover:bg-slate-800/80 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {language === 'ar' ? feature.titleAr : feature.titleEn}
                  </h3>
                  <p className="text-slate-400">
                    {language === 'ar' ? feature.descAr : feature.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/50 p-8 sm:p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              {language === 'ar' ? 'هل أنت مستعد؟' : 'Ready to Start?'}
            </h2>
            <p className="mb-8 text-lg text-slate-300">
              {language === 'ar'
                ? 'ابدأ استكشاف التجارب العلمية الآن وتعلم بطريقة تفاعلية ممتعة'
                : 'Start exploring science experiments now and learn in an interactive and fun way'}
            </p>
            <Link
              href="/experiments"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
