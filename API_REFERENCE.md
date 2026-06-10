# مرجع API | API Reference

## مكتبة التخزين | Storage Library

### Quiz Management

#### `saveQuizData(data: QuizData): void`
حفظ نتائج الاختبار

```typescript
saveQuizData({
  experimentId: 'density',
  stage: 'pre',
  score: 75,
  totalQuestions: 3,
  correctAnswers: 2,
});
```

#### `getExperimentQuizStats(experimentId: string): QuizStats | null`
الحصول على إحصائيات التجربة

```typescript
const stats = getExperimentQuizStats('density');
// {
//   experimentId: 'density',
//   preTestCompleted: true,
//   preTestScore: 75,
//   postTestCompleted: true,
//   postTestScore: 85,
//   improvement: 10,
// }
```

### Challenge Management

#### `saveChallengeProgress(progress: ChallengeProgress): void`
حفظ تقدم التحدي

```typescript
saveChallengeProgress({
  challengeId: 'ch-1',
  experimentId: 'density',
  completed: true,
  attempts: 2,
  bestScore: 95,
  completedAt: Date.now(),
});
```

#### `getChallengeProgress(challengeId: string): ChallengeProgress | null`
الحصول على تقدم تحدي محدد

```typescript
const progress = getChallengeProgress('ch-1');
```

#### `getChallengeProgressByExperiment(experimentId: string): ChallengeProgress[]`
الحصول على جميع التحديات لتجربة معينة

```typescript
const challenges = getChallengeProgressByExperiment('density');
```

### Analytics

#### `saveAnalyticsData(data: AnalyticsData): void`
حفظ بيانات تحليلية

```typescript
saveAnalyticsData({
  experimentId: 'density',
  timestamp: Date.now(),
  stage: 'post',
  score: 85,
  totalQuestions: 3,
  timeSpent: 300, // ثواني
});
```

#### `getAnalyticsData(): AnalyticsData[]`
الحصول على جميع بيانات التحليلات

```typescript
const allData = getAnalyticsData();
```

#### `getAnalyticsDataByExperiment(experimentId: string): AnalyticsData[]`
الحصول على بيانات تحليلية لتجربة معينة

```typescript
const expData = getAnalyticsDataByExperiment('density');
```

#### `getOverallStats(experiments: Experiment[]): OverallStats`
الحصول على الإحصائيات الشاملة

```typescript
const stats = getOverallStats(experiments);
// {
//   totalExperimentsAttempted: 5,
//   totalChallengesCompleted: 8,
//   totalPoints: 2100,
//   averageScore: 82.5,
//   strongExperiments: ['density', 'forces'],
//   weakExperiments: ['genetics'],
// }
```

## مكتبة الأسئلة | Questions Library

### `getQuestionsByExperiment(experimentId: string): Question[]`
الحصول على جميع أسئلة التجربة

```typescript
const questions = getQuestionsByExperiment('density');
```

### `getRandomQuestions(experimentId: string, stage: 'pre' | 'post', count: number): Question[]`
الحصول على أسئلة عشوائية

```typescript
const randomQuestions = getRandomQuestions('density', 'pre', 3);
```

### `getQuestionsByStage(experimentId: string, stage: 'pre' | 'post'): Question[]`
الحصول على أسئلة مرحلة معينة

```typescript
const preQuestions = getQuestionsByStage('density', 'pre');
```

## مكتبة المستويات | Levels Library

### `getChallengesByExperiment(experimentId: string): Challenge[]`
الحصول على جميع التحديات لتجربة

```typescript
const challenges = getChallengesByExperiment('density');
```

### `getChallengesByDifficulty(experimentId: string, difficulty: Difficulty): Challenge[]`
الحصول على تحديات حسب الصعوبة

```typescript
const basicChallenges = getChallengesByDifficulty('density', 'basic');
```

### `getChallenge(challengeId: string): Challenge | undefined`
الحصول على تحدي محدد

```typescript
const challenge = getChallenge('ch-1');
```

## مكتبة التجارب | Experiments Library

### `experiments: Experiment[]`
جميع التجارب المتاحة

```typescript
import { experiments } from '@/lib/experiments';

experiments.forEach(exp => {
  console.log(exp.titleAr, exp.titleEn);
});
```

### `categories: Category[]`
فئات التجارب

```typescript
import { categories } from '@/lib/experiments';

// physics, chemistry, biology
```

## أنواع البيانات | Data Types

### Experiment
```typescript
interface Experiment {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'physics' | 'chemistry' | 'biology';
  difficulty: 'easy' | 'medium' | 'hard';
  url: string;
}
```

### Question
```typescript
interface Question {
  id: string;
  experimentId: string;
  stage: 'pre' | 'post';
  type: 'multiple-choice' | 'true-false';
  questionAr: string;
  questionEn: string;
  options?: string[];
  optionsAr?: string[];
  correctOption: number;
  explanation?: string;
  explanationAr?: string;
}
```

### Challenge
```typescript
interface Challenge {
  id: string;
  experimentId: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  points: number;
  minScoreRequired?: number;
}
```

### QuizData
```typescript
interface QuizData {
  experimentId: string;
  stage: 'pre' | 'post';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}
```

### QuizStats
```typescript
interface QuizStats {
  experimentId: string;
  preTestCompleted?: boolean;
  preTestScore?: number;
  postTestCompleted?: boolean;
  postTestScore?: number;
  improvement?: number;
}
```

### ChallengeProgress
```typescript
interface ChallengeProgress {
  challengeId: string;
  experimentId: string;
  completed: boolean;
  attempts: number;
  bestScore?: number;
  unlockedAt?: number;
  completedAt?: number;
}
```

### AnalyticsData
```typescript
interface AnalyticsData {
  experimentId: string;
  timestamp: number;
  stage: 'pre' | 'post';
  score: number;
  totalQuestions: number;
  timeSpent: number;
}
```

### OverallStats
```typescript
interface OverallStats {
  totalExperimentsAttempted: number;
  totalChallengesCompleted: number;
  totalPoints: number;
  averageScore: number;
  strongExperiments: string[];
  weakExperiments: string[];
}
```

## أمثلة عملية | Practical Examples

### مثال 1: حفظ وعرض نتائج الاختبار

```typescript
import { saveQuizData, getExperimentQuizStats } from '@/lib/storage';

// بعد انتهاء الاختبار
saveQuizData({
  experimentId: 'density',
  stage: 'post',
  score: 85,
  totalQuestions: 3,
  correctAnswers: 2,
});

// عرض النتائج
const stats = getExperimentQuizStats('density');
console.log(`Score: ${stats.postTestScore}%`);
console.log(`Improvement: ${stats.improvement}%`);
```

### مثال 2: إكمال تحدي

```typescript
import { saveChallengeProgress, getChallengeProgress } from '@/lib/storage';

// إكمال التحدي
saveChallengeProgress({
  challengeId: 'density-basic-1',
  experimentId: 'density',
  completed: true,
  attempts: 1,
  bestScore: 100,
  completedAt: Date.now(),
});

// التحقق من الإكمال
const progress = getChallengeProgress('density-basic-1');
if (progress?.completed) {
  console.log('تم إكمال التحدي!');
}
```

### مثال 3: عرض التحليلات

```typescript
import { getAnalyticsData, getOverallStats } from '@/lib/storage';
import { experiments } from '@/lib/experiments';

// الحصول على الإحصائيات
const stats = getOverallStats(experiments);

console.log(`تم محاولة ${stats.totalExperimentsAttempted} تجارب`);
console.log(`إجمالي النقاط: ${stats.totalPoints}`);
console.log(`المجالات القوية: ${stats.strongExperiments.join(', ')}`);
console.log(`مجالات التحسين: ${stats.weakExperiments.join(', ')}`);
```

### مثال 4: تصفية التحديات

```typescript
import { getChallengesByDifficulty, getChallengeProgressByExperiment } from '@/lib/storage';

// الحصول على التحديات الأساسية فقط
const basicChallenges = getChallengesByDifficulty('density', 'basic');

// مع تتبع التقدم
const progress = getChallengeProgressByExperiment('density');
const completedBasic = basicChallenges.filter(ch => 
  progress.find(p => p.challengeId === ch.id && p.completed)
);

console.log(`أكملت ${completedBasic.length} تحديات أساسية`);
```

---

**آخر تحديث:** 2026-06-10
