# 🎆 Happy New Year 2026 - Deployment Guide

## 🚀 Features

✅ **Real Countdown** - Automatically counts down to January 1, 2026  
✅ **2026 Text Fireworks** - Fireworks form the "2026" text on New Year's Eve  
✅ **Mobile Vibration** - Device vibrates when fireworks explode (Vibration API)  
✅ **Interactive Fireworks** - Click anywhere to trigger custom fireworks  
✅ **Hearts & Stars** - Multiple particle shapes (circles, hearts, stars)  
✅ **Background Music** - Celebration music with volume control  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Dark Mode UI** - Beautiful dark theme with neon glows  

## 🌐 Deploy to Netlify

### Option 1: Drag & Drop Deploy
1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Sign up or log in
4. Drag and drop the `dist` folder into Netlify
5. Your site will be live instantly!

### Option 2: Git-based Deploy (Recommended)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Select your repository
6. Netlify automatically detects `netlify.toml` and deploys!

**Auto-deploy:** Any push to main branch will automatically redeploy

## 🐙 Deploy to GitHub Pages

### Option 1: Automatic with GitHub Actions (Recommended)
1. Push your code to GitHub
2. Go to repo Settings → Pages
3. Select "GitHub Actions" as the deployment source
4. The workflow file at `.github/workflows/deploy.yml` will automatically deploy on every push to main

### Option 2: Manual Deploy
1. Build the project:
   ```bash
   npm run build
   ```
2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Update `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
4. Run deployment:
   ```bash
   npm run deploy
   ```

Your site will be available at: `https://yourusername.github.io/happy-new-year/`

## 📋 Configuration

### For GitHub Pages (if not using base: './')
Edit `vite.config.js`:
```javascript
export default {
  base: '/happy-new-year/', // Change to your repo name
}
```

### Netlify Configuration
The `netlify.toml` file handles:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirect rules for SPA routing

## 🎯 Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm lint
```

## 📱 Mobile Testing

Test on your phone with:
```bash
# Get your local IP (replace with actual IP)
npm run dev -- --host
```

Then visit: `http://[YOUR_IP]:3000`

## ✨ Customization

### Change Target Year
In `Happynewyear.jsx`, line 66:
```javascript
const newYear = new Date(2027, 0, 1, 0, 0, 0); // Change 2026 to 2027
```

### Adjust Firework Frequency
In `Happynewyear.jsx`:
```javascript
// Before New Year
if (Math.random() < 0.02) fireworksRef.current.push(new Firework());

// On New Year (increase for more fireworks)
if (Math.random() < 0.08) fireworksRef.current.push(new Firework());
```

### Change Music File
Replace `public/music.mp3` with your own file, or change the audio source in `Happynewyear.jsx`

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Audio not playing | Check browser permissions, ensure `public/music.mp3` exists |
| Vibration not working | Only works on supported mobile devices |
| Slow performance | Reduce firework spawn rate or particle count |
| Deployment failed | Check `npm run build` works locally first |

## 📦 Project Structure
```
happy-new-year/
├── src/
│   ├── Happynewyear.jsx    (Main component)
│   ├── App.jsx             (Root component)
│   ├── App.css             (Styles)
│   └── main.jsx            (Entry point)
├── public/
│   └── music.mp3           (Background music)
├── netlify.toml            (Netlify config)
├── vite.config.js          (Vite config)
└── .github/workflows/
    └── deploy.yml          (GitHub Actions)
```

## 🎉 You're Done!
Your Happy New Year countdown is live and ready to celebrate! 🎆✨

---
Created with ❤️ by Dhruv Jae
