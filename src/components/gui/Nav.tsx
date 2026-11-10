import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTerminal, FaTimes } from 'react-icons/fa';
import { profile } from '../../data/portfolio';
import { scrollToId, scrollToTop } from '../../lib/utils';

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const MENU_CLOSE_MS = 200;

/** Highlights the section currently crossing the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  // Browsers cancel a smooth scroll if the page re-renders underneath it, so when the mobile menu
  // is open the jump waits until its closing animation has finished.
  const afterMenuCloses = (action: () => void) => {
    if (!open) {
      action();
      return;
    }
    setOpen(false);
    window.setTimeout(action, MENU_CLOSE_MS + 60);
  };

  const go = (id: string) => afterMenuCloses(() => scrollToId(id));

  const backToTerminal = () => afterMenuCloses(scrollToTop);

  return (
    <header className="sticky top-0 z-40 border-b border-terminal-accent/15 bg-terminal-bg/85 backdrop-blur-md">
      <nav aria-label="Sections" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => go('gui')}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.2em] text-terminal-accent"
          aria-label={`${profile.fullName} — top of the GUI`}
        >
          <span className="rounded border border-terminal-accent/40 bg-terminal-accent/10 px-1.5 py-0.5">{profile.initials}</span>
          <span className="hidden text-xs font-normal tracking-normal text-terminal-secondary sm:inline">~/portfolio</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? 'true' : undefined}
                className={`rounded px-2.5 py-1.5 font-mono text-xs transition xl:px-3 xl:text-[13px] ${
                  active === id
                    ? 'bg-terminal-accent/15 text-terminal-accent'
                    : 'text-terminal-text/70 hover:bg-terminal-accent/10 hover:text-terminal-accent'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={backToTerminal}
            className="inline-flex items-center gap-2 rounded border border-terminal-accent/40 bg-terminal-accent/10 px-3 py-1.5 font-mono text-xs text-terminal-accent transition hover:bg-terminal-accent/25"
          >
            <FaTerminal /> Terminal
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded border border-terminal-accent/30 text-terminal-accent lg:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: MENU_CLOSE_MS / 1000 }}
            className="absolute inset-x-0 top-full overflow-hidden border-y border-terminal-accent/15 bg-terminal-bg shadow-[0_20px_40px_rgba(0,0,0,0.6)] lg:hidden"
          >
            <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:px-6">
              {navSections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    className={`w-full rounded px-3 py-2.5 text-left font-mono text-sm transition ${
                      active === id ? 'bg-terminal-accent/15 text-terminal-accent' : 'text-terminal-text/80 active:bg-terminal-accent/10'
                    }`}
                  >
                    <span className="text-terminal-accent/60">./</span>
                    {label.toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
