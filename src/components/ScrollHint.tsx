import { FaChevronDown } from 'react-icons/fa';
import { scrollToId } from '../lib/utils';

const TEXT = 'scroll down for GUI';

/** Animated prompt under the terminal that leads to the graphical version of the portfolio. */
export function ScrollHint({ ready }: { ready: boolean }) {
  return (
    <div className="relative flex h-14 shrink-0 items-center justify-center sm:h-16">
      <button
        type="button"
        onClick={() => scrollToId('gui')}
        aria-label="Scroll down for the GUI version"
        className={`group flex flex-col items-center gap-0.5 rounded px-4 py-1 font-mono text-xs font-medium uppercase tracking-[0.3em] text-terminal-accent transition-opacity duration-700 sm:text-sm ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span aria-hidden="true">
          {TEXT.split('').map((letter, index) => (
            <span key={index} className="hint-letter" style={{ animationDelay: `${index * 0.09}s` }}>
              {letter}
            </span>
          ))}
        </span>
        <span className="flex h-4 flex-col items-center justify-center" aria-hidden="true">
          <FaChevronDown className="hint-chevron text-xs" />
        </span>
      </button>
    </div>
  );
}
