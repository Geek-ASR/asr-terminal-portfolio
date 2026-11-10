import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Gui } from './components/gui/Gui';
import { ProjectModal } from './components/ProjectModal';
import { Terminal } from './components/terminal/Terminal';
import { themes, type Project, type ThemeName } from './data/portfolio';

const THEME_KEY = 'asr-terminal-theme';

function storedTheme(): ThemeName {
  try {
    const saved = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    if (saved && themes.includes(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to the default theme.
  }
  return 'green';
}

function App() {
  const [theme, setThemeState] = useState<ThemeName>(storedTheme);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const background = getComputedStyle(document.documentElement).getPropertyValue('--t-bg').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `rgb(${background.split(' ').join(', ')})`);
  }, [theme]);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore: the theme still applies for this visit.
    }
  }, []);

  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-terminal-bg font-mono text-terminal-text">
        <Terminal theme={theme} setTheme={setTheme} openProject={setSelectedProject} />
        <Gui openProject={setSelectedProject} />
        <ProjectModal project={selectedProject} onClose={closeProject} />
      </div>
    </MotionConfig>
  );
}

export default App;
