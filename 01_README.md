# CodeAtlas - Interactive DSA Visualization Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)

> Transform abstract data structures into interactive 3D experiences. Learn, visualize, and master algorithms like never before.

## 🌟 Overview

CodeAtlas is a next-generation learning platform that makes Data Structures and Algorithms tangible through:
- **Interactive 3D Visualizations** - See data structures come to life
- **Real-time Operations** - Manipulate data structures instantly
- **Multi-language Code Examples** - Python, Java, C++, JavaScript
- **Beautiful Animations** - Smooth, GPU-accelerated transitions
- **100% Frontend** - No backend needed, works offline!

**No signup, no backend, just visualize!** 🎯

## 🎯 Features

### Phase 1: DSA Visualization Library (MVP - No Backend!)
- ✅ 15+ Data Structure Visualizations (Array, Stack, Queue, Trees, Graphs)
- ✅ Interactive Operations (Add, Delete, Search, Traverse)
- ✅ Multi-language Code Examples (stored as JSON)
- ✅ Real-time Animation Controls
- ✅ Beautiful 3D Landing Page
- ✅ LocalStorage for preferences
- ✅ Works offline (PWA)

### Phase 2: Code Execution (Optional Backend)
- 🚧 Python Code Execution (Pyodide - no backend!)
- 🚧 Step-by-step Visualization
- 🚧 Variable State Tracking
- 🚧 Multi-language execution (if backend added)

### Phase 3: Advanced Features (Planned)
- 📋 AI-powered Code Analysis
- 📋 Collaborative Learning
- 📋 Interactive Challenges
- 📋 Progress Analytics
- 📋 GIF/Video Export

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- That's it! No backend, database, or server needed 🎉

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/codeatlas.git
cd codeatlas/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel (free!)
vercel

# Or deploy to Netlify
netlify deploy
```

**That's it! No backend setup needed.** ✨

## 📁 Project Structure

```
CodeAtlas/
├── frontend/              # React + Vite (ONLY THIS!)
│   ├── public/
│   │   ├── code-examples/ # JSON files with code
│   │   └── dsa-metadata.json
│   └── src/
│       ├── pages/        # Page components
│       ├── components/   # Reusable components
│       ├── lib/          # DSA logic & utils
│       └── store/        # Zustand stores
│
└── docs/                # Documentation
```

**Note**: No backend folder! Everything runs in the browser. 🎯

## 🛠️ Tech Stack

### Frontend (100% Client-Side)
- **React 18** - UI framework
- **Vite 5** - Build tool
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **LocalStorage** - Data persistence

### No Backend Needed! 🎉
- All DSA logic runs in browser
- Code examples stored as JSON files
- User preferences in LocalStorage
- Deploy as static site (Vercel/Netlify)
- **Cost**: $0/month

### Optional (Phase 2)
- **Pyodide** - Python execution in browser (no backend!)
- **Supabase** - If you need accounts later

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** ⭐ Start here!
- **[FRONTEND_ONLY_ARCHITECTURE.md](./docs/FRONTEND_ONLY_ARCHITECTURE.md)** - Why no backend
- **[BACKEND_DECISION.md](./docs/BACKEND_DECISION.md)** - Backend vs Frontend comparison
- **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Setup guide
- **[MVP_CHECKLIST.md](./docs/MVP_CHECKLIST.md)** - 8-week plan
- **[DSA_TOPICS.md](./docs/DSA_TOPICS.md)** - All DSA topics
- **[BUSINESS_MODEL.md](./docs/BUSINESS_MODEL.md)** - Monetization

**Optional (if you want backend later):**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full system design
- [API.md](./docs/API.md) - Backend API

## 🎨 Design Philosophy

1. **No Backend** → Zero cost, instant load, works offline
2. **Beauty Meets Function** → Stunning visuals + educational value
3. **60 FPS Animations** → GPU-accelerated, smooth transitions
4. **Mobile-First** → Responsive on all devices
5. **Privacy-First** → No data collection, no accounts needed

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test
npm run test:e2e

# That's all - no backend to test!
```

## 📊 Roadmap

- [x] Project architecture (frontend-only!)
- [x] Landing page design
- [ ] Basic DSA visualizers (Week 3-4)
- [ ] Animation system (Week 5-6)
- [ ] Code examples & LocalStorage (Week 7-8)
- [ ] MVP deployment (Week 10)
- [ ] Python execution with Pyodide (Phase 2)
- [ ] Optional backend (if needed in Phase 3)

See [MVP_CHECKLIST.md](./docs/MVP_CHECKLIST.md) for detailed plan.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 💼 Business & Partnerships

CodeAtlas is designed as a commercial product for:
- **EdTech Companies** - White-label solutions
- **Universities** - Campus-wide licenses
- **Bootcamps** - Interactive curriculum
- **Enterprise** - Developer training

For partnership inquiries: [your-email@example.com]

## 🙏 Acknowledgments

- [VisuAlgo](https://visualgo.net/) - Inspiration for visualizations
- [Three.js](https://threejs.org/) - 3D graphics library
- [FastAPI](https://fastapi.tiangolo.com/) - Amazing Python framework

## 📞 Support

- 📧 Email: support@codeatlas.dev
- 💬 Discord: [Join our community](https://discord.gg/codeatlas)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/codeatlas/issues)
- 📚 Docs: [docs.codeatlas.dev](https://docs.codeatlas.dev)

---

**Built with ❤️ by developers, for developers**

⭐ Star this repo if you find it helpful!
