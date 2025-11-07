# Getting Started with CodeVis Development# Getting Started with CodeVis Development



Welcome! This guide will help you set up your development environment and start building CodeVis.Welcome! This guide will help you set up your development environment and start building CodeVis.



## Prerequisites## Prerequisites



Before you begin, ensure you have the following installed:Before you begin, ensure you have the following installed:



- **Node.js** 18+ ([Download](https://nodejs.org/))- **Node.js** 18+ ([Download](https://nodejs.org/))

- **Git** ([Download](https://git-scm.com/downloads))- **Git** ([Download](https://git-scm.com/downloads))

- **VS Code** (Recommended) ([Download](https://code.visualstudio.com/))- **VS Code** (Recommended) ([Download](https://code.visualstudio.com/))



### VS Code Extensions (Recommended)### VS Code Extensions (Recommended)

- ESLint- ESLint

- Prettier- Prettier

- Tailwind CSS IntelliSense- Tailwind CSS IntelliSense

- GitLens- GitLens

- Error Lens- Error Lens



------



## Step 1: Clone & Setup## Step 1: Clone & Setup



```bash```bash

# Navigate to your project directory# Navigate to your project directory

cd "/Users/piyush/Documents/project jarves/web devlopment/CodeVis"cd "/Users/piyush/Documents/project jarves/web devlopment/CodeVis"



# Initialize git (if not already)# Initialize git (if not already)

git initgit init

git add .git add .

git commit -m "Initial commit with architecture docs"git commit -m "Initial commit with architecture docs"



# Create GitHub repository and push# Create GitHub repository and push

gh repo create CodeVis --public --source=. --remote=origingh repo create CodeVis --public --source=. --remote=origin

git push -u origin maingit push -u origin main

``````



------



## Step 2: Frontend Setup## Step 2: Frontend Setup



```bash```bash

# Create frontend directory# Create frontend directory

mkdir -p frontendmkdir -p frontend

cd frontendcd frontend



# Initialize Vite + React project# Initialize Vite + React project

npm create vite@latest . -- --template reactnpm create vite@latest . -- --template react



# Install core dependencies# Install core dependencies

npm installnpm install



# Install UI dependencies# Install UI dependencies

npm install tailwindcss postcss autoprefixernpm install tailwindcss postcss autoprefixer

npx tailwindcss init -pnpx tailwindcss init -p



# Install shadcn/ui dependencies# Install shadcn/ui

npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-reactnpm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react



# Install state management# Install state management

npm install zustandnpm install zustand



# Install routing# Install data fetching

npm install react-router-domnpm install @tanstack/react-query axios



# Install animation libraries# Install routing

npm install framer-motion gsapnpm install react-router-dom



# Install 3D libraries# Install animation libraries

npm install three @react-three/fiber @react-three/dreinpm install framer-motion gsap



# Install code editor (for Sprint 3)# Install 3D libraries

npm install @monaco-editor/reactnpm install three @react-three/fiber @react-three/drei



# Install syntax highlighter# Install code editor

npm install react-syntax-highlighternpm install @monaco-editor/react

npm install --save-dev @types/react-syntax-highlighter

# Install syntax highlighter

# Install utilitiesnpm install react-syntax-highlighter

npm install date-fns react-hot-toastnpm install --save-dev @types/react-syntax-highlighter

```

# Install utilities

### Configure Tailwind CSSnpm install date-fns react-hot-toast

```

Edit `frontend/tailwind.config.js`:

```javascript### Configure Tailwind CSS

/** @type {import('tailwindcss').Config} */

export default {Edit `frontend/tailwind.config.js`:

  darkMode: ["class"],```javascript

  content: [/** @type {import('tailwindcss').Config} */

    "./index.html",export default {

    "./src/**/*.{js,ts,jsx,tsx}",  darkMode: ["class"],

  ],  content: [

  theme: {    "./index.html",

    extend: {    "./src/**/*.{js,ts,jsx,tsx}",

      colors: {  ],

        border: "hsl(var(--border))",  theme: {

        input: "hsl(var(--input))",    extend: {

        ring: "hsl(var(--ring))",      colors: {

        background: "hsl(var(--background))",        border: "hsl(var(--border))",

        foreground: "hsl(var(--foreground))",        input: "hsl(var(--input))",

        primary: {        ring: "hsl(var(--ring))",

          DEFAULT: "hsl(var(--primary))",        background: "hsl(var(--background))",

          foreground: "hsl(var(--foreground))",        foreground: "hsl(var(--foreground))",

        },        primary: {

        secondary: {          DEFAULT: "hsl(var(--primary))",

          DEFAULT: "hsl(var(--secondary))",          foreground: "hsl(var(--foreground))",

          foreground: "hsl(var(--secondary-foreground))",        },

        },        // Add more colors...

      },      },

      animation: {      animation: {

        "fade-in": "fade-in 0.5s ease-in-out",        "fade-in": "fade-in 0.5s ease-in-out",

        "slide-up": "slide-up 0.5s ease-out",        "slide-up": "slide-up 0.5s ease-out",

        "slide-down": "slide-down 0.5s ease-out",      },

      },      keyframes: {

      keyframes: {        "fade-in": {

        "fade-in": {          "0%": { opacity: 0 },

          "0%": { opacity: 0 },          "100%": { opacity: 1 },

          "100%": { opacity: 1 },        },

        },        "slide-up": {

        "slide-up": {          "0%": { transform: "translateY(20px)", opacity: 0 },

          "0%": { transform: "translateY(20px)", opacity: 0 },          "100%": { transform: "translateY(0)", opacity: 1 },

          "100%": { transform: "translateY(0)", opacity: 1 },        },

        },      },

        "slide-down": {    },

          "0%": { transform: "translateY(-20px)", opacity: 0 },  },

          "100%": { transform: "translateY(0)", opacity: 1 },  plugins: [],

        },}

      },```

    },

  },### Create Frontend Structure

  plugins: [],

}```bash

```cd frontend/src



### Add Tailwind Directives# Create directory structure

mkdir -p pages/Landing

Edit `frontend/src/index.css`:mkdir -p pages/DSALibrary

```cssmkdir -p pages/CodeUpload

@tailwind base;mkdir -p pages/Dashboard

@tailwind components;mkdir -p components/ui

@tailwind utilities;mkdir -p components/layout

mkdir -p components/visualizations/array

@layer base {mkdir -p components/visualizations/stack

  :root {mkdir -p components/visualizations/queue

    --background: 0 0% 100%;mkdir -p components/visualizations/tree

    --foreground: 222.2 84% 4.9%;mkdir -p components/visualizations/graph

    --primary: 221.2 83.2% 53.3%;mkdir -p components/code

    --primary-foreground: 210 40% 98%;mkdir -p components/three

    --secondary: 210 40% 96.1%;mkdir -p features/dsa/{hooks,store,utils}

    --secondary-foreground: 222.2 47.4% 11.2%;mkdir -p features/codeExecution/{hooks,store,utils}

    --border: 214.3 31.8% 91.4%;mkdir -p lib/{animations,constants,utils}

    --input: 214.3 31.8% 91.4%;mkdir -p styles

    --ring: 221.2 83.2% 53.3%;mkdir -p assets/{images,icons,models}

  }mkdir -p public/code-examples/{array,stack,queue,tree,graph}

```

  .dark {

    --background: 222.2 84% 4.9%;---

    --foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;## Step 3: Start Development Server

    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;```bash

    --secondary-foreground: 210 40% 98%;# Start frontend dev server

    --border: 217.2 32.6% 17.5%;npm run dev

    --input: 217.2 32.6% 17.5%;```

    --ring: 224.3 76.3% 48%;

  }Visit: http://localhost:5173

}

```You should see the Vite + React default page!



### Create Frontend Structure---



```bash## Step 4: Create Your First Component

cd frontend/src

Let's create a beautiful landing page hero section!

# Create directory structure

mkdir -p pages/Landing# Create virtual environment

mkdir -p pages/DSALibrarypython3 -m venv venv

mkdir -p pages/CodeUpload

mkdir -p components/ui# Activate virtual environment

mkdir -p components/layout# On macOS/Linux:

mkdir -p components/visualizations/arraysource venv/bin/activate

mkdir -p components/visualizations/stack# On Windows:

mkdir -p components/visualizations/queue# venv\Scripts\activate

mkdir -p components/visualizations/tree

mkdir -p components/visualizations/graph# Create requirements.txt

mkdir -p components/codecat > requirements.txt << 'EOF'

mkdir -p components/three# Core

mkdir -p features/dsa/{hooks,store,utils}fastapi==0.104.1

mkdir -p features/codeExecution/{hooks,store,utils}uvicorn[standard]==0.24.0

mkdir -p lib/{animations,constants,utils}python-multipart==0.0.6

mkdir -p stylespython-jose[cryptography]==3.3.0

mkdir -p assets/{images,icons,models}passlib[bcrypt]==1.7.4

python-dotenv==1.0.0

# Create public folder structure

cd ../../# Database

mkdir -p public/code-examples/{array,stack,queue,tree,graph}sqlalchemy==2.0.23

```alembic==1.12.1

psycopg2-binary==2.9.9

---

# Caching & Queue

## Step 3: Start Development Serverredis==5.0.1

rq==1.15.1

```bash

# From frontend directory# Data Validation

npm run devpydantic==2.5.0

```pydantic-settings==2.1.0

email-validator==2.1.0

Visit: http://localhost:5173

# Code Execution

You should see the Vite + React default page!docker==6.1.3



---# Testing

pytest==7.4.3

## Step 4: Create Your First Componentpytest-asyncio==0.21.1

httpx==0.25.2

Let's create a beautiful landing page hero section!

# Code Quality

### Create Hero Componentblack==23.11.0

ruff==0.1.6

```bashmypy==1.7.1

cd src/pages/LandingEOF

```

# Install dependencies

Create `Hero.jsx`:pip install -r requirements.txt

```javascript

import { motion } from 'framer-motion';# Create backend structure

mkdir -p app/{api/v1/endpoints,core/{dsa,execution,security},models,schemas,services,db,utils}

export default function Hero() {mkdir -p tests/{unit,integration,e2e}

  return (```

    <motion.div 

      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"### Create Backend Files

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}```bash

      transition={{ duration: 1 }}# Create main.py

    >cat > app/main.py << 'EOF'

      <div className="text-center text-white px-4">from fastapi import FastAPI

        <motion.h1 from fastapi.middleware.cors import CORSMiddleware

          className="text-6xl font-bold mb-4"from app.api.v1.router import api_router

          initial={{ y: -50, opacity: 0 }}from app.config import settings

          animate={{ y: 0, opacity: 1 }}

          transition={{ delay: 0.2, type: "spring" }}app = FastAPI(

        >    title="CodeVis API",

          Welcome to CodeVis    description="Interactive DSA Visualization Platform",

        </motion.h1>    version="1.0.0",

        <motion.p     docs_url="/docs",

          className="text-xl mb-8"    redoc_url="/redoc"

          initial={{ y: 50, opacity: 0 }})

          animate={{ y: 0, opacity: 1 }}

          transition={{ delay: 0.4, type: "spring" }}# CORS configuration

        >app.add_middleware(

          Visualize Data Structures & Algorithms Like Never Before    CORSMiddleware,

        </motion.p>    allow_origins=settings.ALLOWED_ORIGINS,

        <motion.button    allow_credentials=True,

          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"    allow_methods=["*"],

          initial={{ scale: 0 }}    allow_headers=["*"],

          animate={{ scale: 1 }})

          transition={{ delay: 0.6, type: "spring" }}

          whileHover={{ scale: 1.05 }}# Include API router

          whileTap={{ scale: 0.95 }}app.include_router(api_router, prefix="/api/v1")

        >

          Get Started@app.get("/")

        </motion.button>async def root():

      </div>    return {

    </motion.div>        "message": "Welcome to CodeVis API",

  );        "version": "1.0.0",

}        "docs": "/docs"

```    }



### Update App.jsx@app.get("/health")

async def health_check():

```javascript    return {"status": "healthy"}

import Hero from './pages/Landing/Hero';

import './index.css';if __name__ == "__main__":

    import uvicorn

function App() {    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

  return <Hero />;EOF

}

# Create config.py

export default App;cat > app/config.py << 'EOF'

```from pydantic_settings import BaseSettings

from typing import List

Refresh your browser - you should see your animated hero section! 🎉

class Settings(BaseSettings):

---    # App

    APP_NAME: str = "CodeVis"

## Step 5: Create Code Examples Structure    DEBUG: bool = True

    

Create sample code examples for DSA topics:    # Database

    DATABASE_URL: str = "postgresql://localhost/codevis"

```bash    

cd public/code-examples/array    # Redis

```    REDIS_URL: str = "redis://localhost:6379/0"

    

Create `insert.json`:    # Security

```json    SECRET_KEY: str = "your-secret-key-change-in-production"

{    ALGORITHM: str = "HS256"

  "title": "Array Insert Operation",    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

  "description": "Insert an element at a specific index",    

  "languages": {    # CORS

    "python": {    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]

      "code": "def insert(arr, index, value):\n    arr.insert(index, value)\n    return arr\n\n# Example\narr = [1, 2, 3, 4]\ninsert(arr, 2, 99)\nprint(arr)  # [1, 2, 99, 3, 4]",    

      "complexity": {    # Code Execution

        "time": "O(n)",    CODE_EXECUTION_TIMEOUT: int = 5

        "space": "O(1)"    CODE_EXECUTION_MEMORY_LIMIT: int = 256

      }    

    },    class Config:

    "javascript": {        env_file = ".env"

      "code": "function insert(arr, index, value) {\n    arr.splice(index, 0, value);\n    return arr;\n}\n\n// Example\nconst arr = [1, 2, 3, 4];\ninsert(arr, 2, 99);\nconsole.log(arr);  // [1, 2, 99, 3, 4]",

      "complexity": {settings = Settings()

        "time": "O(n)",EOF

        "space": "O(1)"

      }# Create .env file

    },cat > .env << 'EOF'

    "java": {APP_NAME=CodeVis

      "code": "public static ArrayList<Integer> insert(ArrayList<Integer> arr, int index, int value) {\n    arr.add(index, value);\n    return arr;\n}\n\n// Example\nArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3, 4));\ninsert(arr, 2, 99);\nSystem.out.println(arr);  // [1, 2, 99, 3, 4]",DEBUG=True

      "complexity": {DATABASE_URL=postgresql://localhost/codevis

        "time": "O(n)",REDIS_URL=redis://localhost:6379/0

        "space": "O(1)"SECRET_KEY=your-secret-key-change-this-in-production

      }ALLOWED_ORIGINS=["http://localhost:5173"]

    },EOF

    "cpp": {```

      "code": "#include <vector>\n#include <iostream>\nusing namespace std;\n\nvector<int> insert(vector<int>& arr, int index, int value) {\n    arr.insert(arr.begin() + index, value);\n    return arr;\n}\n\n// Example\nvector<int> arr = {1, 2, 3, 4};\ninsert(arr, 2, 99);\n// arr is now {1, 2, 99, 3, 4}",

      "complexity": {---

        "time": "O(n)",

        "space": "O(1)"## Step 4: Database Setup

      }

    }```bash

  }# Create PostgreSQL database

}createdb codevis

```

# Or using psql:

---# psql postgres

# CREATE DATABASE codevis;

## Step 6: Setup LocalStorage Helper# \q



Create a utility for managing LocalStorage:# Initialize Alembic

cd backend

Create `src/lib/utils/localStorage.js`:alembic init alembic

```javascript

// Save data to localStorage# Edit alembic.ini - Update sqlalchemy.url

export const saveToLocalStorage = (key, value) => {# sqlalchemy.url = postgresql://localhost/codevis

  try {```

    const serialized = JSON.stringify(value);

    localStorage.setItem(key, serialized);### Create Initial Migration

    return true;

  } catch (error) {```bash

    console.error('Error saving to localStorage:', error);# Create first migration

    return false;alembic revision --autogenerate -m "Initial schema"

  }

};# Run migration

alembic upgrade head

// Load data from localStorage```

export const loadFromLocalStorage = (key, defaultValue = null) => {

  try {---

    const serialized = localStorage.getItem(key);

    if (serialized === null) return defaultValue;## Step 5: Docker Setup (Optional but Recommended)

    return JSON.parse(serialized);

  } catch (error) {Create `docker-compose.yml` in root:

    console.error('Error loading from localStorage:', error);

    return defaultValue;```yaml

  }version: '3.8'

};

services:

// Remove data from localStorage  frontend:

export const removeFromLocalStorage = (key) => {    build:

  try {      context: ./frontend

    localStorage.removeItem(key);      dockerfile: Dockerfile.dev

    return true;    ports:

  } catch (error) {      - "5173:5173"

    console.error('Error removing from localStorage:', error);    volumes:

    return false;      - ./frontend:/app

  }      - /app/node_modules

};    environment:

      - VITE_API_URL=http://localhost:8000

// Clear all localStorage  

export const clearLocalStorage = () => {  backend:

  try {    build:

    localStorage.clear();      context: ./backend

    return true;      dockerfile: Dockerfile.dev

  } catch (error) {    ports:

    console.error('Error clearing localStorage:', error);      - "8000:8000"

    return false;    volumes:

  }      - ./backend:/app

};    environment:

```      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/codevis

      - REDIS_URL=redis://redis:6379/0

---    depends_on:

      - postgres

## Step 7: Create Your First Zustand Store      - redis

  

Create a store for managing Stack state:  postgres:

    image: postgres:15-alpine

Create `src/features/dsa/store/stackStore.js`:    environment:

```javascript      - POSTGRES_USER=postgres

import { create } from 'zustand';      - POSTGRES_PASSWORD=postgres

      - POSTGRES_DB=codevis

export const useStackStore = create((set) => ({    ports:

  // State      - "5432:5432"

  stack: [],    volumes:

  isAnimating: false,      - postgres_data:/var/lib/postgresql/data

  history: [],  

    redis:

  // Actions    image: redis:7-alpine

  push: (value) => set((state) => {    ports:

    const newStack = [...state.stack, value];      - "6379:6379"

    const newHistory = [...state.history, `Pushed ${value}`];    volumes:

    return {      - redis_data:/data

      stack: newStack,

      history: newHistoryvolumes:

    };  postgres_data:

  }),  redis_data:

  ```

  pop: () => set((state) => {

    if (state.stack.length === 0) return state;### Start Services

    const newStack = [...state.stack];

    const popped = newStack.pop();```bash

    const newHistory = [...state.history, `Popped ${popped}`];# Start all services

    return {docker-compose up -d

      stack: newStack,

      history: newHistory# View logs

    };docker-compose logs -f

  }),

  # Stop services

  peek: () => {docker-compose down

    const state = useStackStore.getState();```

    return state.stack[state.stack.length - 1];

  },---

  

  isEmpty: () => {## Step 6: Run Development Servers

    const state = useStackStore.getState();

    return state.stack.length === 0;### Terminal 1: Frontend

  },```bash

  cd frontend

  reset: () => set({npm run dev

    stack: [],```

    history: [],Visit: http://localhost:5173

    isAnimating: false

  }),### Terminal 2: Backend

  ```bash

  setAnimating: (isAnimating) => set({ isAnimating }),cd backend

}));source venv/bin/activate  # Activate virtual environment

```uvicorn app.main:app --reload

```

---Visit: http://localhost:8000/docs



## Step 8: Git Workflow### Terminal 3: Redis (if not using Docker)

```bash

```bashredis-server

# Create .gitignore in root```

cat > .gitignore << 'EOF'

# Dependencies---

node_modules/

dist/## Step 7: Verify Setup



# Environment variables### Test Frontend

.env1. Open http://localhost:5173

.env.local2. You should see the Vite + React default page

.env.development.local

.env.test.local### Test Backend

.env.production.local1. Open http://localhost:8000/docs

2. You should see FastAPI Swagger documentation

# IDE3. Test the `/health` endpoint

.vscode/

.idea/### Test Database

*.swp```bash

*.swopsql codevis

\dt  # List tables

# OS\q   # Quit

.DS_Store```

Thumbs.db

---

# Logs

*.log## Step 8: Create Your First Feature

npm-debug.log*

yarn-debug.log*Let's create a simple landing page:

yarn-error.log*

### Frontend: Create Landing Page Component

# Build output

build/```bash

.next/cd frontend/src/pages/Landing

out/```



# MiscCreate `Hero.jsx`:

.vercel```javascript

EOFimport { motion } from 'framer-motion';



# Commit your changesexport default function Hero() {

git add .  return (

git commit -m "Setup development environment - Frontend only"    <motion.div 

git push      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"

```      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

---      transition={{ duration: 1 }}

    >

## Step 9: Deploy to Vercel (Optional)      <div className="text-center text-white">

        <motion.h1 

```bash          className="text-6xl font-bold mb-4"

# Install Vercel CLI          initial={{ y: -50 }}

npm install -g vercel          animate={{ y: 0 }}

          transition={{ delay: 0.2, type: "spring" }}

# Deploy from frontend directory        >

cd frontend          Welcome to CodeVis

vercel        </motion.h1>

        <motion.p 

# Follow prompts:          className="text-xl mb-8"

# - Set up and deploy? Yes          initial={{ y: 50 }}

# - Which scope? Your account          animate={{ y: 0 }}

# - Link to existing project? No          transition={{ delay: 0.4, type: "spring" }}

# - Project name? codevis        >

# - Directory? ./          Visualize Data Structures & Algorithms Like Never Before

# - Override settings? No        </motion.p>

        <motion.button

# Your site is now live! 🚀          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"

```          whileHover={{ scale: 1.05 }}

          whileTap={{ scale: 0.95 }}

---        >

          Get Started

## Development Workflow        </motion.button>

      </div>

### Daily Workflow    </motion.div>

1. **Pull latest changes**: `git pull`  );

2. **Start dev server**: `cd frontend && npm run dev`}

3. **Create feature branch**: `git checkout -b feature/your-feature````

4. **Write code** with frequent commits

5. **Test your changes**Update `App.jsx`:

6. **Create pull request**```javascript

7. **Merge after review**import Hero from './pages/Landing/Hero';



### Code Qualityfunction App() {

```bash  return <Hero />;

# Format code with Prettier}

npm run format

export default App;

# Lint code with ESLint```

npm run lint

```### Backend: Create Test Endpoint



Add to `package.json`:```bash

```jsoncd backend/app/api/v1/endpoints

{```

  "scripts": {

    "dev": "vite",Create `dsa.py`:

    "build": "vite build",```python

    "preview": "vite preview",from fastapi import APIRouter

    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",

    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\""router = APIRouter()

  }

}@router.get("/dsa/topics")

```async def get_dsa_topics():

    return {

---        "success": True,

        "data": [

## Troubleshooting            {

                "id": 1,

### Port Already in Use                "topic": "Array",

```bash                "category": "linear",

# Kill process on port 5173                "difficulty": "easy"

lsof -ti:5173 | xargs kill -9            },

```            {

                "id": 2,

### Module Not Found                "topic": "Stack",

```bash                "category": "linear",

# Clear cache and reinstall                "difficulty": "easy"

rm -rf node_modules package-lock.json            }

npm install        ]

```    }

```

### Build Errors

```bashCreate `app/api/v1/router.py`:

# Clear build cache```python

rm -rf distfrom fastapi import APIRouter

npm run buildfrom app.api.v1.endpoints import dsa

```

api_router = APIRouter()

### Tailwind Styles Not Workingapi_router.include_router(dsa.router, tags=["DSA"])

1. Make sure `index.css` has Tailwind directives```

2. Check `tailwind.config.js` content paths

3. Restart dev serverTest: http://localhost:8000/api/v1/dsa/topics



------



## Next Steps## Step 9: Git Workflow



Now that your environment is set up, follow the sprint plan!```bash

# Create .gitignore in root

### Sprint 1: Landing Page (Weeks 1-3)cat > .gitignore << 'EOF'

1. ✅ Setup complete (you just did this!)# Python

2. ✅ Build hero section (done!)__pycache__/

3. 📝 Add feature cards*.py[cod]

4. 📝 Create mini demo*$py.class

5. 📝 Add footer & deployvenv/

.env

Follow **[07_SPRINT_PLAN.md](./07_SPRINT_PLAN.md)** for detailed day-by-day tasks!*.db

*.sqlite3

### Quick Reference

- **Main Docs**: [03_FRONTEND_ONLY_ARCHITECTURE.md](./03_FRONTEND_ONLY_ARCHITECTURE.md)# Node

- **What to Build**: [06_DSA_TOPICS.md](./06_DSA_TOPICS.md)node_modules/

- **Sprint Plan**: [07_SPRINT_PLAN.md](./07_SPRINT_PLAN.md)dist/

- **Task Checklist**: [08_MVP_CHECKLIST.md](./08_MVP_CHECKLIST.md).env.local



---# IDE

.vscode/

## Need Help?.idea/

*.swp

- 📚 **Read Docs**: Start with 01_README.md and read in sequence*.swo

- 🐛 **Issues**: Check console errors first

- 💡 **Ideas**: Frontend-only means no backend complexity!# OS

- 🎯 **Focus**: One sprint at a time.DS_Store

Thumbs.db

**Happy coding! 🚀**

# Logs

**Start with Sprint 1, Day 3 (Hero section feature cards). You've got this!***.log

EOF

# Commit your changes
git add .
git commit -m "Setup development environment"
git push
```

---

## Step 10: Development Workflow

### Daily Workflow
1. **Pull latest changes**: `git pull`
2. **Start servers**: Frontend, Backend, Redis
3. **Create feature branch**: `git checkout -b feature/your-feature`
4. **Write code** with frequent commits
5. **Test your changes**
6. **Create pull request**
7. **Merge after review**

### Code Quality
```bash
# Frontend - Format code
cd frontend
npm run lint
npm run format

# Backend - Format code
cd backend
black .
ruff check .
mypy .
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# Restart PostgreSQL
brew services restart postgresql@15
```

### Redis Connection Error
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
brew services start redis
```

### Module Not Found
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && pip install -r requirements.txt
```

---

## Next Steps

Now that your environment is set up, follow the [MVP Checklist](./MVP_CHECKLIST.md) to start building features!

### Week 1-2 Focus
1. ✅ Complete landing page hero section
2. ✅ Add feature cards with animations
3. ✅ Make it responsive
4. ✅ Deploy to Vercel

### Learning Resources
- **React**: [Official Docs](https://react.dev/)
- **Framer Motion**: [Documentation](https://www.framer.com/motion/)
- **FastAPI**: [Tutorial](https://fastapi.tiangolo.com/tutorial/)
- **Tailwind CSS**: [Docs](https://tailwindcss.com/docs)

---

## Need Help?

- 📧 Email: your-email@example.com
- 💬 Discord: [Join community]
- 📚 Docs: Read ARCHITECTURE.md
- 🐛 Issues: GitHub Issues

**Happy coding! 🚀**
