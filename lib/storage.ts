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
