# 🚀 Deployment Guide - ADmyBRAND Analytics Dashboard

## Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"

2. **Import Repository**
   - Select your `ai-analytics-dashboard` repository
   - Vercel will automatically detect it's a React app

3. **Configure Settings**
   ```json
   {
     "framework": "vite",
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Option 2: Netlify

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your GitHub repository

3. **Configure Build Settings**
   ```yaml
   build:
     command: npm run build
     publish: dist
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/ai-analytics-dashboard"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Variables

### For Production
Create a `.env.production` file:
```env
VITE_APP_TITLE=ADmyBRAND Analytics Dashboard
VITE_APP_VERSION=1.0.0
```

### For Development
Create a `.env.development` file:
```env
VITE_APP_TITLE=ADmyBRAND Analytics Dashboard (Dev)
VITE_APP_VERSION=1.0.0-dev
```

## Build Optimization

### 1. Optimize Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze
```

### 2. Enable Compression
Add to your server configuration:
```nginx
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 3. Cache Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
```

## Performance Monitoring

### 1. Lighthouse Audit
- Run Lighthouse audit on deployed site
- Aim for 90+ scores in all categories
- Optimize based on recommendations

### 2. Core Web Vitals
Monitor these metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 3. Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})
```

## Security Considerations

### 1. Content Security Policy
Add to your HTML:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

### 2. HTTPS Only
Ensure your deployment uses HTTPS:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- GitHub Pages: Automatic HTTPS

### 3. Environment Variables
Never commit sensitive data:
```bash
# .gitignore
.env
.env.local
.env.production
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Charts Not Rendering**
   - Check if Recharts is properly installed
   - Verify data format matches chart expectations
   - Ensure container has proper dimensions

3. **Dark Mode Not Working**
   - Check localStorage permissions
   - Verify CSS custom properties are defined
   - Test in incognito mode

4. **Mobile Responsiveness Issues**
   - Test on actual devices
   - Check viewport meta tag
   - Verify Tailwind responsive classes

### Performance Issues

1. **Slow Loading**
   - Enable code splitting
   - Optimize images
   - Use lazy loading for charts

2. **Large Bundle Size**
   - Analyze with bundle analyzer
   - Remove unused dependencies
   - Use dynamic imports

## Monitoring & Analytics

### 1. Error Tracking
Add Sentry for error monitoring:
```bash
npm install @sentry/react @sentry/tracing
```

### 2. Performance Monitoring
Add Google Analytics or similar:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 3. Uptime Monitoring
- Set up uptime monitoring with UptimeRobot
- Configure alerts for downtime
- Monitor response times

## Post-Deployment Checklist

- [ ] **Functionality Test**
  - [ ] All charts render correctly
  - [ ] Dark mode toggle works
  - [ ] Search and filtering work
  - [ ] Export functionality works
  - [ ] Mobile responsiveness verified

- [ ] **Performance Test**
  - [ ] Lighthouse audit passed
  - [ ] Core Web Vitals within limits
  - [ ] Bundle size optimized
  - [ ] Loading times acceptable

- [ ] **Security Test**
  - [ ] HTTPS enabled
  - [ ] CSP headers set
  - [ ] No sensitive data exposed
  - [ ] Environment variables secure

- [ ] **Cross-Browser Test**
  - [ ] Chrome/Chromium
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Mobile Test**
  - [ ] iOS Safari
  - [ ] Android Chrome
  - [ ] Responsive design verified
  - [ ] Touch interactions work

## Support & Maintenance

### Regular Maintenance
- **Weekly**: Check for dependency updates
- **Monthly**: Review performance metrics
- **Quarterly**: Security audit and updates

### Monitoring Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: User behavior and traffic analysis

---

**Deployment Status**: ✅ Ready for Production  
**Recommended Platform**: Vercel  
**Estimated Deploy Time**: 5-10 minutes  
**Monitoring**: Enabled with error tracking 