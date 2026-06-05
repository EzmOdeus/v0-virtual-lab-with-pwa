'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getAnalyticsData, getChallengesProgress, getOverallStats } from '@/lib/storage';
import { experiments } from '@/lib/experiments';
import { useEffect, useState } from 'react';

interface AnalyticsDashboardProps {
  language: 'ar' | 'en';
}

export function AnalyticsDashboard({ language }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [challengeCompletion, setChallengeCompletion] = useState<any[]>([]);
  const [experimentData, setExperimentData] = useState<any[]>([]);

  useEffect(() => {
    const analyticsData = getAnalyticsData();
    const challenges = getChallengesProgress();
    const overallStats = getOverallStats(experiments);

    setStats(overallStats);

    // Performance over time
    const perfData = analyticsData.slice(-10).map((d, i) => ({
      attempt: i + 1,
      score: (d.score / d.totalQuestions) * 100,
      experiment: experiments.find((e) => e.id === d.experimentId)?.titleEn || d.experimentId,
    }));
    setPerformanceData(perfData);

    // Challenge completion by difficulty
    const basicsCompleted = challenges.filter((c) => c.difficulty === 'basic' && c.completed).length;
    const intermediatesCompleted = challenges.filter((c) => c.difficulty === 'intermediate' && c.completed).length;
    const advancedCompleted = challenges.filter((c) => c.difficulty === 'advanced' && c.completed).length;

    setChallengeCompletion([
      { name: language === 'ar' ? 'أساسي' : 'Basic', value: basicsCompleted, color: '#10b981' },
      { name: language === 'ar' ? 'متوسط' : 'Intermediate', value: intermediatesCompleted, color: '#f59e0b' },
      { name: language === 'ar' ? 'متقدم' : 'Advanced', value: advancedCompleted, color: '#ef4444' },
    ]);

    // Experiment performance
    const expData = experiments.map((exp) => {
      const expAnalytics = analyticsData.filter((d) => d.experimentId === exp.id);
      const avgScore = expAnalytics.length > 0
        ? expAnalytics.reduce((sum, d) => sum + (d.score / d.totalQuestions) * 100, 0) / expAnalytics.length
        : 0;

      return {
        name: language === 'ar' ? exp.titleAr : exp.titleEn,
        score: Math.round(avgScore),
        attempts: expAnalytics.length,
      };
    });

    setExperimentData(expData);
  }, [language]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="🧪"
          label={language === 'ar' ? 'التجارب المحاولة' : 'Experiments Attempted'}
          value={stats.totalExperimentsAttempted}
        />
        <StatCard
          icon="🎯"
          label={language === 'ar' ? 'التحديات المكتملة' : 'Challenges Completed'}
          value={stats.totalChallengesCompleted}
        />
        <StatCard
          icon="⭐"
          label={language === 'ar' ? 'إجمالي النقاط' : 'Total Points'}
          value={stats.totalPoints}
        />
        <StatCard
          icon="📊"
          label={language === 'ar' ? 'متوسط الدرجة' : 'Average Score'}
          value={`${Math.round(stats.averageScore)}%`}
        />
      </div>

      {/* Performance Chart */}
      {performanceData.length > 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="mb-6 text-lg font-semibold text-white">
            {language === 'ar' ? 'تطور الأداء' : 'Performance Progress'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
              <XAxis dataKey="attempt" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Challenge Completion Pie */}
        {challengeCompletion.some((c) => c.value > 0) && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
              {language === 'ar' ? 'التحديات المكتملة' : 'Completed Challenges'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={challengeCompletion.filter((c) => c.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {challengeCompletion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Experiment Performance Bar */}
        {experimentData.length > 0 && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
              {language === 'ar' ? 'أداء التجارب' : 'Experiment Performance'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={experimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="score" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Strong Areas */}
        {stats.strongExperiments.length > 0 && (
          <div className="rounded-lg border border-green-600/30 bg-green-600/10 p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-400">
              <span>💪</span> {language === 'ar' ? 'المجالات القوية' : 'Strong Areas'}
            </h4>
            <ul className="space-y-2">
              {stats.strongExperiments.map((expId: string) => {
                const exp = experiments.find((e) => e.id === expId);
                return (
                  <li key={expId} className="text-slate-300">
                    {language === 'ar' ? exp?.titleAr : exp?.titleEn}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Areas to Improve */}
        {stats.weakExperiments.length > 0 && (
          <div className="rounded-lg border border-red-600/30 bg-red-600/10 p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
              <span>🎯</span> {language === 'ar' ? 'مجالات التحسين' : 'Areas to Improve'}
            </h4>
            <ul className="space-y-2">
              {stats.weakExperiments.map((expId: string) => {
                const exp = experiments.find((e) => e.id === expId);
                return (
                  <li key={expId} className="text-slate-300">
                    {language === 'ar' ? exp?.titleAr : exp?.titleEn}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
