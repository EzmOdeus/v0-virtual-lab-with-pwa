# المعمل الافتراضي | Virtual Laboratory

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Active-brightgreen.svg)

## نظرة عامة | Overview

**المعمل الافتراضي** هو منصة تعليمية تفاعلية تقدم تجارب علمية واقعية في الفيزياء والكيمياء والأحياء. تم تطويره كمشروع تخرج شامل يدمج التعليم التفاعلي مع التحليلات المتقدمة.

**Virtual Laboratory** is an interactive educational platform offering real science experiments in Physics, Chemistry, and Biology. Developed as a comprehensive graduation project integrating interactive learning with advanced analytics.

## الميزات الرئيسية | Key Features

### 1. التجارب التفاعلية | Interactive Experiments
- 11 تجربة علمية متقدمة من PhET Interactive Simulations
- تجارب في 3 مجالات: الفيزياء (4)، الكيمياء (4)، الأحياء (3)
- محاكاة واقعية وتفاعلية تماماً
- دعم كامل للعربية والإنجليزية

### 2. نظام الأسئلة التفاعلية | Interactive Quiz System
- اختبارات قبلية (Pre-Test) وبعدية (Post-Test)
- أسئلة متعددة الخيارات وصواب/خطأ
- تقييم فوري مع شرح الإجابات
- تتبع درجات الطالب وتقدمه

### 3. نظام التحديات المتقدم | Challenge System
- 3 مستويات صعوبة: أساسي (100 نقطة)، متوسط (250 نقطة)، متقدم (500 نقطة)
- 15 تحدي موزع على التجارب المختلفة
- فتح تدريجي للتحديات حسب الأداء
- نظام النقاط والإنجازات

### 4. لوحة التحليلات | Analytics Dashboard
- إحصائيات شاملة عن الأداء
- رسوم بيانية متقدمة:
  - خط بياني للتقدم عبر الوقت
  - رسم بياني دائري لاستكمال التحديات
  - رسم بياني عمودي لأداء التجارب
- توصيات ذكية حسب نقاط الضعف
- مقارنة الأداء مع المتوسط

### 5. تطبيق ويب متقدم | Progressive Web App
- يعمل بدون إنترنت (Offline Mode)
- قابل للتثبيت كتطبيق على الهاتف
- تزامن تلقائي للبيانات
- تخزين محلي آمن

### 6. ثنائي اللغة | Bilingual Interface
- دعم كامل للعربية والإنجليزية
- تبديل سلس بين اللغات
- ترجمة شاملة لجميع المحتوى
- اتجاهات صحيحة (RTL/LTR)

## البنية التقنية | Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Hooks + localStorage

### Backend
- **Database**: localStorage (Client-side)
- **Authentication**: Client-side only (no auth required)
- **Server**: Next.js API Routes

### Deployment
- **Platform**: Vercel
- **Git**: GitHub
- **CI/CD**: Vercel Deployments

## التثبيت والتشغيل | Installation & Setup

### المتطلبات | Prerequisites
- Node.js 18+ 
- pnpm (أو npm/yarn)
- متصفح حديث

### خطوات التثبيت | Installation Steps

```bash
# 1. استنساخ المشروع
git clone https://github.com/EzmOdeus/v0-virtual-lab-with-pwa.git
cd v0-virtual-lab-with-pwa

# 2. تثبيت المتعلقات
pnpm install

# 3. تشغيل خادم التطوير
pnpm dev

# 4. فتح في المتصفح
open http://localhost:3000
```

### البناء للإنتاج | Production Build

```bash
# البناء
pnpm build

# التشغيل
pnpm start
```

## هيكل المشروع | Project Structure

```
v0-virtual-lab-with-pwa/
├── app/
│   ├── analytics/               # صفحة التحليلات
│   │   └── page.tsx
│   ├── experiment/[id]/         # صفحة التجربة الفردية
│   │   └── page.tsx
│   ├── experiments/             # صفحة التجارب
│   │   └── page.tsx
│   ├── layout.tsx              # التخطيط الرئيسي
│   ├── page.tsx                # الصفحة الرئيسية
│   └── globals.css             # الأنماط العامة
│
├── components/
│   ├── AnalyticsDashboard.tsx   # لوحة التحليلات
│   ├── ChallengeCard.tsx        # بطاقة التحدي
│   ├── DifficultySelector.tsx   # محدد الصعوبة
│   ├── ExperimentsGrid.tsx      # شبكة التجارب
│   ├── ExperimentCard.tsx       # بطاقة التجربة
│   ├── Header.tsx              # الرأس/الملاح
│   ├── QuestionCard.tsx        # بطاقة السؤال
│   ├── QuizModal.tsx           # نافذة الاختبار
│   ├── QuizResults.tsx         # نتائج الاختبار
│   └── ServiceWorkerInitializer.tsx  # تهيئة خدمة الويب
│
├── lib/
│   ├── experiments.ts          # بيانات التجارب
│   ├── levels.ts               # بيانات المستويات والتحديات
│   ├── questions.ts            # بيانات الأسئلة
│   └── storage.ts              # خدمة التخزين المحلي
│
├── public/
│   ├── manifest.json           # ملف PWA
│   ├── sw.js                   # Service Worker
│   ├── favicon.jpg             # أيقونة التطبيق
│   ├── logo.jpg                # شعار المعمل
│   ├── physics-icon.jpg        # أيقونة الفيزياء
│   ├── chemistry-icon.jpg      # أيقونة الكيمياء
│   └── biology-icon.jpg        # أيقونة الأحياء
│
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── vercel.json
```

## الميزات بالتفصيل | Features in Detail

### 1. صفحة التجارب | Experiments Page
- عرض شبكة من 11 تجربة
- تصفية حسب الفئة (الفيزياء، الكيمياء، الأحياء)
- بحث فوري عن التجارب
- عرض معلومات التجربة (الوصف، الفئة، الصعوبة)

### 2. صفحة التجربة الفردية | Experiment Detail Page
- محاكاة تفاعلية كاملة (iframe من PhET)
- قسم الأسئلة مع اختبارات قبلية وبعدية
- قسم التحديات مع اختيار الصعوبة
- معلومات تفصيلية عن التجربة
- تتبع تقدم الطالب

### 3. نظام التحديات | Challenge System
تحديات في مستويات مختلفة:

**المستوى الأساسي (Basic)** - 100 نقطة
- تجارب بسيطة وموجهة
- 3 أسئلة سهلة
- مناسب للمبتدئين

**المستوى المتوسط (Intermediate)** - 250 نقطة
- تحديات متقدمة أكثر
- 3 أسئلة متوسطة
- يتطلب 70% من الأساسي

**المستوى المتقدم (Advanced)** - 500 نقطة
- تحديات معقدة
- 3 أسئلة صعبة
- يتطلب 70% من المتوسط

### 4. لوحة التحليلات | Analytics Dashboard
عرض شامل لإحصائيات الطالب:

**الإحصائيات الرئيسية:**
- عدد التجارب المحاولة
- عدد التحديات المكتملة
- إجمالي النقاط المكسوبة
- متوسط درجات الاختبارات

**الرسوم البيانية:**
- خط بياني: تطور الأداء عبر الوقت
- رسم دائري: استكمال التحديات
- رسم عمودي: أداء كل تجربة

**التوصيات:**
- تحديد المجالات القوية
- تحديد مجالات التحسين
- توصيات مخصصة للدراسة

## نظام البيانات | Data System

### التخزين | Storage
جميع البيانات تُخزن محلياً في localStorage:

```
virtual-lab-quiz-stats       # نتائج الاختبارات
virtual-lab-challenges       # تقدم التحديات
virtual-lab-analytics        # بيانات الأداء الشاملة
```

### البيانات المحفوظة | Stored Data

**Quiz Stats:**
```typescript
{
  experimentId: string;
  preTestCompleted: boolean;
  preTestScore: number;
  postTestCompleted: boolean;
  postTestScore: number;
  improvement: number;
}
```

**Challenge Progress:**
```typescript
{
  challengeId: string;
  experimentId: string;
  completed: boolean;
  attempts: number;
  bestScore?: number;
  completedAt?: number;
}
```

**Analytics:**
```typescript
{
  experimentId: string;
  timestamp: number;
  stage: 'pre' | 'post';
  score: number;
  totalQuestions: number;
  timeSpent: number;
}
```

## دليل الاستخدام | User Guide

### للطالب | For Students

1. **استكشاف التجارب**
   - اذهب إلى صفحة التجارب
   - اختر تجربة تهمك
   - اقرأ الوصف والمعلومات

2. **تنفيذ التجربة**
   - قم بالاختبار القبلي (Pre-Test)
   - نفّذ المحاكاة
   - أجب على الاختبار البعدي (Post-Test)
   - شاهد نتائجك

3. **قبول التحديات**
   - اختر مستوى الصعوبة
   - اقبل التحدي
   - أكمل المهام المطلوبة
   - احصل على النقاط

4. **متابعة التقدم**
   - اذهب إلى صفحة التحليلات
   - شاهد إحصائياتك
   - اقرأ التوصيات
   - خطط للدراسة القادمة

### للمعلم | For Teachers
(ميزات مستقبلية)
- إدارة الطلاب
- تعيين التجارب
- مراقبة التقدم
- تقارير الأداء

## الأمان والخصوصية | Security & Privacy

- بدون تسجيل دخول مطلوب
- بدون جمع بيانات شخصية
- جميع البيانات محفوظة محلياً
- بدون تتبع أو إعلانات
- HTTPS للنشر

## المتطلبات الكهربائية | Browser Requirements

### المتصفحات المدعومة | Supported Browsers
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### الميزات المطلوبة | Required Features
- ES6+ JavaScript
- localStorage API
- Service Workers (للـ PWA)
- CSS Grid/Flexbox

## الأداء | Performance

### Metrics
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Interaction to Next Paint (INP): < 100ms

### Optimization
- Next.js Image Optimization
- Code Splitting
- Service Worker Caching
- Lazy Loading Components

## التطوير | Development

### Linting & Formatting
```bash
# ESLint
pnpm lint

# Format
pnpm format
```

### Build
```bash
# Development build
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm start
```

### Debugging
- استخدم `console.log("[v0] message")`
- افتح DevTools (F12)
- تحقق من Network/Storage/Console

## الترخيص | License

MIT License - انظر LICENSE.md للتفاصيل

## المساهمة | Contributing

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. أنشئ branch جديد
3. اعمل على التحسينات
4. اعمل Commit وPush
5. أنشئ Pull Request

## الدعم | Support

للأسئلة أو المشاكل:
- اترك Issue على GitHub
- أرسل بريد إلكتروني

## التطوير المستقبلي | Future Plans

- [ ] نظام المستخدمين والحسابات
- [ ] لوحة تحكم المعلم
- [ ] مزيد من التجارب
- [ ] نسخة mobile app
- [ ] التكامل مع LMS
- [ ] شهادات الإكمال
- [ ] تعاون بين الطلاب
- [ ] محاكاة متقدمة

## المراجع | References

- [PhET Interactive Simulations](https://phet.colorado.edu)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

## الشكر والتقدير | Credits

تم تطوير هذا المشروع كمشروع تخرج شامل يجمع بين:
- تعليم علمي فعّال
- تقنيات ويب حديثة
- تصميم متقدم
- تحليلات ذكية

---

**تم آخر تحديث:** 2026-06-10

**النسخة الحالية:** 1.0.0

**الحالة:** متاح للاستخدام الفوري ✓
