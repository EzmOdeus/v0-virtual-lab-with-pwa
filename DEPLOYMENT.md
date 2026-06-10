# دليل النشر | Deployment Guide

## نشر على Vercel | Deploying to Vercel

### المتطلبات | Prerequisites
- حساب GitHub
- حساب Vercel
- المستودع على GitHub

### خطوات النشر | Deployment Steps

#### 1. ربط المستودع
```bash
# تسجيل الدخول إلى Vercel
npx vercel login

# ربط المشروع
npx vercel link
```

#### 2. نشر عرض توضيحي | Preview Deployment
```bash
# نشر تلقائي عند كل push
npx vercel
```

#### 3. التحقق من النشر | Verifying Deployment

```bash
# اختبر الـ build محلياً أولاً
pnpm build
pnpm start
```

## البناء للإنتاج | Production Build

```bash
# إنشاء build الإنتاج
pnpm build

# اختبار محلياً
pnpm start
```

## المراقبة | Monitoring

### الأداء
- أداة Lighthouse
- Web Vitals
- Vercel Analytics

### الأخطاء
- Vercel Error Logs
- Sentry (اختياري)

---

**آخر تحديث:** 2026-06-10
