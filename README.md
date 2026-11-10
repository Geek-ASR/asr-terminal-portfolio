# ASR Terminal

An interactive, terminal-themed portfolio with a regular graphical portfolio page underneath it.

**Live:** https://geek-asr.github.io/asr-terminal-portfolio/

## Two views, one page

- **Terminal** — the first screen is a working terminal with an animated boot sequence. Type commands, or click / tap any command you see: it is typed into the prompt and run for you, just like a real shell session.
- **GUI** — scroll down (or run `gui`) for a conventional portfolio page: About, Experience, Projects, Research, Certifications, Skills, Education & Achievements, and Contact.

Both views are rendered from a single data file, so they never drift apart.

## Features

- Animated boot sequence (press any key or tap to skip)
- Clickable commands with a typing animation, command history (↑ / ↓), Tab autocomplete, `Ctrl + L` to clear
- Portfolio commands: `about`, `experience`, `projects`, `research`, `certifications`, `skills`, `education`, `achievements`, `leadership`, `workshops`, `contact`, `socials`, `resume`, `gui`
- Shell commands: `help`, `clear`, `history`, `whoami`, `date`, `pwd`, `ls`, `cd`, `cat`, `echo`, `theme`
- Extras: `neofetch`, `matrix`, `ascii`, `quote`, `fortune`, `coffee`, `hack`, `sudo`, `uptime`, `exit`
- Six colour themes that restyle the whole site: `theme green | ubuntu | hacker | dracula | nord | retro`
- Project detail modals, filterable project grid, research paper card with copyable BibTeX
- Fully responsive: on phones the terminal fits the screen, shows a compact profile strip and a row of tappable command shortcuts
- Respects `prefers-reduced-motion`; SEO metadata, favicon, manifest, robots.txt and sitemap included

## Editing the content

Everything shown on the site lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): profile, experience, projects, research, certifications, skills, education and achievements. Change an entry there and both the terminal and the GUI update.

- Resume PDF: `public/CV_Aditya Rekhe.pdf`
- Profile photo: `public/profile.jpeg`

## Project structure

```
src/
├── data/portfolio.ts            # all content
├── components/
│   ├── terminal/Terminal.tsx    # terminal window, boot screen, prompt
│   ├── terminal/commands.tsx    # every command and its output
│   ├── gui/Gui.tsx              # GUI sections
│   ├── gui/Nav.tsx              # sticky navigation
│   ├── ScrollHint.tsx           # "scroll down for GUI" animation
│   └── ProjectModal.tsx         # project details dialog
├── lib/utils.ts
├── App.tsx
└── index.css                    # theme tokens and animations
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The site is deployed to GitHub Pages by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which builds the project and publishes `dist/`.

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · React Icons

## Author

Aditya Rekhe — [GitHub](https://github.com/Geek-ASR) · [LinkedIn](https://www.linkedin.com/in/aditya-rekhe-94b27122a/)
