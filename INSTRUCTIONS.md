# Project Setup & Instructions

Welcome to **ervarunotes** - A documentation and notes management system built with Astro. This guide covers everything needed to run, develop, test, and deploy this project.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Running the Project](#running-the-project)
5. [Testing Code](#testing-code)
6. [Building the Project](#building-the-project)
7. [Docker Setup](#docker-setup)
8. [Project Structure](#project-structure)
9. [Development Workflow](#development-workflow)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**ervarunotes** is a documentation website built with:

- **Astro** — Static site generator (v5.16.0)
- **Starlight** — Documentation theme for Astro
- **Tailwind CSS** — Utility-first CSS framework
- **DocSearch** — Full-text search for documentation
- **Node.js** — JavaScript runtime

The project is organized as a personal knowledge management system with structured content areas:

- Projects — `01_Projects/`
- Areas of knowledge — `02_Areas/`
- Resources — `03_Resources/`
- Archive — `04_Archive/`
- Quick notes — `05_Quick_Notes/`

---

## Prerequisites

### Required Software

Ensure you have the following installed on your system:

1. **Node.js** (v18 or higher)

   - Download: https://nodejs.org/
   - Verify installation: `node --version && npm --version`

2. **Git** (for version control)

   - Verify installation: `git --version`

3. **Docker & Docker Compose** (optional, for containerized development)

   - Download: https://www.docker.com/
   - Verify installation: `docker --version && docker-compose --version`

4. **Code Editor** (recommended: VS Code)
   - Download: https://code.visualstudio.com/

### System Requirements

- **OS**: Linux, macOS, or Windows (with WSL2)
- **RAM**: Minimum 2GB, recommended 4GB or more
- **Disk Space**: Minimum 1GB for `node_modules` and builds

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VarunSharma3520
```

### 2. Install Dependencies

Using npm (recommended):

```bash
npm install
```

This will install all required packages listed in `package.json`:

- `astro` — Core framework
- `@astrojs/starlight` — Documentation theme
- `tailwindcss` — CSS framework
- `sharp` — Image optimization
- Other dependencies

Verify installation:

```bash
npm list
```

### 3. Environment Setup (Optional)

Some features may require environment variables. Check if `.dev.env` exists:

```bash
cat .dev.env
```

If you need to add environment variables, create or modify `.env` file:

```bash
# Example .env file
NODE_ENV=development
```

---

## Running the Project

### Local Development Server

Start the development server with hot reload:

```bash
npm run dev
# or
npm start
```

**Expected Output:**

```
astro@5.16.0 dev
Local    http://localhost:4321/
```

**Access the site:** Open http://localhost:4321/ in your browser

**Features available:**

- Live hot reload on file changes
- Tailwind CSS compilation
- Image optimization
- Full-text documentation search

### Stop the Server

Press `Ctrl+C` in the terminal

---

## Testing Code

### Manual Testing

#### 1. **Test Documentation Rendering**

1. Start the dev server: `npm run dev`
2. Open http://localhost:4321/
3. Verify the following:
   - Header and navigation display correctly
   - All sections load without errors
   - Images render properly
   - Search functionality works
   - Internal links navigate correctly

#### 2. **Test Individual Pages**

Navigate to specific sections in the sidebar:

- `/01_Projects/` — Project documentation
- `/02_Areas/` — Knowledge areas
- `/03_Resources/` — Reference materials
- `/05_Quick_Notes/` — Quick reference notes

#### 3. **Browser Console Testing**

1. Open Developer Tools (F12 or Cmd+Option+I)
2. Check Console tab for errors or warnings
3. Verify no network errors in Network tab
4. Check mobile responsiveness (Ctrl+Shift+M)

#### 4. **Build Testing**

Test if the project builds successfully:

```bash
npm run build
```

Expected output:

```
Building your site...
✓ Built in XXs

To preview your build locally, run `npm run preview`
```

#### 5. **Preview Build**

Preview the production build locally:

```bash
npm run preview
```

Access at http://localhost:3000/ (or configured port)

---

## Building the Project

### Production Build

Create an optimized production build:

```bash
npm run build
```

This will:

1. Compile all Astro components
2. Optimize images with sharp
3. Generate static HTML files
4. Bundle CSS and JavaScript
5. Output to `dist/` directory

**Build output:**

```
dist/
├── index.html
├── 01_Projects/
├── 02_Areas/
├── assets/
└── ...
```

### Build Verification

Check the generated files:

```bash
ls -la dist/
```

Verify the build size:

```bash
du -sh dist/
```

---

## Docker Setup

### Using Docker Compose (Recommended)

#### 1. **Build and Run**

Start the containerized development environment:

```bash
docker-compose up
```

This will:

1. Create a Docker container with Node.js 24
2. Install dependencies
3. Start the dev server on port 4321
4. Watch for file changes

**Access:** http://localhost:4321/

#### 2. **Detached Mode**

Run in background:

```bash
docker-compose up -d
```

#### 3. **View Logs**

```bash
docker-compose logs -f
```

#### 4. **Stop Service**

```bash
docker-compose down
```

#### 5. **Rebuild Container**

If dependencies change:

```bash
docker-compose up --build
```

### Docker Volumes

The Docker setup includes:

- `./` mounted to `/app` (source code, with caching)
- `app_data:/app/data` (persistent volume for data)

### Alternative: N8N Integration

If using N8N (automation workflow):

```bash
docker-compose -f docker-compose.n8n.yml up
```

---

## Project Structure

```
VarunSharma3520/
├── src/
│   ├── components/           # Reusable Astro components
│   │   └── header.astro      # Header component
│   ├── content/              # Content management config
│   │   ├── 02_areas/         # Knowledge areas
│   │   ├── docs/             # Documentation structure
│   │   │   ├── 01_Projects/  # Project documentation
│   │   │   ├── 02_Areas/     # Knowledge areas (Business, Engineering, etc.)
│   │   │   ├── 03_Resources/ # Blogs, books, references
│   │   │   ├── 04_Archive/   # Archived content
│   │   │   └── 05_Quick_Notes/ # Quick reference
│   │   ├── assets/           # Images and media
│   │   └── data/             # Data files (EPUB, etc.)
│   ├── styles/               # Global CSS
│   │   └── global.css        # Global styles
│   └── content.config.ts     # Content configuration
│
├── public/                    # Static files (robots.txt, assets)
├── dist/                     # Build output (generated)
├── data/                     # Application data
│
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Project dependencies
├── docker-compose.yml        # Docker development setup
├── INSTRUCTIONS.md           # This file
├── README.md                 # Project overview
└── CONTRIBUTING.md           # Contribution guidelines
```

---

## Development Workflow

### 1. **Create New Content**

Add markdown files in the appropriate content directory:

```bash
# Add to quick notes
touch src/content/docs/05_Quick_Notes/NewTopic.md

# Add to resources
touch src/content/docs/03_Resources/Blogs/NewBlog.md
```

### 2. **Edit Content**

Use your preferred editor to edit `.md` or `.mdx` files. The dev server will auto-reload.

```bash
# Start dev server
npm run dev

# Edit files in src/content/
vim src/content/docs/05_Quick_Notes/NewTopic.md
```

### 3. **Add Images**

Place images in `src/content/assets/`:

```bash
cp /path/to/image.png src/content/assets/
```

Reference in markdown:

```markdown
![Alt text](../../assets/image.png)
```

### 4. **Add Components**

Create new Astro components in `src/components/`:

```bash
touch src/components/MyComponent.astro
```

### 5. **Test Locally**

```bash
npm run dev
```

### 6. **Build for Production**

```bash
npm run build
npm run preview
```

### 7. **Deploy**

After verification, commit and push:

```bash
git add .
git commit -m "Add new content or feature"
git push origin main
```

---

## Configuration

### Astro Configuration (`astro.config.mjs`)

Key settings:

- **Base URL**: `/`
- **Vite watch**: Set to use polling (for Docker compatibility)
- **Tailwind CSS**: Enabled via Vite plugin
- **Starlight theme**: Configured with custom header

### Tailwind CSS Configuration

Configure in `tailwind.config.js` or use Astro's inline configuration.

### TypeScript Configuration

Configure type checking in `tsconfig.json`.

---

## NPM Scripts

```bash
npm run dev        # Start development server
npm start          # Alias for npm run dev
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run astro      # Run Astro CLI directly
```

### Advanced Astro Commands

```bash
# Check for issues
npx astro check

# Format code
npx prettier --write .

# Clean build cache
rm -rf .astro
```

---

## Troubleshooting

### Issue: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::4321`

**Solution:**

```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: Node Modules Issues

**Error:** `npm ERR! cannot find module`

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Docker Permission Denied

**Error:** `Got permission denied while trying to connect to Docker daemon`

**Solution:**

```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

### Issue: Hot Reload Not Working

**Solution:**

1. Ensure `watch.usePolling: true` in `astro.config.mjs`
2. Restart dev server: `npm run dev`
3. Check file watcher limits:

```bash
cat /proc/sys/fs/inotify/max_user_watches
# If too low, increase it:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Issue: Build Fails with Image Errors

**Error:** `Error: Could not process image`

**Solution:**

```bash
# Reinstall sharp (image optimization library)
npm rebuild sharp
# Or clear cache
rm -rf node_modules/.cache
npm install
```

### Issue: Out of Memory During Build

**Error:** `JavaScript heap out of memory`

**Solution:**

```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Performance Tips

1. **Optimize Images** — Use sharp to compress images before committing
2. **Lazy Load Components** — Use Astro's client directives strategically
3. **Monitor Build Size** — Regularly check `npm run build` output
4. **Cache Dependencies** — Docker volumes improve repeated builds

---

## Additional Resources

- **Astro Documentation** — https://docs.astro.build/
- **Starlight Docs** — https://starlight.astro.build/
- **Tailwind CSS** — https://tailwindcss.com/docs
- **Node.js** — https://nodejs.org/docs/

---

## Getting Help

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Astro Documentation](https://docs.astro.build/)
3. Check console logs: `npm run dev` output
4. Open browser DevTools (F12) for client-side issues

---

## Contributing

Before contributing, read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Code style
- Commit message format
- Pull request process

---

**Last Updated:** February 2026  
**Project Version:** 0.0.1  
**Maintained by:** Varun Sharma
