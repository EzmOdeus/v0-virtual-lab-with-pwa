'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Experiment } from '@/lib/experiments';

const categoryIcons: Record<string, string> = {
  physics: '/physics-icon.jpg',
  chemistry: '/chemistry-icon.jpg',
  biology: '/biology-icon.jpg',
};

interface ExperimentCardProps {
  experiment: Experiment;
  language: 'ar' | 'en';
}

export function ExperimentCard({ experiment, language }: ExperimentCardProps) {
  const title = language === 'ar' ? experiment.titleAr : experiment.titleEn;
  const description = language === 'ar' ? experiment.descriptionAr : experiment.descriptionEn;

  return (
    <Link href={`/experiment/${experiment.id}`}>
      <div className="group relative h-full overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="mb-4 w-12 h-12">
            <Image
              src={categoryIcons[experiment.category] || '/favicon.jpg'}
              alt={experiment.titleEn}
              width={48}
              height={48}
              className="rounded"
            />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 group-hover:text-blue-400 transition-colors">
            <span>استكشف التجربة →</span>
            <span>Explore Experiment →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
