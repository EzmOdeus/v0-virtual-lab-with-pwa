export type QuestionType = 'mcq' | 'truefalse' | 'shortanswer';

export interface QuestionOption {
  id: string;
  textAr: string;
  textEn: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  experimentId: string;
  type: QuestionType;
  questionAr: string;
  questionEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  options?: QuestionOption[];
  correctAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  stage: 'pre' | 'post'; // Pre-test or Post-test
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizSession {
  id: string;
  experimentId: string;
  stage: 'pre' | 'post';
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  completedAt: number;
  startedAt: number;
}

// Pre-test questions
const preDensityQuestions: Question[] = [
  {
    id: 'density-pre-1',
    experimentId: 'density',
    type: 'mcq',
    questionAr: 'ما هي الكثافة؟',
    questionEn: 'What is density?',
    descriptionAr: 'اختر التعريف الصحيح للكثافة',
    descriptionEn: 'Choose the correct definition of density',
    options: [
      {
        id: 'opt-1',
        textAr: 'كمية المادة في وحدة الحجم',
        textEn: 'The amount of matter in a unit of volume',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'وزن المادة الكلي',
        textEn: 'The total weight of matter',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'سرعة المادة في الحركة',
        textEn: 'The speed of matter in motion',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'لون المادة وشكلها',
        textEn: 'The color and shape of matter',
        isCorrect: false,
      },
    ],
    difficulty: 'easy',
    stage: 'pre',
  },
  {
    id: 'density-pre-2',
    experimentId: 'density',
    type: 'truefalse',
    questionAr: 'الماء له نفس الكثافة مثل الزيت',
    questionEn: 'Water has the same density as oil',
    difficulty: 'easy',
    stage: 'pre',
  },
];

const postDensityQuestions: Question[] = [
  {
    id: 'density-post-1',
    experimentId: 'density',
    type: 'mcq',
    questionAr: 'إذا كان لديك 100 مل من مادة تزن 200 جرام، ما كثافتها؟',
    questionEn: 'If you have 100 ml of a substance that weighs 200 grams, what is its density?',
    options: [
      {
        id: 'opt-1',
        textAr: '2 جرام/مل',
        textEn: '2 g/ml',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: '0.5 جرام/مل',
        textEn: '0.5 g/ml',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: '200 جرام/مل',
        textEn: '200 g/ml',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: '100 جرام/مل',
        textEn: '100 g/ml',
        isCorrect: false,
      },
    ],
    difficulty: 'medium',
    stage: 'post',
  },
  {
    id: 'density-post-2',
    experimentId: 'density',
    type: 'mcq',
    questionAr: 'لماذا تطفو الأجسام ذات الكثافة المنخفضة على الماء؟',
    questionEn: 'Why do objects with low density float on water?',
    options: [
      {
        id: 'opt-1',
        textAr: 'لأن قوة الطفو أكبر من وزنها',
        textEn: 'Because buoyant force is greater than its weight',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'لأنها خفيفة جداً',
        textEn: 'Because they are very light',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'لأن الماء ساخن',
        textEn: 'Because the water is hot',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'لا توجد إجابة صحيحة',
        textEn: 'None of the above',
        isCorrect: false,
      },
    ],
    difficulty: 'hard',
    stage: 'post',
  },
];

// Physics questions for other experiments
const preForceAndMotionQuestions: Question[] = [
  {
    id: 'forces-pre-1',
    experimentId: 'forces-motion',
    type: 'mcq',
    questionAr: 'ما هي القوة؟',
    questionEn: 'What is force?',
    options: [
      {
        id: 'opt-1',
        textAr: 'تأثير يغير أو يحاول تغيير حالة الجسم',
        textEn: 'An effect that changes or tries to change the state of an object',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'سرعة الجسم فقط',
        textEn: 'Only the speed of an object',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'وزن الجسم',
        textEn: 'The weight of an object',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'حجم الجسم',
        textEn: 'The size of an object',
        isCorrect: false,
      },
    ],
    difficulty: 'easy',
    stage: 'pre',
  },
];

const postForceAndMotionQuestions: Question[] = [
  {
    id: 'forces-post-1',
    experimentId: 'forces-motion',
    type: 'mcq',
    questionAr: 'وفقاً لقانون نيوتن الثالث، لكل فعل...',
    questionEn: 'According to Newton\'s third law, for every action...',
    options: [
      {
        id: 'opt-1',
        textAr: 'هناك رد فعل مساوي ومعاكس',
        textEn: 'There is an equal and opposite reaction',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'لا يوجد رد فعل',
        textEn: 'There is no reaction',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'رد فعل أضعف',
        textEn: 'A weaker reaction',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'رد فعل في نفس الاتجاه',
        textEn: 'A reaction in the same direction',
        isCorrect: false,
      },
    ],
    difficulty: 'medium',
    stage: 'post',
  },
];

// Chemistry questions
const preBalancingEquationsQuestions: Question[] = [
  {
    id: 'chem-pre-1',
    experimentId: 'balancing-chemical',
    type: 'truefalse',
    questionAr: 'يجب أن تكون عدد الذرات متساوية في طرفي المعادلة الكيميائية',
    questionEn: 'The number of atoms must be equal on both sides of a chemical equation',
    difficulty: 'easy',
    stage: 'pre',
  },
];

const postBalancingEquationsQuestions: Question[] = [
  {
    id: 'chem-post-1',
    experimentId: 'balancing-chemical',
    type: 'mcq',
    questionAr: 'عند موازنة معادلة كيميائية، ماذا نضيف للعناصر؟',
    questionEn: 'When balancing a chemical equation, what do we add to elements?',
    options: [
      {
        id: 'opt-1',
        textAr: 'معاملات (Coefficients)',
        textEn: 'Coefficients',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'أرقام تحتية (Subscripts)',
        textEn: 'Subscripts',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'أسس (Exponents)',
        textEn: 'Exponents',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'علامات سالبة',
        textEn: 'Negative signs',
        isCorrect: false,
      },
    ],
    difficulty: 'medium',
    stage: 'post',
  },
];

// Biology questions
const prePhotosynthesisQuestions: Question[] = [
  {
    id: 'bio-pre-1',
    experimentId: 'photosynthesis',
    type: 'mcq',
    questionAr: 'ما هو الغرض الرئيسي من عملية البناء الضوئي؟',
    questionEn: 'What is the main purpose of photosynthesis?',
    options: [
      {
        id: 'opt-1',
        textAr: 'تصنيع الغذاء من الماء وثاني أكسيد الكربون',
        textEn: 'Making food from water and carbon dioxide',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'تحطيم الغذاء',
        textEn: 'Breaking down food',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'تخزين الطاقة فقط',
        textEn: 'Storing energy only',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'تنقية الماء',
        textEn: 'Purifying water',
        isCorrect: false,
      },
    ],
    difficulty: 'easy',
    stage: 'pre',
  },
];

const postPhotosynthesisQuestions: Question[] = [
  {
    id: 'bio-post-1',
    experimentId: 'photosynthesis',
    type: 'mcq',
    questionAr: 'أين تحدث عملية البناء الضوئي في الخلية النباتية؟',
    questionEn: 'Where does photosynthesis occur in a plant cell?',
    options: [
      {
        id: 'opt-1',
        textAr: 'في البلاستيدات الخضراء (الكلوروبلاست)',
        textEn: 'In the chloroplasts',
        isCorrect: true,
      },
      {
        id: 'opt-2',
        textAr: 'في النواة',
        textEn: 'In the nucleus',
        isCorrect: false,
      },
      {
        id: 'opt-3',
        textAr: 'في الميتوكندريا',
        textEn: 'In the mitochondria',
        isCorrect: false,
      },
      {
        id: 'opt-4',
        textAr: 'في الفراغ بين الخلايا',
        textEn: 'In the space between cells',
        isCorrect: false,
      },
    ],
    difficulty: 'medium',
    stage: 'post',
  },
];

// Combine all questions
const allQuestions: Question[] = [
  ...preDensityQuestions,
  ...postDensityQuestions,
  ...preForceAndMotionQuestions,
  ...postForceAndMotionQuestions,
  ...preBalancingEquationsQuestions,
  ...postBalancingEquationsQuestions,
  ...prePhotosynthesisQuestions,
  ...postPhotosynthesisQuestions,
];

export function getQuestionsByExperiment(
  experimentId: string,
  stage: 'pre' | 'post'
): Question[] {
  return allQuestions.filter(
    (q) => q.experimentId === experimentId && q.stage === stage
  );
}

export function getQuestionById(questionId: string): Question | undefined {
  return allQuestions.find((q) => q.id === questionId);
}

export function getRandomQuestions(
  experimentId: string,
  stage: 'pre' | 'post',
  limit: number = 3
): Question[] {
  const questions = getQuestionsByExperiment(experimentId, stage);
  return questions.sort(() => Math.random() - 0.5).slice(0, limit);
}
