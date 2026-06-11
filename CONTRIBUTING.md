# دليل المساهمة | Contributing Guide

شكراً لاهتمامك بالمساهمة في المعمل الافتراضي!

## خطوات المساهمة | How to Contribute

### 1. Fork المشروع
```bash
# انسخ المستودع إلى حسابك على GitHub
# https://github.com/EzmOdeus/v0-virtual-lab-with-pwa/fork
```

### 2. استنساخ المستودع
```bash
git clone https://github.com/YOUR_USERNAME/v0-virtual-lab-with-pwa.git
cd v0-virtual-lab-with-pwa
```

### 3. إنشاء branch جديد
```bash
git checkout -b feature/your-feature-name
# أو للإصلاحات
git checkout -b fix/your-fix-name
```

### 4. اعمل على التحسينات
```bash
# اعمل على الملفات الخاصة بك
pnpm dev  # شغّل خادم التطوير
```

### 5. اختبر التغييرات
```bash
# افتح http://localhost:3000 واختبر
# استخدم DevTools للتحقق من الأخطاء
```

### 6. Commit التغييرات
```bash
git add .
git commit -m "feat: وصف التغيير الخاص بك"
```

### معايير Commit | Commit Message Standards
- `feat:` للميزات الجديدة
- `fix:` لإصلاح الأخطاء
- `docs:` لتحديثات التوثيق
- `style:` لتنسيق الكود
- `refactor:` لتحسينات الكود
- `test:` لإضافة اختبارات
- `chore:` لتحديثات البناء/الأدوات

### 7. Push التغييرات
```bash
git push origin feature/your-feature-name
```

### 8. إنشاء Pull Request
- اذهب إلى GitHub
- اختر branch الخاص بك
- اضغط على "New Pull Request"
- اكتب وصفاً مفصلاً للتغييرات

## معايير الكود | Code Standards

### TypeScript
```typescript
// استخدم أنواع واضحة
const getUserName = (id: string): string => {
  return 'name';
};

// تجنب any
const data: any = {}; // ❌ لا تستخدم

// استخدم interfaces
interface User {
  id: string;
  name: string;
}
```

### React
```typescript
// استخدم Functional Components
export const MyComponent = () => {
  return <div>Hello</div>;
};

// استخدم React Hooks
const [count, setCount] = useState(0);

// قسّم المكونات الكبيرة
// الملف الواحد < 300 سطر
```

### Styling
```typescript
// استخدم Tailwind CSS
<div className="flex items-center gap-4 p-4">
  {/* محتوى */}
</div>

// تجنب inline styles
// <div style={{color: 'red'}}> ❌

// استخدم dark mode classes
<div className="bg-white dark:bg-slate-900">
```

## أنواع المساهمات المقبولة | Types of Contributions Accepted

### ✓ مرحب بها | Welcome
- [ ] ميزات جديدة
- [ ] إصلاح الأخطاء
- [ ] تحسينات الأداء
- [ ] تحسينات التوثيق
- [ ] تحسينات الاستجابة
- [ ] دعم اللغات
- [ ] تحسينات الأمان

### ✗ غير مرحب بها | Not Welcome
- [ ] تغييرات كبيرة بدون نقاش سابق
- [ ] حذف ميزات موجودة
- [ ] تغييرات الترخيص
- [ ] إضافة متعلقات (dependencies) جديدة بدون ضرورة

## عملية المراجعة | Review Process

1. **التحقق التلقائي**: يتم التحقق من:
   - ESLint
   - TypeScript
   - Build success

2. **المراجعة اليدوية**: سيقوم المراجعون بـ:
   - قراءة الكود
   - اختبار الميزة
   - التحقق من التوثيق

3. **الموافقة والدمج**: بعد الموافقة:
   - سيتم دمج PR
   - سيتم إغلاق issue المرتبطة

## نصائح مفيدة | Helpful Tips

### قبل بدء العمل
- [ ] تحقق من Issues المفتوحة
- [ ] ناقش الفكرة في Issue قبل البدء
- [ ] اقرأ التوثيق الموجودة

### أثناء العمل
- [ ] أنشئ commits صغيرة ومنطقية
- [ ] اكتب رسائل commit واضحة
- [ ] اختبر الكود محلياً
- [ ] حافظ على معايير الكود

### عند الانتهاء
- [ ] اكتب وصفاً مفصلاً في PR
- [ ] أضف صوراً أو GIFs إن أمكن
- [ ] اذكر Issue ذات الصلة
- [ ] طلب من 1-2 شخص للمراجعة

## استكشاف الأخطاء | Troubleshooting

### المشكلة: Merge Conflict
```bash
# تحديث branch الخاص بك
git fetch origin
git rebase origin/main

# حل الـ conflicts يدوياً
# ثم push مجدداً
git push origin feature/your-feature-name -f
```

### المشكلة: PR Checks فشلت
```bash
# تشغيل نفس الفحوصات محلياً
pnpm lint
pnpm build
```

## الاتصال | Communication

- GitHub Issues للأسئلة
- GitHub Discussions للنقاش
- Email للمسائل السرية

## الشكر | Thank You

شكراً على المساهمة! مساهمتك تساعد في جعل المعمل الافتراضي أفضل! 🙏

---

**آخر تحديث:** 2026-06-10
