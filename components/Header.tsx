'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl">🔬</div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {language === 'ar' ? 'المعمل الافتراضي' : 'Virtual Lab'}
              </div>
              <div className="text-xs text-slate-500">
                {language === 'ar' ? 'تجارب علمية تفاعلية' : 'Interactive Science'}
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link href="/experiments" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">
              {language === 'ar' ? 'التجارب' : 'Experiments'}
            </Link>
          </nav>

          {/* Language Toggle & Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors"
            >
              {language === 'ar' ? 'EN' : 'العربية'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 flex flex-col gap-2 md:hidden">
            <Link href="/" className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link href="/experiments" className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors">
              {language === 'ar' ? 'التجارب' : 'Experiments'}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
