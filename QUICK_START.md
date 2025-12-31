# 🎆 Quick Start Guide

## 🏃 Get Running in 30 Seconds

### Development
```bash
npm install
npm run dev
```
Visit: **http://localhost:3000**

### Build for Production
```bash
npm run build
```

## 🚀 Deploy in 1 Minute

### Deploy to Netlify (Easiest!)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder onto Netlify → Done! 🎉

### Deploy to GitHub Pages (Automated)
1. Push to GitHub: `git push origin main`
2. GitHub Actions automatically deploys from `.github/workflows/deploy.yml`
3. Your site goes live at: `https://username.github.io/happy-new-year/`

## ✨ What You Get

✅ Real countdown to Jan 1, 2026  
✅ "2026" forms from fireworks at midnight  
✅ Phone vibrates when fireworks explode  
✅ Click anywhere to trigger custom fireworks  
✅ Beautiful music and celebration message  
✅ Works on mobile, tablet, desktop  

## 📖 Full Documentation

- **Deployment Details**: See `DEPLOYMENT.md`
- **Release Notes**: See `RELEASE_NOTES.md`
- **Code Comments**: Check `src/Happynewyear.jsx`

## 🎯 Features Preview

| Before Midnight | At Midnight |
|---|---|
| 🕛 Live countdown display | 🎉 "Happy New Year 2026" message |
| 🌙 Occasional fireworks | 💥 Frequent auto fireworks |
| 🎵 Enable sound button | 🎆 "2026" text fireworks |
| 👆 Click for custom fireworks | 📱 Phone vibrates |

## 🔧 Common Tasks

**Customize year** (e.g., 2027):
```javascript
// In src/Happynewyear.jsx, line 66
const newYear = new Date(2027, 0, 1, 0, 0, 0);
```

**Change music**:
- Replace `public/music.mp3` with your file

**Adjust firework frequency**:
```javascript
// More frequent (0.05 = 5% chance per frame)
if (Math.random() < 0.05) fireworksRef.current.push(new Firework());
```

## ❓ FAQ

**Q: Will it work on my phone?**  
A: Yes! Click the sound button to enable music, then click for fireworks.

**Q: Does vibration work on all phones?**  
A: Most modern Android/iOS devices support it. Some older devices may not.

**Q: Can I change the year?**  
A: Yes, see "Customize year" above.

**Q: How do I get the URL after deploying?**  
A: Netlify gives you a free `*.netlify.app` domain. GitHub Pages uses your repo name.

## 📞 Support

Check the full docs in `DEPLOYMENT.md` for troubleshooting and detailed setup instructions.

---

Happy 2026! 🎉✨
