export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface Challenge {
  id: string;
  experimentId: string;
  difficulty: Difficulty;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  goal: string;
  targetValue?: number;
  icon: string;
  points: number;
  unlockedBy?: 'score' | 'completion'; // score = need minimum score on previous level
  minScoreRequired?: number;
}

export const difficulties = [
  { id: 'basic', labelAr: 'أساسي', labelEn: 'Basic', icon: '🟢', color: '#10b981' },
  { id: 'intermediate', labelAr: 'متوسط', labelEn: 'Intermediate', icon: '🟡', color: '#f59e0b' },
  { id: 'advanced', labelAr: 'متقدم', labelEn: 'Advanced', icon: '🔴', color: '#ef4444' },
];

export const challenges: Challenge[] = [
  // Density challenges
  {
    id: 'density-basic-1',
    experimentId: 'density',
    difficulty: 'basic',
    titleAr: 'اكتشف الكثافة',
    titleEn: 'Discover Density',
    descriptionAr: 'تعرف على العلاقة بين الكتلة والحجم',
    descriptionEn: 'Learn the relationship between mass and volume',
    goal: 'Complete the simulation and answer 3 questions correctly',
    points: 100,
  },
  {
    id: 'density-intermediate-1',
    experimentId: 'density',
    difficulty: 'intermediate',
    titleAr: 'قارن الكثافات',
    titleEn: 'Compare Densities',
    descriptionAr: 'قارن كثافة مادتين مختلفتين',
    descriptionEn: 'Compare the density of two different materials',
    goal: 'Make the density equal to 2.5 g/cm³',
    targetValue: 2.5,
    points: 250,
    unlockedBy: 'score',
    minScoreRequired: 70,
  },
  {
    id: 'density-advanced-1',
    experimentId: 'density',
    difficulty: 'advanced',
    titleAr: 'سيد الكثافة',
    titleEn: 'Density Master',
    descriptionAr: 'تحكم الكثافة في ظروف معقدة',
    descriptionEn: 'Master density in complex conditions',
    goal: 'Achieve 3 different density values in sequence: 0.8, 2.0, 5.0 g/cm³',
    points: 500,
    unlockedBy: 'score',
    minScoreRequired: 85,
  },

  // Forces and Motion challenges
  {
    id: 'forces-basic-1',
    experimentId: 'forces-motion',
    difficulty: 'basic',
    titleAr: 'فهم القوى',
    titleEn: 'Understanding Forces',
    descriptionAr: 'تعرف على تأثير القوى على الحركة',
    descriptionEn: 'Learn how forces affect motion',
    goal: 'Complete the simulation and answer 3 questions correctly',
    points: 100,
  },
  {
    id: 'forces-intermediate-1',
    experimentId: 'forces-motion',
    difficulty: 'intermediate',
    titleAr: 'تحكم بالقوة',
    titleEn: 'Control the Force',
    descriptionAr: 'حقق سرعة محددة باستخدام القوى',
    descriptionEn: 'Achieve a specific velocity using forces',
    goal: 'Reach a velocity of 5 m/s',
    targetValue: 5,
    points: 250,
    unlockedBy: 'score',
    minScoreRequired: 70,
  },
  {
    id: 'forces-advanced-1',
    experimentId: 'forces-motion',
    difficulty: 'advanced',
    titleAr: 'فيزيائي محترف',
    titleEn: 'Physics Pro',
    descriptionAr: 'تحكم في قوى متعددة في نفس الوقت',
    descriptionEn: 'Master multiple forces simultaneously',
    goal: 'Apply 3 different forces and maintain constant acceleration',
    points: 500,
    unlockedBy: 'score',
    minScoreRequired: 85,
  },

  // Balancing Chemical Equations challenges
  {
    id: 'chem-basic-1',
    experimentId: 'balancing-chemical',
    difficulty: 'basic',
    titleAr: 'موازن المبتدئ',
    titleEn: 'Beginner Balancer',
    descriptionAr: 'توازن المعادلات الكيميائية البسيطة',
    descriptionEn: 'Balance simple chemical equations',
    goal: 'Successfully balance 5 simple equations',
    points: 100,
  },
  {
    id: 'chem-intermediate-1',
    experimentId: 'balancing-chemical',
    difficulty: 'intermediate',
    titleAr: 'موازن متقدم',
    titleEn: 'Advanced Balancer',
    descriptionAr: 'توازن معادلات كيميائية معقدة',
    descriptionEn: 'Balance complex chemical equations',
    goal: 'Successfully balance 5 complex equations without hints',
    points: 250,
    unlockedBy: 'score',
    minScoreRequired: 75,
  },
  {
    id: 'chem-advanced-1',
    experimentId: 'balancing-chemical',
    difficulty: 'advanced',
    titleAr: 'خبير التفاعلات',
    titleEn: 'Reaction Expert',
    descriptionAr: 'أتقن توازن المعادلات الكيميائية الصعبة جداً',
    descriptionEn: 'Master extremely difficult chemical balancing',
    goal: 'Balance 10 super-complex equations with perfect precision',
    points: 500,
    unlockedBy: 'score',
    minScoreRequired: 90,
  },

  // Photosynthesis challenges
  {
    id: 'photo-basic-1',
    experimentId: 'photosynthesis',
    difficulty: 'basic',
    titleAr: 'اكتشف التمثيل الضوئي',
    titleEn: 'Discover Photosynthesis',
    descriptionAr: 'تعلم كيفية تحويل الضوء إلى طاقة',
    descriptionEn: 'Learn how light transforms into energy',
    goal: 'Complete the experiment and answer all questions',
    points: 100,
  },
  {
    id: 'photo-intermediate-1',
    experimentId: 'photosynthesis',
    difficulty: 'intermediate',
    titleAr: 'تحسين الإنتاجية',
    titleEn: 'Optimize Production',
    descriptionAr: 'زد إنتاج الجلوكوز بتعديل الظروف',
    descriptionEn: 'Increase glucose production by adjusting conditions',
    goal: 'Produce maximum glucose by optimizing light and CO2',
    points: 250,
    unlockedBy: 'score',
    minScoreRequired: 70,
  },
  {
    id: 'photo-advanced-1',
    experimentId: 'photosynthesis',
    difficulty: 'advanced',
    titleAr: 'عالم النبات',
    titleEn: 'Plant Scientist',
    descriptionAr: 'أتقن جميع جوانب التمثيل الضوئي',
    descriptionEn: 'Master all aspects of photosynthesis',
    goal: 'Optimize photosynthesis under 5 different environmental conditions',
    points: 500,
    unlockedBy: 'score',
    minScoreRequired: 85,
  },
];

export function getChallengesByExperiment(experimentId: string): Challenge[] {
  return challenges.filter((c) => c.experimentId === experimentId);
}

export function getChallengesByDifficulty(experimentId: string, difficulty: Difficulty): Challenge[] {
  return challenges.filter((c) => c.experimentId === experimentId && c.difficulty === difficulty);
}

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}
