# دليل التطوير | Development Guide

## بيئة التطوير | Development Environment

### متطلبات النظام | System Requirements
- Node.js 18.0.0 أو أحدث
- pnpm 8.0.0 أو أحدث (يمكن استخدام npm أو yarn)
- Git للتحكم بالإصدارات
- محرر كود (VS Code موصى به)

### إعداد بيئة التطوير | Setting Up

```bash
# 1. استنساخ المستودع
git clone https://github.com/EzmOdeus/v0-virtual-lab-with-pwa.git
cd v0-virtual-lab-with-pwa

# 2. تثبيت المتعلقات
pnpm install

# 3. تشغيل خادم التطوير
pnpm dev

# 4. فتح http://localhost:3000 في المتصفح
```

## معايير الكود | Code Standards

### TypeScript
- استخدم أنواع واضحة ودقيقة
- تجنب `any` ما أمكن
- استخدم interfaces للبيانات الكبيرة

### React
- استخدم Functional Components
- استخدم React Hooks للحالة والتأثيرات
- قسّم المكونات الكبيرة إلى مكونات أصغر
- استخدم memo للتحسينات

### Styling
- استخدم Tailwind CSS classes
- تجنب CSS مباشر إن أمكن
- استخدم dark: و md: للاستجابة
- اتبع نمط التصميم الحالي

## هيكل الملفات | File Structure

### المجلد `lib/`
يحتوي على المنطق التجاري والبيانات:
- `experiments.ts` - بيانات التجارب
- `questions.ts` - بيانات الأسئلة
- `levels.ts` - بيانات المستويات والتحديات
- `storage.ts` - خدمات التخزين المحلي

### المجلد `components/`
يحتوي على مكونات React قابلة لإعادة الاستخدام:
- مكونات مستقلة بذاتها
- لا تحتوي على منطق صفحة
- قابلة للتوسع

### المجلد `app/`
يحتوي على الصفحات والتوجيه:
- `(group)/` للصفحات المجموعة
- `[id]/` للمسارات الديناميكية
- `layout.tsx` للتخطيط الأساسي

## العمل مع البيانات | Working with Data

### إضافة تجربة جديدة | Adding New Experiment

```typescript
// في lib/experiments.ts
{
  id: 'new-experiment',
  titleAr: 'عنوان التجربة',
  titleEn: 'Experiment Title',
  descriptionAr: 'الوصف',
  descriptionEn: 'Description',
  category: 'physics',
  difficulty: 'intermediate',
  url: 'https://phet.colorado.edu/...',
}
```

### إضافة أسئلة جديدة | Adding New Questions

```typescript
// في lib/questions.ts
{
  id: 'q-1',
  experimentId: 'experiment-id',
  stage: 'pre',
  type: 'multiple-choice',
  questionAr: 'ما هو السؤال؟',
  questionEn: 'What is the question?',
  options: [...],
  correctOption: 0,
}
```

### إضافة تحدي جديد | Adding New Challenge

```typescript
// في lib/levels.ts
{
  id: 'challenge-1',
  experimentId: 'experiment-id',
  difficulty: 'basic',
  titleAr: 'عنوان التحدي',
  titleEn: 'Challenge Title',
  points: 100,
}
```

## العمل مع التخزين | Working with Storage

### حفظ بيانات الاختبار | Saving Quiz Data

```typescript
import { saveQuizData, getExperimentQuizStats } from '@/lib/storage';

// حفظ
saveQuizData({
  experimentId: 'density',
  stage: 'pre',
  score: 75,
  totalQuestions: 3,
  correctAnswers: 2,
});

// استرجاع
const stats = getExperimentQuizStats('density');
```

### حفظ بيانات التحديات | Saving Challenge Data

```typescript
import { saveChallengeProgress } from '@/lib/storage';

// حفظ
saveChallengeProgress({
  challengeId: 'challenge-1',
  experimentId: 'density',
  completed: true,
  attempts: 3,
  bestScore: 95,
});
```

### الوصول إلى التحليلات | Accessing Analytics

```typescript
import { getAnalyticsData, getOverallStats } from '@/lib/storage';

// جميع البيانات
const allData = getAnalyticsData();

// بيانات التجربة
const expData = getAnalyticsData().filter(d => d.experimentId === 'density');

// الإحصائيات الشاملة
const stats = getOverallStats(experiments);
```

## الصفحات والتوجيه | Pages & Routing

### الصفحات الموجودة | Existing Pages
- `/` - الصفحة الرئيسية
- `/experiments` - قائمة التجارب
- `/experiment/[id]` - صفحة التجربة الفردية
- `/analytics` - لوحة التحليلات

### إضافة صفحة جديدة | Adding New Page

```typescript
// app/new-page/page.tsx
'use client';

import { Header } from '@/components/Header';

export default function NewPage() {
  return (
    <>
      <Header language="ar" onLanguageChange={() => {}} />
      {/* المحتوى */}
    </>
  );
}
```

## التصحيح والاختبار | Debugging & Testing

### تفعيل سجلات التصحيح | Enabling Debug Logs

```typescript
console.log('[v0] Message:', variable);
```

### فتح أدوات المطور | Opening DevTools
- `F12` أو `Ctrl+Shift+I` (Windows/Linux)
- `Cmd+Option+I` (Mac)
- ثم انتقل إلى:
  - **Console** للسجلات والأخطاء
  - **Storage** لرؤية localStorage
  - **Network** لرؤية الطلبات

### اختبار الميزات | Testing Features

```typescript
// في console
localStorage.setItem('virtual-lab-quiz-stats', JSON.stringify({
  experimentId: 'density',
  preTestScore: 80,
}));

// تحديث الصفحة
location.reload();
```

## الأداء | Performance Optimization

### أفضل الممارسات | Best Practices
1. استخدم `React.memo` للمكونات التي لا تتغير كثيراً
2. استخدم `useMemo` و `useCallback` عند الحاجة
3. تجنب الحسابات الثقيلة في الـ render
4. استخدم الـ Code Splitting

### قياس الأداء | Measuring Performance

```typescript
// استخدم React DevTools Profiler
// أو استخدم Web Vitals

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## النشر | Deployment

### نشر على Vercel | Deploy to Vercel

```bash
# ربط مع Vercel
vercel link

# نشر
vercel deploy

# إنتاج
vercel deploy --prod
```

### متغيرات البيئة | Environment Variables
أضف في `vercel.json` أو `.env.local`:
```
NEXT_PUBLIC_APP_NAME=Virtual Lab
NEXT_PUBLIC_VERSION=1.0.0
```

## استكشاف الأخطاء | Troubleshooting

### المشكلة: الصفحة بيضاء
**الحل:**
- افتح DevTools (F12)
- تحقق من console للأخطاء
- تحقق من أن localhost:3000 يعمل

### المشكلة: localStorage لا يحفظ
**الحل:**
- تحقق من وضع التصفح الخاص (Private Mode)
- تحقق من سعة التخزين المتاحة
- استخدم `localStorage.setItem()` بدلاً من المباشر

### المشكلة: الرسوم البيانية لا تظهر
**الحل:**
- تحقق من تثبيت Recharts
- تحقق من البيانات (قد تكون فارغة)
- افتح DevTools لرؤية الأخطاء

## المراجع المفيدة | Useful References

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Docs](https://recharts.org/)

---

**آخر تحديث:** 2026-06-10
