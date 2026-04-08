# Contributing to BPIT Site Redesign

Thank you for your interest in contributing to the BPIT Site Redesign project! This guide will help you get started with contributing to our Next.js-based college website redesign.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Making Contributions](#making-contributions)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Common Issues](#common-issues)
- [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** (latest version)
- A code editor (VS Code recommended)

### Recommended VS Code Extensions

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

## Getting Started

### 1. Fork the Repository

1. Navigate to the [BPIT Site repository](https://github.com/your-username/bpit-site-copy)
2. Click the **"Fork"** button in the top-right corner
3. Select your GitHub account to create the fork

### 2. Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/bpit-site-copy.git

# Navigate to the project directory
cd bpit-site-copy

# Add the original repository as upstream
git remote add upstream https://github.com/ORIGINAL_USERNAME/bpit-site-copy.git

# Verify the remotes
git remote -v
```

### 3. Install Dependencies

```bash
# Install all project dependencies
npm install

# Or if you prefer yarn
yarn install
```

## Development Setup

### 1. Start the Development Server

```bash
# Start the development server with Turbopack
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:3000`

### 2. Available Scripts

```bash
# Development server with Turbopack (faster builds)
npm run dev

# Build the application for production
npm run build

# Start the production server
npm run start

# Run ESLint for code quality
npm run lint
```

### 3. Environment Setup

Currently, the project doesn't require environment variables, but if you need to add any:

1. Create a `.env.local` file in the root directory
2. Add your environment variables (never commit sensitive data)
3. Restart the development server

## Project Structure

```
bpit-site-copy/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── *.svg files
├── src/
│   ├── app/               # Next.js 15 App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── not-found.tsx  # 404 page
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── header/       # Header components
│   │   ├── events/       # Event-related components
│   │   ├── notices/      # Notice components
│   │   └── *.tsx files   # Other components
│   └── lib/
│       └── utils.ts      # Utility functions
├── components.json        # Shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── postcss.config.mjs    # PostCSS configuration
```

### Key Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animations
- **Radix UI** - Accessible component primitives
- **React Three Fiber** - 3D graphics
- **Lucide React** - Icons

## Development Workflow

### 1. Before Making Changes

```bash
# Ensure you're on the main branch
git checkout main

# Pull the latest changes from upstream
git fetch upstream
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 2. Create a Feature Branch

```bash
# Create and checkout a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. Making Changes

- Follow the existing code structure and patterns
- Write clean, readable, and well-commented code
- Test your changes thoroughly
- Ensure responsive design works on all screen sizes

## Code Style Guidelines

### TypeScript/React Guidelines

- Use TypeScript for all new files
- Use functional components with hooks
- Prefer named exports over default exports
- Use descriptive variable and function names
- Add proper type annotations

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Avoid
export default function button(props: any) {
  return <button>{props.children}</button>;
}
```

### CSS/Tailwind Guidelines

- Use Tailwind CSS classes for styling
- Follow the BEM methodology for custom CSS classes
- Use the existing design system colors and spacing
- Ensure dark mode compatibility

```tsx
// ✅ Good
<div className="bg-background text-foreground p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-2">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ Avoid inline styles
<div style={{ backgroundColor: '#fff', padding: '16px' }}>
  Content
</div>
```

### Component Guidelines

- Keep components small and focused
- Use proper file naming (PascalCase for components)
- Include JSDoc comments for complex components
- Handle loading and error states

```typescript
/**
 * EventCard component displays information about college events
 * @param event - Event data object
 * @param className - Additional CSS classes
 */
interface EventCardProps {
  event: {
    title: string;
    date: string;
    description: string;
  };
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, className }) => {
  // Component implementation
};
```

## Making Contributions

### Types of Contributions Welcome

1. **Bug Fixes** - Fix existing issues or bugs
2. **Feature Enhancements** - Add new features or improve existing ones
3. **UI/UX Improvements** - Enhance user interface and experience
4. **Performance Optimizations** - Improve page load times and responsiveness
5. **Documentation** - Improve README, comments, or add new docs
6. **Accessibility** - Improve accessibility features
7. **Testing** - Add or improve tests

### Before You Start

1. Check existing [issues](https://github.com/your-username/bpit-site-copy/issues) and [pull requests](https://github.com/your-username/bpit-site-copy/pulls)
2. Create an issue to discuss major changes before implementing
3. Ensure your idea aligns with the project's goals

### Component Development Guidelines

When creating new components:

1. **Place in appropriate directory**: 
   - UI components → `src/components/ui/`
   - Feature components → `src/components/[feature]/`
   - Page-specific → `src/components/`

2. **Follow naming conventions**:
   - Files: `kebab-case.tsx`
   - Components: `PascalCase`
   - Props interfaces: `ComponentNameProps`

3. **Include proper TypeScript types**
4. **Make components responsive**
5. **Support dark mode**
6. **Add proper accessibility attributes**

## Submitting Pull Requests

### 1. Prepare Your Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new hero section component

- Add responsive hero component with animations
- Include dark mode support
- Add TypeScript interfaces
- Ensure accessibility compliance"

# Push to your fork
git push origin feature/your-feature-name
```

### 2. Commit Message Guidelines

Follow conventional commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Build process or auxiliary tool changes

### 3. Create Pull Request

1. Go to your fork on GitHub
2. Click **"New Pull Request"**
3. Select the base repository and branch (usually `main`)
4. Fill out the PR template with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Testing steps
   - Related issues

### 4. PR Checklist

Before submitting, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] Changes are responsive and work on mobile
- [ ] Dark mode is supported (if applicable)
- [ ] Accessibility guidelines are followed
- [ ] No console errors or warnings
- [ ] Code is properly typed (TypeScript)
- [ ] Documentation is updated (if needed)

### 5. PR Template Example

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
(If applicable, add screenshots showing before/after)

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested in dark mode
- [ ] No console errors

## Related Issues
Closes #(issue number)
```

## Common Issues

### Installation Issues

**Node version compatibility:**
```bash
# Check your Node version
node --version

# If you need to update Node.js, use nvm (recommended)
nvm install 18
nvm use 18
```

**Dependency conflicts:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Development Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

**TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Build Issues

**Build failures:**
```bash
# Clean Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## Additional Resources

### Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

### Design Resources

- [Figma Design Files](link-to-figma-if-available)
- [Color Palette](docs/design/colors.md)
- [Typography Guidelines](docs/design/typography.md)
- [Component Library](docs/design/components.md)

### Community

- [Discord Server](link-to-discord-if-available)
- [Discussions](https://github.com/your-username/bpit-site-copy/discussions)
- [Issues](https://github.com/your-username/bpit-site-copy/issues)

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Questions?

If you have any questions or need help:

1. Check existing [issues](https://github.com/your-username/bpit-site-copy/issues)
2. Create a new issue with the "question" label
3. Join our [community discussions](https://github.com/your-username/bpit-site-copy/discussions)

---

Thank you for contributing to the BPIT Site Redesign project! 🚀 