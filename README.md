# Premium Portfolio - Enhanced React Application

## 🚀 Overview
A stunning, professional portfolio website built with React, featuring advanced animations, smooth transitions, and modern interactive effects.

## ✨ Features

### Advanced Animations
- **GSAP Integration** - Industry-standard animation library for complex, high-performance animations
- **Lenis Smooth Scroll** - Buttery-smooth scrolling experience
- **Framer Motion** - Declarative animations for React components
- **Scroll-Triggered Animations** - Elements animate as you scroll

### Interactive Effects
- **Custom Animated Cursor** - Magnetic cursor that responds to interactive elements
- **3D Tilt Cards** - Service cards with realistic 3D tilt effect on hover
- **Magnetic Buttons** - Buttons that pull towards your cursor
- **Parallax Effects** - Multi-layer parallax on mouse movement
- **Page Transitions** - Smooth transitions between routes

### Professional Design
- **Glass Morphism** - Modern frosted glass effects
- **Gradient Animations** - Animated gradient backgrounds
- **Scroll Progress Indicator** - Visual feedback of scroll position
- **Responsive Design** - Works perfectly on all devices
- **Accessibility** - Respects reduced motion preferences

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **GSAP** - Professional animation platform
- **Lenis** - Smooth scroll library
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Key Enhancements

### 1. Custom Hooks
- `useScrollAnimation` - Scroll-triggered animations with GSAP
- `useMagneticEffect` - Magnetic hover effect
- `useTiltEffect` - 3D tilt effect on hover
- `useSmoothScroll` - Lenis smooth scrolling

### 2. New Components
- `AnimatedCursor` - Custom cursor with magnetic effect
- `ScrollProgress` - Scroll progress indicator
- `PageTransition` - Page transition wrapper

### 3. Enhanced Components
- **Hero** - Magnetic buttons, enhanced parallax, smooth animations
- **ServiceCard** - 3D tilt, scroll animations, magnetic hover
- **All Pages** - Page transitions, scroll animations

### 4. Advanced CSS
- New animation keyframes (slideIn, scaleIn, rotateIn, pulse, gradientShift)
- Hover effects (hover-lift, hover-glow)
- Accessibility support (reduced motion)
- Custom easing functions

## 🎯 Animation Principles

### Timing
- **Fast**: 200-300ms for micro-interactions
- **Medium**: 400-600ms for component transitions
- **Slow**: 800-1200ms for page transitions

### Easing
- Custom easing: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth, professional feel
- Spring animations for natural movement

### Stagger
- List items: 50-100ms delay
- Grid items: 80-120ms delay
- Text characters: 20-40ms delay

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-purple: #667eea;
    /* ... more colors */
}
```

### Animations
Adjust animation settings in component files or custom hooks.

## 📝 Project Structure

```
premium-portfolio/
├── src/
│   ├── components/       # Reusable components
│   │   ├── AnimatedCursor.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── PageTransition.jsx
│   │   ├── Hero.jsx
│   │   ├── ServiceCard.jsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   │   ├── useScrollAnimation.js
│   │   ├── useMagneticEffect.js
│   │   └── useSmoothScroll.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

## 🚀 Performance

- GPU-accelerated animations
- Optimized bundle size
- Lazy loading for heavy components
- Reduced motion support for accessibility

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with ❤️ using modern web technologies.

---

**Enjoy your enhanced portfolio!** 🎉
