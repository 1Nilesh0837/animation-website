# Nilesh's Premium Portfolio

A sophisticated, high-performance professional portfolio showcasing expertise in Machine Learning, React development, and creative UI/UX design through immersive scrollytelling and cutting-edge web technologies.

## 🎨 Features

### Core Sections
- **Custom Cursor**: Smooth, blend-mode aware cursor with halo effect and contextual labels
- **Hero Section**: Letter-by-letter scramble text reveal with infinite keyword marquee and magnetic CTA button
- **Kinetic 3D Scene**: Vanilla Three.js WebGL with rotating cylinders, particle field, and mouse-responsive tilting
- **Video Section**: Smart autoplay with chapter markers and interactive video scrubber
- **Kingdom Section**: Dramatic door-opening scroll animation with particle burst and SVG doodle reveals
- **About Section**: Draggable card stack with haptic feedback and skill progress bars
- **Project Section**: Sticky scroll stacking with video thumbnail hover and 3D perspective rotation
- **Contact Section**: EmailJS integration, ShaderGradient background, 3D social card flip effect
- **Control Panel**: Live FPS counter, speed control, theme picker, and keyboard shortcuts (Cmd/Ctrl + K)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS 4, CSS Modules
- **Animations**: Framer Motion, GSAP with ScrollTrigger
- **3D Graphics**: Three.js, React Three Fiber
- **UI Components**: Radix UI, Lucide Icons
- **Forms**: EmailJS for email submissions
- **Additional**: Shader Gradient, Embla Carousel

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the portfolio.

## 🏗️ Build

```bash
npm run build
```

Production-ready files will be in the `dist` directory.

## 📋 Project Structure

```
src/
├── app/
│   ├── App.tsx
│   ├── components/
│   │   ├── CustomCursor.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── VideoSection.tsx
│   │   │   ├── KingdomSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── webgl/
│   │       └── KineticScene.tsx
│   ├── context/
│   │   └── TextureContext.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   └── useScrollPosition.ts
│   └── styles/
│       └── globals.css
├── main.tsx
index.html
vite.config.ts
tsconfig.json
```

## 🎯 Key Customizations

### Adding Your Information

1. **Update Hero Section**: Modify text in `HeroSection.tsx`
2. **Update Project Data**: Edit `PROJECTS` array in `ProjectSection.tsx`
3. **Update Social Links**: Modify `SOCIAL_LINKS` in `ContactSection.tsx`
4. **EmailJS Integration**: Replace form ID in `ContactSection.tsx`

### Customizing Colors & Themes

- Modify Tailwind classes for color changes
- Update theme colors in `ControlPanel.tsx`
- Adjust gradients in component `className` attributes

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## ⚡ Performance

- Code splitting with dynamic imports
- Optimized 3D rendering with frustum culling
- Lazy loading for images and videos
- GPU-accelerated animations
- FPS monitoring in Control Panel

## 🔐 Security

- No sensitive data in client-side code
- EmailJS handles form submissions securely
- CORS-safe image loading

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

## 📧 Contact

For inquiries, reach out through the contact form or social links in the portfolio.

---

**Made with ❤️ by Nilesh**
