'use client';

import { useState } from 'react';
import { Question, getQuestionById } from '@/lib/questions';
import { saveQuizSession, generateSessionId, QuizAnswer } from '@/lib/storage';
import { QuestionCard } from './QuestionCard';
import { QuizResults } from './QuizResults';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  experimentId: string;
  stage: 'pre' | 'post';
  language: 'ar' | 'en';
}

export function QuizModal({
  isOpen,
  onClose,
  questions,
  experimentId,
  stage,
  language,
}: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (selectedAnswer: string) => {
    const question = currentQuestion;
    const questionData = getQuestionById(question.id);
    
    let isCorrect = false;
    if (question.type === 'mcq' && question.options) {
      isCorrect = question.options.some(
        (opt) =>
          (language === 'ar' ? opt.textAr : opt.textEn) === selectedAnswer &&
          opt.isCorrect
      );
    } else if (question.type === 'truefalse') {
      const correctAnswer = 'true'; // In a real app, this would be in the data
      isCorrect = selectedAnswer === correctAnswer;
    }

    const newAnswer: QuizAnswer = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
      timestamp: Date.now(),
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate score
      const score = updatedAnswers.filter((a) => a.isCorrect).length;
      
      // Save session
      const session = {
        id: generateSessionId(),
        experimentId,
        stage,
        answers: updatedAnswers,
        score,
        totalQuestions: questions.length,
        completedAt: Date.now(),
        startedAt: Date.now() - 60000, // Approximate start time
      };

      saveQuizSession(session);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion && answers.length > currentQuestionIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    onClose();
  };

  if (showResults) {
    const score = answers.filter((a) => a.isCorrect).length;
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        stage={stage}
        language={language}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-900 p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {language === 'ar'
                ? stage === 'pre'
                  ? 'اختبار قبلي'
                  : 'اختبار بعدي'
                : stage === 'pre'
                ? 'Pre-Test'
                : 'Post-Test'}
            </h2>
            <p className="text-sm text-slate-400">
              {language === 'ar' ? 'اختبر معرفتك بالتجربة' : 'Test your knowledge about this experiment'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {language === 'ar'
              ? `السؤال ${currentQuestionIndex + 1} من ${questions.length}`
              : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
          </p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            language={language}
            disabled={answers.length > currentQuestionIndex}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {language === 'ar' ? 'السابق' : 'Previous'}
          </button>

          <button
            onClick={handleNext}
            disabled={!isLastQuestion && answers.length <= currentQuestionIndex}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLastQuestion
              ? language === 'ar'
                ? 'إرسال'
                : 'Submit'
              : language === 'ar'
              ? 'التالي'
              : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
