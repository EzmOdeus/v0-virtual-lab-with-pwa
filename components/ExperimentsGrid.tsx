'use client';

import { experiments, categories } from '@/lib/experiments';
import { ExperimentCard } from './ExperimentCard';
import { useState } from 'react';

interface ExperimentsGridProps {
  language: 'ar' | 'en';
}

export function ExperimentsGrid({ language }: ExperimentsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiments = experiments.filter((exp) => {
    const matchCategory = !selectedCategory || exp.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      (language === 'ar'
        ? exp.titleAr.includes(searchQuery) || exp.descriptionAr.includes(searchQuery)
        : exp.titleEn.includes(searchQuery) || exp.descriptionEn.includes(searchQuery));

    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={language === 'ar' ? 'ابحث عن تجربة...' : 'Search experiments...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {language === 'ar' ? 'الكل' : 'All'}
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>{category.icon}</span>
            {language === 'ar' ? category.labelAr : category.labelEn}
          </button>
        ))}
      </div>

      {/* Experiments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              language={language}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400">
              {language === 'ar' ? 'لم يتم العثور على تجارب' : 'No experiments found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
