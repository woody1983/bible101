# Agents Configuration for Bible101

> This file provides essential context for AI agents working on this project.

## Project Overview

**Bible101** is a modern Bible study platform built with React 18 + TypeScript.

- **Tech Stack**: React 18, TypeScript 5.x, Vite 7.x, Tailwind CSS 4.x, Zustand 5.x
- **Testing**: Vitest + React Testing Library
- **Data**: Static JSON files (KJV + Chinese Union Version)

## Essential Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing (TDD Required!)
```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

### Linting
```bash
# Run ESLint
npm run lint
```

## Code Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `ExamMode.tsx`)
- Utilities: `camelCase.ts` (e.g., `examGenerator.ts`)
- Types: `PascalCase.ts` (e.g., `ExamQuestion.ts`)
- Tests: `*.test.ts` or `*.test.tsx`

### Code Style
- Use TypeScript with strict mode
- Use Tailwind CSS for styling
- Prefer function components with hooks
- Follow existing patterns in the codebase

## Critical Rules

### 1. TDD is Mandatory
- **ALWAYS** write tests BEFORE implementation
- All new features must have tests
- Run `npm test` before committing
- Never commit code with failing tests

### 2. No Direct Commits
- Do NOT commit changes unless explicitly asked
- Wait for user confirmation before committing

### 3. Architecture Changes
- Use `#adr#` mode for architecture decisions
- Document in ARCHITECTURE.md
- Wait for review before implementing

### 4. Issue Workflow
- `#plan#` - Create plan, wait for confirmation
- `#tdd#` - Test-driven development mode
- `#split#` - Split large issues
- `#urgent#` - Priority handling

## Project Structure

```
src/
├── components/       # React components
│   ├── layout/      # Layout components (Navbar, etc.)
│   ├── features/    # Feature components (ExamMode, etc.)
│   └── ui/          # UI base components
├── pages/           # Page components
├── lib/             # Utility functions
├── hooks/           # Custom hooks
├── stores/          # Zustand stores
├── types/           # TypeScript types
├── styles/          # Style system
├── data/            # Data files (Git LFS)
└── test/            # Test setup
```

## Data Files

Large data files are managed via Git LFS:
- `src/data/kjvBible.json` (10MB+) - KJV Bible data
- `src/data/bibleSearchIndex.json` (24MB+) - Search index

## Useful Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full architecture documentation
- [README.md](./README.md) - Project overview
- Package scripts defined in `package.json`

## Agent Memory

- This project uses **TDD** - always test first
- Large data files are in Git LFS, don't commit them
- Follow existing code patterns
- Ask before making architectural changes
