import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Fades content up the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  command,
  title,
  subtitle,
  children,
}: {
  id: string;
  command: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-12 sm:py-16">
      <Reveal className="mb-8 sm:mb-10">
        <div className="font-mono text-xs text-terminal-secondary/80 sm:text-sm">
          <span className="text-terminal-accent">visitor@asr:~$</span> {command}
        </div>
        <h2 id={`${id}-title`} className="mt-2 font-mono text-2xl font-bold text-terminal-text sm:text-3xl">
          {title}
          <span className="cursor-blink text-terminal-accent">_</span>
        </h2>
        {subtitle && <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-terminal-text/60 sm:text-base">{subtitle}</p>}
      </Reveal>
      {children}
    </section>
  );
}

export const cardClass =
  'rounded-xl border border-terminal-accent/15 bg-black/30 transition duration-300 hover:border-terminal-accent/50 hover:shadow-glow';

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[11px] leading-5 ${
        tone === 'accent'
          ? 'border-terminal-accent/40 bg-terminal-accent/15 text-terminal-accent'
          : 'border-terminal-accent/20 bg-terminal-accent/5 text-terminal-secondary'
      }`}
    >
      {children}
    </span>
  );
}

export const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-terminal-accent bg-terminal-accent/20 px-4 py-2.5 font-mono text-sm font-medium text-terminal-accent transition hover:bg-terminal-accent/30 hover:shadow-glow';

export const ghostButton =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-terminal-accent/30 px-4 py-2.5 font-mono text-sm text-terminal-text transition hover:border-terminal-accent hover:bg-terminal-accent/10 hover:text-terminal-accent';
