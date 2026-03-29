---
name: fe-note
description: create a note-taking app with React 19 + TypeScript, Tailwind CSS, featuring a rich text editor, document management, localStorage persistence, and full type safety.
---

## Frontend Technologies

### Core Framework

- **React 19** - Component-based UI library
  - Functional components & hooks (useState, useContext, useEffect, useReducer)
  - Component composition and reusability
  - React Context API for state management
  - Performance optimization (useMemo, useCallback)

### Styling & Design

- **Tailwind CSS** - Utility-first CSS framework
  - Layout (flexbox, grid)
  - Responsive design (breakpoints: sm, md, lg, xl)
  - Component styling with utility classes
  - Custom configurations and themes
  - Dark mode support (optional)

### Rich Text Editing

- **Slate.js** OR **Draft.js** - Rich text editor library
  - Editor API and data model
  - Custom serialization/deserialization
  - Plugin architecture (if using Slate)
  - Formatting operations (bold, italic, links, etc.)

### State Management

- **React Hooks** (primary approach)
  - useState for local component state
  - useContext for global state (documents, current editor)
  - useEffect for side effects (auto-save, localStorage sync)
  - Custom hooks for reusable logic

- **React Context API** (optional, for complex state)
  - Creating contexts for documents, UI state
  - Providers for component tree

### Storage & Data Persistence

- **LocalStorage API**
  - Serializing/deserializing JSON data
  - Auto-save functionality
  - Session-based persistence

### TypeScript (Primary Language)

- **Type System Fundamentals**
  - Interfaces and type aliases
  - Basic types (string, number, boolean, array, any, unknown)
  - Literal types and enums
  - Union types and type narrowing
  - Type guards and predicates
  - Utility types (Partial, Pick, Omit, Record, Readonly, etc.)

- **React + TypeScript Patterns**
  - Typed functional components (React.FC<Props>)
  - Typed hooks (useState<T>, useContext<T>, useEffect, useReducer)
  - Generic context for type-safe state management
  - Typed event handlers (React.ChangeEvent, React.FormEvent, React.MouseEvent)
  - Children prop typing (React.ReactNode, React.PropsWithChildren)
  - Component composition with generic types
  - Typed refs (useRef<T>)

- **Advanced TypeScript**
  - Generics for reusable typed components and hooks
  - Intersection types for prop composition
  - Conditional types for complex type logic
  - Type inference with `as const` and `satisfies`
  - Module augmentation for third-party types
  - Custom type guards and type predicates

- **ES6+ Features with TypeScript**
  - Arrow functions with type inference
  - Destructuring with type annotations
  - Spread operator with typed objects and arrays
  - Template literals with type safety
  - Array methods (map, filter, find, reduce) with proper typing
  - Promise-based async patterns (async/await, setTimeout debouncing)
  - Object manipulation and property access

## Component Development Skills

### Layout Components

- Sidebar (collapsible, nested navigation)
- Header/Navbar (responsive, sticky)
- Main editor area (resizable, centered)
- Footer/Status bar (optional)

### Editor Components

- Toolbar (button groups, dropdown menus)
- Rich text input area
- Character/word count display
- Auto-save indicator

### Document Management

- Document list/tree view (nested, collapsible)
- Create/edit/delete operations
- Folder hierarchy support
- Document selection and active states

### UI Components

- Buttons (primary, secondary, icon variants)
- Modals/Dialogs (create document, confirm delete)
- Dropdowns/Menus
- Input fields (text, textarea)
- Search bar
- Icons (lucide-react or react-icons)

## Development Skills

### Code Organization

- Component file structure (one component per file)
- Separating logic into custom hooks
- Service layer (localStorage helpers, document utilities)
- Utility functions (validators, formatters, helpers)

### State Management Patterns

- Single source of truth principle
- State lifting (passing state up the component tree)
- Callback functions for state updates
- Avoiding prop drilling with Context API

### Performance Optimization

- Memoization (React.memo, useMemo)
- Callback optimization (useCallback)
- Lazy loading components (React.lazy, Suspense)
- Debouncing auto-save operations

### Accessibility (a11y)

- Semantic HTML (button, input, nav, main, etc.)
- ARIA labels and roles
- Keyboard navigation (Tab, Escape, Enter)
- Focus management

### Version Control

- Git basics (commit, push, pull)
- Branch management (feature branches)
- Commit messages

## Soft Skills

### Problem-Solving

- Breaking down complex UI into components
- Planning component hierarchy
- Troubleshooting React/Tailwind issues

### Debugging

- Browser DevTools (React DevTools extension)
- Console logging for state changes
- Network tab inspection

### Testing (Optional but Recommended)

- Jest and React Testing Library basics
- Unit testing components
- Testing user interactions

## Learning Path (Recommended Order)

1. **TypeScript Fundamentals** (START HERE)
   - Basic types (string, number, boolean, array)
   - Interfaces and type aliases
   - Functions with type annotations
   - Generics and utility types
   - Type narrowing and guards

2. **React + TypeScript Integration**
   - React.FC and component typing
   - Typed hooks (useState<T>, useContext<T>)
   - Props interfaces and composition
   - Typed event handlers
   - Children prop typing

3. **Tailwind CSS Basics**
   - Utility classes with TypeScript
   - Responsive design
   - Spacing, typography, colors

4. **Component Architecture**
   - Design typed layout structure
   - Build typed components (Header, Sidebar, Editor)
   - Type-safe composition patterns

5. **State Management with TypeScript**
   - Define interfaces for data models
   - Implement strongly-typed Context
   - useReducer with discriminated unions

6. **Rich Text Editor Integration**
   - Choose editor (Slate or Draft.js)
   - Type editor state and operations
   - Implement typed formatting toolbar

7. **Document Management**
   - Type-safe CRUD operations
   - Folder/hierarchy with interfaces
   - Update UI based on typed state

8. **Storage & Persistence**
   - Typed localStorage service
   - JSON serialization with types
   - Auto-save with debouncing

9. **Testing & Type Checking**
   - Jest and React Testing Library with TypeScript
   - Type-safe test assertions

10. **Polish & Optimization**
    - Responsive design tweaks
    - Performance optimization
    - Accessibility improvements

## Tools & Environment

### Development Tools

- **Code Editor**: VS Code with TypeScript extensions
  - TypeScript Vue Plugin (Volar)
  - ESLint with TypeScript support
  - Prettier for code formatting
- **TypeScript Compiler**: tsc for type checking and compilation
- **Node.js & npm/yarn**: Package management
- **React DevTools**: Browser extension for debugging
- **Git**: Version control

### Libraries to Install

```bash
# TypeScript and type definitions
yarn add -D typescript @types/react @types/react-dom @types/node

# Rich text editor (choose one)
yarn add slate slate-react @types/slate @types/slate-react
# or
yarn add draft-js react-draft-wysiwyg @types/draft-js

# UI and styling
yarn add lucide-react
yarn add -D tailwindcss postcss autoprefixer

# Utilities
yarn add classnames
```

### TypeScript Configuration

**tsconfig.json** example:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "build"]
}
```

### Browser DevTools

- Console (debugging)
- React DevTools (component inspection)
- Performance tab (optimization)
- Network tab (debugging)

## TypeScript Examples & Patterns

**Component with Props Interface:**

```typescript
interface DocumentProps {
  id: string;
  title: string;
  onDelete: (id: string) => void;
}

const Document: React.FC<DocumentProps> = ({ id, title, onDelete }) => (
  <div>
    <h2>{title}</h2>
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>
);
```

**Typed useContext Hook:**

```typescript
interface DocumentContextType {
  docs: Document[];
  activeId: string | null;
  createDoc: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("useDocuments must be used within DocumentProvider");
  return context;
};
```

**Typed localStorage Service:**

```typescript
interface Document {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

const storageService = {
  saveDocs: (docs: Document[]): void => {
    localStorage.setItem("documents", JSON.stringify(docs));
  },
  loadDocs: (): Document[] => {
    const data = localStorage.getItem("documents");
    return data ? JSON.parse(data) : [];
  },
};
```

## Key Concepts Summary

| Concept              | What It Is                       | Why It Matters             |
| -------------------- | -------------------------------- | -------------------------- |
| **Typed Components** | React.FC<Props> with interfaces  | Compile-time validation    |
| **Hooks**            | useState<T>, useContext<T> typed | Type-safe state management |
| **Interfaces**       | Define object shapes             | Self-documenting contracts |
| **Generic Types**    | Reusable typed components        | DRY type definitions       |
| **Context<T>**       | Typed global state               | Avoid prop drilling        |
| **Union Types**      | Multiple possible types          | Discriminated unions       |
| **Tailwind**         | CSS utility classes              | Fast, consistent styling   |
| **localStorage API** | Browser storage with type safety | Temp persistence           |
| **Type Guards**      | Narrow types at runtime          | Safe edge case handling    |

## Tailwind CSS & Styling

### Setup & Installation

1. **Install Tailwind CSS and dependencies:**

```bash
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure `tailwind.config.js`:**

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. **Add Tailwind directives to `src/index.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Utility Classes (Minimal Reference)

**Layout & Flexbox:**

- `flex`, `flex-col`, `justify-between`, `items-center`
- `w-full`, `w-72`, `h-screen`, `h-auto`
- `p-4`, `px-6`, `py-2`, `mb-4`, `gap-2`

**Colors & Text:**

- `text-gray-900`, `text-white`, `text-lg`, `font-semibold`
- `bg-white`, `bg-gray-50`, `border`, `border-gray-200`

**Responsive Design:**

- `md:w-1/2`, `lg:flex`, `sm:px-4`
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Dark Mode Support (Minimal)

**Enable dark mode in `tailwind.config.js`:**

```javascript
module.exports = {
  darkMode: "class", // Uses 'dark' class on <html>
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**Apply dark mode classes to components:**

```typescript
// Example: Sidebar with dark mode
<aside className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
  <h2 className="text-gray-900 dark:text-white font-semibold">Documents</h2>
</aside>
```

**Common dark mode color pairs:**

- `bg-white dark:bg-gray-900`
- `text-gray-900 dark:text-white`
- `border-gray-200 dark:border-gray-700`
- `bg-gray-50 dark:bg-gray-800`
- `hover:bg-gray-100 dark:hover:bg-gray-700`

**Toggle dark mode in app (optional):**

```typescript
const [isDark, setIsDark] = useState(false);

useEffect(() => {
  const html = document.documentElement;
  isDark ? html.classList.add('dark') : html.classList.remove('dark');
}, [isDark]);

// Button or context to toggle
<button onClick={() => setIsDark(!isDark)}>Toggle Dark Mode</button>
```

### Tailwind Best Practices

- Use utility classes directly on elements instead of custom CSS.
- Leverage responsive prefixes (`sm:`, `md:`, `lg:`) for mobile-first design.
- Extract repeated class patterns into `@apply` directives or React components.
- Use Tailwind's CSS variables for custom colors if needed.
- Keep dark mode consistent across all components (text, backgrounds, borders, shadows).

### Minimal Component Example

```typescript
// Sidebar with Tailwind + dark mode support
const Sidebar = () => (
  <aside className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documents</h2>
    <ul className="space-y-2">
      {/* items */}
    </ul>
  </aside>
);
```

## Resources & References

### Official Docs

- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Slate.js: https://docs.slatejs.org (if chosen)
- Draft.js: https://draftjs.org (if chosen)

### Commonly Used Patterns

- Auto-save with debounce
- Modal dialogs for confirmations
- Collapsible sidebar
- Document tree navigation
- Keyboard shortcuts

## Deployment & Docker

### Docker Fundamentals for React Apps

**Overview**: Containerize your React note app for consistent deployment across dev, staging, and production environments.

**Key Concepts**:

- **Multi-stage builds**: Separate build environment from runtime (reduces image size)
- **Node.js base image**: Use `node:18-alpine` or `node:20-alpine` for small footprint
- **Nginx serving**: Lightweight web server for serving static React builds
- **.dockerignore**: Exclude `node_modules`, `.git`, etc. from build context

### Dockerfile Template (Multi-Stage)

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build

# Stage 2: Runtime (Nginx)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf (SPA Routing)

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### .dockerignore

```
node_modules
npm-debug.log
yarn-error.log
.git
.gitignore
README.md
build
dist
```

### Docker Build & Run Commands

```bash
# Build image
docker build -t my-note:latest .

# Run container locally
docker run -p 3000:80 my-note:latest

# View running containers
docker ps

# Stop container
docker stop <container-id>
```

### Docker Compose (Optional)

For local development with multiple services (e.g., future backend):

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
```

Run with:

```bash
docker-compose up
```

### Container Registry & Deployment

**Options**:

1. **Docker Hub** - Free public/private repos
2. **GitHub Container Registry (ghcr.io)** - Integrated with GitHub
3. **Azure Container Registry (ACR)** - For Azure deployments
4. **AWS ECR** - For AWS deployments

**Workflow**:

```bash
# Tag image for registry
docker tag my-note:latest myusername/my-note:latest

# Push to registry
docker push myusername/my-note:latest

# Pull and run on deployment target
docker pull myusername/my-note:latest
docker run -p 3000:80 myusername/my-note:latest
```

### Environment-Specific Builds

**Development Dockerfile** (includes dev tools):

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
```

**Production Dockerfile** (optimized, multi-stage):

- Use Alpine base (smaller)
- Import only build output
- Serve via Nginx
- No dev dependencies
- Minimal layers

### Health Checks & Logging

```dockerfile
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### Deployment Best Practices

- **Image tagging**: Use semantic versioning (`v1.0.0`, `latest`, `stable`)
- **Security**: Don't include secrets in image; use environment variables
- **Caching**: Order Dockerfile directives from least to most frequently changing
- **Size optimization**: Use `.dockerignore`, multi-stage builds, Alpine images
- **Logging**: Configure Docker to capture stdout/stderr for monitoring
- **CI/CD integration**: Automate builds with GitHub Actions, GitLab CI, etc.

### Example GitHub Actions Workflow

```yaml
name: Build & Push Docker Image

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
```

### Troubleshooting Common Issues

| Issue                                | Cause                            | Solution                                             |
| ------------------------------------ | -------------------------------- | ---------------------------------------------------- |
| App not accessible on localhost:3000 | Port not mapped                  | Use `-p 3000:80` or `ports` in compose               |
| 404 on route reload                  | SPA routing not configured       | Update nginx.conf with `try_files`                   |
| Build fails with "npm not found"     | Node not in PATH                 | Verify Node base image in Dockerfile                 |
| Image too large                      | Many layers or dev deps included | Use multi-stage build, slim/Alpine base              |
| Container exits immediately          | No entrypoint or CMD             | Add `CMD ["nginx", "-g", "daemon off;"]` for servers |

---

**Note**: This is a frontend-only project with no backend API or authentication. Focus on clean component architecture, state management, and responsive UI design.
