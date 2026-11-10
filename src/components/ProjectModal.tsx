import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFileAlt, FaGithub, FaTimes } from 'react-icons/fa';
import type { Project } from '../data/portfolio';

export function ProjectLinks({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' }) {
  const base =
    size === 'sm'
      ? 'inline-flex items-center gap-1.5 rounded border border-terminal-accent/30 px-2.5 py-1 font-mono text-xs text-terminal-accent transition hover:border-terminal-accent hover:bg-terminal-accent/10'
      : 'inline-flex items-center gap-2 rounded border border-terminal-accent/40 px-3 py-2 font-mono text-sm text-terminal-accent transition hover:border-terminal-accent hover:bg-terminal-accent/10';
  if (!project.github && !project.demo && !project.paper) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className={base} onClick={(event) => event.stopPropagation()}>
          <FaGithub /> GitHub
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className={base} onClick={(event) => event.stopPropagation()}>
          <FaExternalLinkAlt className="text-[0.8em]" /> Live Demo
        </a>
      )}
      {project.paper && (
        <a href={project.paper} target="_blank" rel="noreferrer" className={base} onClick={(event) => event.stopPropagation()}>
          <FaFileAlt className="text-[0.9em]" /> Paper
        </a>
      )}
    </div>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="term-scroll max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-terminal-accent/30 bg-terminal-bg p-5 font-mono shadow-[0_0_60px_rgb(var(--t-accent)/0.25)] sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-lg text-terminal-accent sm:text-xl">{project.name}</div>
                <div className="mt-1 text-sm text-terminal-secondary">{project.domain}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded border border-terminal-accent/25 p-2 text-terminal-secondary transition hover:border-terminal-accent hover:text-terminal-accent"
              >
                <FaTimes />
              </button>
            </div>
            <p className="font-sans text-[15px] leading-7 text-terminal-text/90">{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-4 space-y-2 font-sans text-sm leading-6 text-terminal-text/80">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="shrink-0 font-mono text-terminal-accent">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 space-y-2 text-sm leading-6">
              <div>
                <span className="text-terminal-accent">Timeline:</span> {project.period}
              </div>
              {project.team && (
                <div>
                  <span className="text-terminal-accent">Team:</span> {project.team}
                </div>
              )}
              <div>
                <span className="text-terminal-accent">{project.stackLabel ?? 'Stack'}:</span> {project.stack.join(' • ')}
              </div>
            </div>
            <div className="mt-6">
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
