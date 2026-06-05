import { QuizSession, QuizAnswer } from './questions';

const STORAGE_KEY = 'virtual-lab-quiz-sessions';
const STORAGE_KEY_ANSWERS = 'virtual-lab-quiz-answers';

// Quiz Sessions Storage
export function saveQuizSession(session: QuizSession): void {
  if (typeof window === 'undefined') return;

  try {
    const sessions = getQuizSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('[v0] Failed to save quiz session:', error);
  }
}

export function getQuizSessions(): QuizSession[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[v0] Failed to get quiz sessions:', error);
    return [];
  }
}

export function getQuizSession(sessionId: string): QuizSession | null {
  const sessions = getQuizSessions();
  return sessions.find((s) => s.id === sessionId) || null;
}

export function getQuizSessionsByExperiment(experimentId: string): QuizSession[] {
  const sessions = getQuizSessions();
  return sessions.filter((s) => s.experimentId === experimentId);
}

export function deleteQuizSession(sessionId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const sessions = getQuizSessions();
    const filtered = sessions.filter((s) => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('[v0] Failed to delete quiz session:', error);
  }
}

export function clearAllQuizSessions(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('[v0] Failed to clear quiz sessions:', error);
  }
}

// Get the latest quiz session for an experiment
export function getLatestQuizSession(
  experimentId: string,
  stage: 'pre' | 'post'
): QuizSession | null {
  const sessions = getQuizSessionsByExperiment(experimentId);
  const filteredSessions = sessions.filter((s) => s.stage === stage);
  
  if (filteredSessions.length === 0) return null;
  
  return filteredSessions.reduce((latest, current) =>
    current.completedAt > latest.completedAt ? current : latest
  );
}

// Get all quiz statistics for an experiment
export interface QuizStats {
  preTestCompleted: boolean;
  postTestCompleted: boolean;
  preTestScore?: number;
  postTestScore?: number;
  improvement?: number;
  totalAttempts: number;
}

export function getExperimentQuizStats(experimentId: string): QuizStats {
  const sessions = getQuizSessionsByExperiment(experimentId);
  const preSessions = sessions.filter((s) => s.stage === 'pre');
  const postSessions = sessions.filter((s) => s.stage === 'post');

  const preScore = preSessions.length > 0 
    ? (preSessions[preSessions.length - 1].score / preSessions[preSessions.length - 1].totalQuestions) * 100
    : undefined;

  const postScore = postSessions.length > 0
    ? (postSessions[postSessions.length - 1].score / postSessions[postSessions.length - 1].totalQuestions) * 100
    : undefined;

  const improvement = (preScore !== undefined && postScore !== undefined) 
    ? postScore - preScore
    : undefined;

  return {
    preTestCompleted: preSessions.length > 0,
    postTestCompleted: postSessions.length > 0,
    preTestScore: preScore,
    postTestScore: postScore,
    improvement,
    totalAttempts: sessions.length,
  };
}

// Generate unique session ID
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Challenge Progress Storage
export interface ChallengeProgress {
  challengeId: string;
  experimentId: string;
  completed: boolean;
  attempts: number;
  bestScore?: number;
  unlockedAt?: number;
  completedAt?: number;
}

const CHALLENGE_STORAGE_KEY = 'virtual-lab-challenges';

export function saveChallengeProgress(progress: ChallengeProgress): void {
  if (typeof window === 'undefined') return;

  try {
    const allProgress = getChallengesProgress();
    const existingIndex = allProgress.findIndex((p) => p.challengeId === progress.challengeId);

    if (existingIndex >= 0) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }

    localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('[v0] Failed to save challenge progress:', error);
  }
}

export function getChallengesProgress(): ChallengeProgress[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(CHALLENGE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[v0] Failed to get challenges progress:', error);
    return [];
  }
}

export function getChallengeProgress(challengeId: string): ChallengeProgress | null {
  const progress = getChallengesProgress();
  return progress.find((p) => p.challengeId === challengeId) || null;
}

export function getChallengeProgressByExperiment(experimentId: string): ChallengeProgress[] {
  const progress = getChallengesProgress();
  return progress.filter((p) => p.experimentId === experimentId);
}

// Analytics Data Storage
export interface AnalyticsData {
  experimentId: string;
  timestamp: number;
  stage: 'pre' | 'post';
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

const ANALYTICS_STORAGE_KEY = 'virtual-lab-analytics';

export function saveAnalyticsData(data: AnalyticsData): void {
  if (typeof window === 'undefined') return;

  try {
    const allData = getAnalyticsData();
    allData.push(data);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    console.error('[v0] Failed to save analytics data:', error);
  }
}

export function getAnalyticsData(): AnalyticsData[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[v0] Failed to get analytics data:', error);
    return [];
  }
}

export function getAnalyticsDataByExperiment(experimentId: string): AnalyticsData[] {
  const allData = getAnalyticsData();
  return allData.filter((d) => d.experimentId === experimentId);
}

// Get overall statistics
export interface OverallStats {
  totalExperimentsAttempted: number;
  totalChallengesCompleted: number;
  totalPoints: number;
  averageScore: number;
  strongExperiments: string[];
  weakExperiments: string[];
}

export function getOverallStats(experiments: any[]): OverallStats {
  const analyticsData = getAnalyticsData();
  const challengesProgress = getChallengesProgress();

  const uniqueExperiments = new Set(analyticsData.map((d) => d.experimentId));
  const totalChallengesCompleted = challengesProgress.filter((p) => p.completed).length;
  const totalPoints = challengesProgress.reduce((sum, p) => sum + (p.bestScore || 0), 0);

  const experimentScores: Record<string, number[]> = {};
  analyticsData.forEach((d) => {
    if (!experimentScores[d.experimentId]) {
      experimentScores[d.experimentId] = [];
    }
    experimentScores[d.experimentId].push((d.score / d.totalQuestions) * 100);
  });

  const experimentAverages = Object.entries(experimentScores).map(([expId, scores]) => ({
    experimentId: expId,
    average: scores.reduce((a, b) => a + b, 0) / scores.length,
  }));

  const sortedByScore = experimentAverages.sort((a, b) => b.average - a.average);
  const strongExperiments = sortedByScore.slice(0, 3).map((e) => e.experimentId);
  const weakExperiments = sortedByScore.slice(-3).map((e) => e.experimentId).reverse();

  const allScores = analyticsData.map((d) => (d.score / d.totalQuestions) * 100);
  const averageScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;

  return {
    totalExperimentsAttempted: uniqueExperiments.size,
    totalChallengesCompleted,
    totalPoints,
    averageScore,
    strongExperiments,
    weakExperiments,
  };
}
