# المتطلبات والتثبيت | Requirements & Installation

## متطلبات النظام | System Requirements

### تم اختباره على | Tested On
- Windows 10/11
- macOS 12+
- Linux (Ubuntu 20.04+)

### متطلبات البرامج | Software Requirements
- **Node.js**: 18.0.0 أو أحدث
- **npm**: 9.0.0 أو أحدث
- **pnpm**: 8.0.0 أو أحدث (موصى به)
- **Git**: 2.30.0 أو أحدث

### متطلبات المتصفح | Browser Requirements
- **Chrome/Chromium**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## متطلبات الأداء | Performance Requirements

### للتطوير | Development
- RAM: 4GB الحد الأدنى
- CPU: 2 أنوية
- مساحة التخزين: 500MB

### للإنتاج | Production
- RAM: 512MB
- CPU: 1 نوى
- bandwidth: 1Mbps

## خطوات التثبيت | Installation Steps

### 1. متطلبات Node.js | Installing Node.js

**Windows:**
- اذهب إلى https://nodejs.org
- حمّل LTS version
- شغّل المثبت واتبع الخطوات

**macOS:**
```bash
# باستخدام Homebrew
brew install node
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. تثبيت pnpm (اختياري ولكن موصى به) | Installing pnpm

```bash
npm install -g pnpm
```

### 3. استنساخ المستودع | Cloning Repository

```bash
git clone https://github.com/EzmOdeus/v0-virtual-lab-with-pwa.git
cd v0-virtual-lab-with-pwa
```

### 4. تثبيت المتعلقات | Installing Dependencies

```bash
# باستخدام pnpm (موصى به)
pnpm install

# أو باستخدام npm
npm install

# أو باستخدام yarn
yarn install
```

### 5. تشغيل خادم التطوير | Running Development Server

```bash
pnpm dev
```

ثم افتح http://localhost:3000 في متصفحك

## متطلبات الميزات | Feature Requirements

### الأسئلة التفاعلية
- localStorage بسعة 5MB
- دعم JavaScript ES6+

### التحليلات
- Canvas API (للرسوم البيانية)
- localStorage

### PWA
- HTTPS في الإنتاج
- Service Worker support
- Web App Manifest

## متطلبات الأداء | Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |
| First Input Delay (FID) | < 100ms |

## متطلبات الأمان | Security Requirements

- HTTPS في الإنتاج
- بدون بيانات شخصية
- Content Security Policy
- بدون تتبع أو أدوات تحليل خارجية

## متطلبات التوافقية | Compatibility Requirements

### JavaScript
- ES6+ support required
- Async/await support
- Template literals support

### CSS
- CSS Grid support
- CSS Flexbox support
- CSS Variables support

### APIs
- localStorage API
- Service Worker API
- Fetch API
- JSON API

## استكشاف الأخطاء | Troubleshooting Installation

### خطأ: Node not found
```bash
# تحقق من التثبيت
node --version
npm --version

# إذا لم يعمل، أعد تثبيت Node.js
```

### خطأ: port 3000 already in use
```bash
# استخدم port مختلف
pnpm dev -- -p 3001
```

### خطأ: Memory limit exceeded
```bash
# زد حد الذاكرة
export NODE_OPTIONS=--max-old-space-size=4096
pnpm build
```

### خطأ: npm ERR! code ERESOLVE
```bash
# استخدم npm install مع --legacy-peer-deps
npm install --legacy-peer-deps
```

## التحديثات | Updates

### تحديث المتعلقات | Updating Dependencies

```bash
# تحديث جميع المتعلقات
pnpm update

# تحديث معين
pnpm update package-name@latest
```

### تحديث Node.js | Updating Node.js

```bash
# الحصول على أحدث إصدار
node --version

# اذهب إلى https://nodejs.org وحمّل الإصدار الأحدث
```

## التنظيف | Cleanup

```bash
# مسح المتعلقات والـ cache
pnpm install --force

# إعادة تثبيت شاملة
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

**آخر تحديث:** 2026-06-10
