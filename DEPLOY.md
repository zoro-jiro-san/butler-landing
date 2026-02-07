# Butler Landing Page - Deployment Guide

## 🚀 Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository details:
   - **Name**: `butler-landing` 
   - **Description**: `Professional landing page for Butler - AI Agent Treasury & Orchestration (Circle USDC Hackathon submission)`
   - **Visibility**: Public ✅
   - **Initialize**: Don't initialize (we already have files)

### Step 2: Connect Local Repository

```bash
cd butler-landing
git remote add origin https://github.com/YOUR_USERNAME/butler-landing.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section in left sidebar
4. **Source**: Deploy from a branch
5. **Branch**: main / (root)
6. Click **Save**

### Step 4: Configure Custom Domain (Optional)

1. In Pages settings, add custom domain: `butler-ai.github.io`
2. Wait for DNS check ✅
3. Enable "Enforce HTTPS" ✅

### Step 5: Verify Deployment

- **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/butler-landing/`
- **Custom Domain** (if set): `https://butler-ai.github.io`
- **Build Status**: Check Actions tab for deployment status

---

## 🔧 Alternative Deployment Options

### Vercel (Recommended Alternative)

```bash
npm install -g vercel
cd butler-landing
vercel --prod
```

### Netlify

1. Drag `butler-landing/` folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect GitHub repository for auto-deploy

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Custom Server

Upload the entire `butler-landing/` directory to your web server root.

---

## 📊 Post-Deployment Checklist

- [ ] **Page loads correctly** - Visit deployed URL
- [ ] **Mobile responsive** - Test on mobile device  
- [ ] **Interactive demos work** - Click demo tabs
- [ ] **All links functional** - GitHub, docs, vote buttons
- [ ] **Performance check** - Load time < 3 seconds
- [ ] **SEO meta tags** - Check page source for meta tags
- [ ] **Favicon displays** - Look for Butler icon in browser tab

---

## 🚀 Hackathon Submission Steps

### 1. Repository Ready
- [ ] Public GitHub repository created
- [ ] Landing page live and accessible
- [ ] README.md with project description
- [ ] All source code committed

### 2. Update Main Butler Project
```bash
# In your main butler project
echo "🌐 **Landing Page**: https://YOUR_USERNAME.github.io/butler-landing/" >> README.md
git add README.md
git commit -m "Add landing page link"
git push
```

### 3. Submit to Moltbook
1. Go to [Moltbook.com](https://moltbook.com)
2. Create new post with `#USDCHackathon` tag
3. Include:
   - Landing page URL
   - GitHub repository links
   - Video demo (if available)
   - Clear project description

### 4. Share for Votes
- **Social Media**: Twitter, LinkedIn, Discord
- **Developer Communities**: Reddit, HackerNews
- **Hackathon Participants**: Vote on 5+ other projects first

---

## 🔧 Development Commands

```bash
# Local development server
npm run dev              # Python server on port 8000
npm run serve           # Node.js server on port 8000

# Code validation
python -m webbrowser http://localhost:8000  # Open in browser
```

---

## 🎯 Success Metrics

After deployment, monitor:

- **GitHub Stars**: Community interest indicator
- **Page Views**: Landing page traffic
- **Vote Count**: Hackathon voting progress
- **Load Speed**: Performance optimization
- **Mobile UX**: Responsive design validation

---

## 🚨 Troubleshooting

### GitHub Pages Not Loading

1. Check repository settings → Pages → Source = "main branch"
2. Verify `index.html` exists in root directory
3. Wait 5-10 minutes for propagation
4. Check Actions tab for build errors

### Custom Domain Issues

1. Verify CNAME file contains correct domain
2. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
3. Ensure domain points to: `USERNAME.github.io`

### 404 Errors

1. File paths are case-sensitive on GitHub Pages
2. Check all asset links in HTML (images, CSS, JS)
3. Verify directory structure matches references

### Mobile Layout Issues

1. Test on real devices, not just browser devtools
2. Check viewport meta tag is present
3. Validate CSS media queries work correctly

---

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check README.md for details
- **Hackathon Discord**: Ask in USDC hackathon channels

---

**🏆 Ready to win the hackathon! Deploy now and start collecting votes!**