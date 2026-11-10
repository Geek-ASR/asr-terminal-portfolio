import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTerminal,
} from 'react-icons/fa';
import { SiLangchain, SiMongodb, SiNodedotjs, SiReact, SiSolidity, SiTypescript } from 'react-icons/si';
import { profile, socialUrl, type Project, type ThemeName } from '../../data/portfolio';
import { asset, downloadResume, hasFinePointer, prefersReducedMotion, sleep } from '../../lib/utils';
import { ScrollHint } from '../ScrollHint';
import { AsciiBanner, commandCatalog, fileNames, quickCommands, runCommand, RunContext } from './commands';

interface Entry {
  id: number;
  command: string;
  output: ReactNode;
}

interface TerminalProps {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  openProject: (project: Project) => void;
}

const PROMPT = 'visitor@asr:~$';
const BOOT_DURATION = 5200;

const bootLines = [
  'Initializing kernel...',
  'Loading modules...',
  'Mounting filesystem...',
  'Connecting to portfolio...',
  'Checking memory...',
  'Loading developer profile...',
  'Authentication successful.',
  'Welcome.',
];

function BootScreen() {
  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-0 flex-col overflow-hidden text-xs leading-5 sm:text-sm sm:leading-7"
    >
      <div className="space-y-1 sm:space-y-3">
        {bootLines.map((line, index) => (
          <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.35 }}>
            {line}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="mt-4 text-terminal-accent sm:mt-6"
      >
        <div className="space-y-4 pt-2 text-center sm:space-y-6 sm:pt-4">
          <div className="relative flex h-10 items-center justify-center sm:h-12">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="absolute text-sm text-terminal-text sm:text-base"
            >
              {profile.fullName}
            </motion.div>

            <div className="flex justify-center gap-8">
              {profile.initials.split('').map((letter, index) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.4, duration: 0.6 }}
                  className="text-2xl font-bold sm:text-3xl"
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.5 }}>
            <AsciiBanner className="text-[10px] sm:text-[15px] lg:text-[20px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.1, duration: 0.5 }}
            className="space-y-1"
          >
            <div className="text-base font-bold text-terminal-text sm:text-lg">{profile.fullName}</div>
            <div className="text-xs text-terminal-secondary sm:text-sm">
              {profile.role} • {profile.location}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-auto pt-3 text-center text-[10px] uppercase tracking-[0.25em] text-terminal-secondary/50">
        tap or press any key to skip
      </div>
    </motion.div>
  );
}

function BackgroundLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[1px] w-[160px] rounded-full bg-terminal-accent/20"
          style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1], x: [0, 40, 0] }}
          transition={{ duration: 8 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/** Compact identity strip shown instead of the sidebar on phones and tablets. */
function MobileProfile() {
  const iconLink =
    'flex h-8 w-8 items-center justify-center rounded border border-terminal-accent/25 text-sm text-terminal-link transition active:bg-terminal-accent/20 sm:h-9 sm:w-9 sm:text-base';
  return (
    <div className="mb-3 flex shrink-0 items-center gap-2.5 border-b border-terminal-accent/20 pb-3 sm:gap-3 lg:hidden">
      <img
        src={asset(profile.photo)}
        alt={profile.fullName}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-lg border border-terminal-accent/50 object-cover object-top"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold text-terminal-accent xs:text-[13px] sm:text-sm">{profile.fullName}</div>
        <div className="truncate text-[11px] text-terminal-secondary">
          {profile.role}
          <span className="hidden sm:inline"> • {profile.location}</span>
        </div>
      </div>
      <div className="flex shrink-0 gap-1 sm:gap-1.5">
        <a href={socialUrl('GitHub')} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
          <FaGithub />
        </a>
        <a href={socialUrl('LinkedIn')} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
          <FaLinkedin />
        </a>
        <button type="button" onClick={downloadResume} aria-label="Download resume" className={iconLink}>
          <FaDownload />
        </button>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="term-scroll hidden w-[320px] shrink-0 overflow-y-auto border-l border-terminal-accent/20 bg-black/20 p-4 lg:block">
      <div className="space-y-4 text-sm leading-7">
        <div className="flex justify-center">
          <img
            src={asset(profile.photo)}
            alt={profile.fullName}
            width={160}
            height={160}
            className="h-40 w-40 rounded-lg border-2 border-terminal-accent/50 object-cover shadow-[0_0_30px_rgb(var(--t-accent)/0.3)]"
          />
        </div>
        <div className="text-center">
          <div className="font-semibold text-terminal-accent">{profile.fullName}</div>
          <div className="text-xs text-terminal-secondary">{profile.role}</div>
          <div className="text-xs text-terminal-secondary">{profile.location}</div>
        </div>
        <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
          <div className="mb-2 flex items-center gap-2 text-terminal-accent">
            <FaBrain /> <span>Focus</span>
          </div>
          <div>{profile.focus}</div>
        </div>
        <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
          <div className="mb-2 flex items-center gap-2 text-terminal-accent">
            <FaServer /> <span>Stack</span>
          </div>
          <div className="flex flex-wrap gap-2 text-terminal-secondary">
            <SiReact className="text-2xl" title="React" />
            <SiTypescript className="text-2xl" title="TypeScript" />
            <SiNodedotjs className="text-2xl" title="Node.js" />
            <SiMongodb className="text-2xl" title="MongoDB" />
            <SiSolidity className="text-2xl" title="Solidity" />
            <SiLangchain className="text-2xl" title="LangChain" />
          </div>
        </div>
        <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
          <div className="mb-2 flex items-center gap-2 text-terminal-accent">
            <FaShieldAlt /> <span>Availability</span>
          </div>
          <div>{profile.availability}</div>
        </div>
        <button
          type="button"
          onClick={downloadResume}
          className="w-full rounded border border-terminal-accent/40 bg-terminal-accent/20 px-3 py-2 text-terminal-accent transition hover:border-terminal-accent hover:bg-terminal-accent/30"
        >
          Download Resume →
        </button>
        <div className="flex gap-3 text-xl text-terminal-link">
          <a href={socialUrl('GitHub')} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-terminal-accent">
            <FaGithub />
          </a>
          <a href={socialUrl('LinkedIn')} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-terminal-accent">
            <FaLinkedin />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition hover:text-terminal-accent">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </aside>
  );
}

export function Terminal({ theme, setTheme, openProject }: TerminalProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [booting, setBooting] = useState(true);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const draft = useRef('');
  const busy = useRef(false);
  const mounted = useRef(true);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // The prompt is unmounted during the boot screen and while a command is being typed for the
  // visitor, so focus is requested here and applied as soon as the input mounts again.
  const wantFocus = useRef(false);
  const attachInput = useCallback((element: HTMLInputElement | null) => {
    inputRef.current = element;
    if (element && wantFocus.current) {
      wantFocus.current = false;
      element.focus({ preventScroll: true });
    }
  }, []);

  /** Runs a command immediately and appends it, with its output, to the scrollback. */
  const execute = useCallback(
    (raw: string) => {
      const command = raw.trim();
      historyIndex.current = null;
      draft.current = '';
      setInput('');

      if (!command) {
        setEntries((prev) => [...prev, { id: nextId.current++, command: '', output: null }]);
        return;
      }

      commandHistory.current.push(command);

      if (command.toLowerCase() === 'clear') {
        setEntries([]);
        return;
      }

      const output = runCommand(command, {
        history: [...commandHistory.current],
        theme: themeRef.current,
        setTheme,
        openProject,
      });
      setEntries((prev) => [...prev, { id: nextId.current++, command, output }]);
    },
    [openProject, setTheme],
  );

  /** Types a command into the prompt character by character, then runs it — used by every clickable command. */
  const runTyped = useCallback(
    async (command: string) => {
      if (busy.current) return;
      busy.current = true;
      setTyping(true);
      setInput('');

      if (!prefersReducedMotion()) {
        await sleep(120);
        for (let i = 1; i <= command.length; i += 1) {
          if (!mounted.current) return;
          setInput(command.slice(0, i));
          await sleep(32 + Math.random() * 48);
        }
        await sleep(260);
      }

      if (!mounted.current) return;
      execute(command);
      wantFocus.current = hasFinePointer();
      setTyping(false);
      busy.current = false;
    },
    [execute],
  );

  // Boot sequence, skippable with any key or a tap.
  useEffect(() => {
    if (!booting) return;
    const finish = () => setBooting(false);
    const timer = window.setTimeout(finish, prefersReducedMotion() ? 600 : BOOT_DURATION);
    window.addEventListener('keydown', finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', finish);
    };
  }, [booting]);

  useEffect(() => {
    if (booting) return;
    setEntries((prev) => {
      if (prev.length) return prev;
      const output = runCommand('help', { history: [], theme: themeRef.current, setTheme, openProject });
      return [{ id: nextId.current++, command: 'help', output }];
    });
    // Only grab focus where it will not pop up an on-screen keyboard or yank the page.
    if (hasFinePointer() && window.scrollY < 80) {
      if (inputRef.current) focusInput();
      else wantFocus.current = true;
    }
  }, [booting, focusInput, openProject, setTheme]);

  // Keep the newest command in view: bottom-align short output, top-align output taller than the pane.
  useEffect(() => {
    const pane = outputRef.current;
    if (!pane) return;
    const last = pane.lastElementChild as HTMLElement | null;
    if (last && last.offsetHeight > pane.clientHeight) {
      pane.scrollTop = last.offsetTop;
    } else {
      pane.scrollTop = pane.scrollHeight;
    }
  }, [entries]);

  const complete = () => {
    const value = input.trimStart();
    if (!value) return;
    const parts = value.split(/\s+/);
    const isArgument = parts.length > 1;
    const needle = parts[parts.length - 1].toLowerCase();
    const pool = isArgument ? fileNames.map((name) => name.replace(/\/$/, '')) : commandCatalog;
    const matches = pool.filter((name) => name.startsWith(needle));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      setInput(`${parts.join(' ')}${isArgument ? '' : ' '}`);
    } else if (matches.length > 1) {
      setEntries((prev) => [...prev, { id: nextId.current++, command: value, output: matches.join('   ') }]);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const history = commandHistory.current;

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!busy.current) execute(input);
    } else if (event.key === 'Tab') {
      if (input.trim()) {
        event.preventDefault();
        complete();
      }
    } else if (event.key === 'ArrowUp') {
      if (!history.length) return;
      event.preventDefault();
      if (historyIndex.current === null) {
        draft.current = input;
        historyIndex.current = history.length - 1;
      } else {
        historyIndex.current = Math.max(0, historyIndex.current - 1);
      }
      setInput(history[historyIndex.current]);
    } else if (event.key === 'ArrowDown') {
      if (historyIndex.current === null) return;
      event.preventDefault();
      if (historyIndex.current >= history.length - 1) {
        historyIndex.current = null;
        setInput(draft.current);
      } else {
        historyIndex.current += 1;
        setInput(history[historyIndex.current]);
      }
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setEntries([]);
    } else if (event.ctrlKey && event.key.toLowerCase() === 'c' && !window.getSelection()?.toString()) {
      event.preventDefault();
      setEntries((prev) => [...prev, { id: nextId.current++, command: `${input}^C`, output: null }]);
      setInput('');
      historyIndex.current = null;
    }
  };

  // Clicking empty terminal space focuses the prompt, as in a real terminal.
  const onPaneClick = (event: MouseEvent<HTMLDivElement>) => {
    if (booting) {
      setBooting(false);
      return;
    }
    if ((event.target as HTMLElement).closest('a, button, input, canvas')) return;
    if (window.getSelection()?.toString()) return;
    focusInput();
  };

  return (
    <section
      id="terminal"
      aria-label="Terminal"
      className="screen-h relative flex min-h-[520px] flex-col overflow-hidden bg-[radial-gradient(circle_at_top,rgb(var(--t-accent)/0.08),transparent_45%)] px-2.5 pt-2.5 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8"
    >
      <BackgroundLines />

      <div className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="scanlines relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-terminal-accent/25 bg-black/70 shadow-glow-lg backdrop-blur-xl sm:rounded-2xl lg:max-h-[840px]"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-terminal-accent/20 bg-terminal-accent/10 px-4 py-2.5 text-xs uppercase tracking-[0.3em] text-terminal-secondary sm:py-3">
            <div className="flex items-center gap-2">
              <FaTerminal />
              <span>asr@terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-error" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-warning" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-accent" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col p-3 sm:p-6 lg:p-8" onClick={onPaneClick}>
              <AnimatePresence mode="wait">
                {booting ? (
                  <BootScreen key="boot" />
                ) : (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <MobileProfile />
                    <div className="mb-3 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-terminal-secondary sm:text-xs sm:tracking-[0.3em]">
                      <span className="flex items-center gap-2">
                        <FaRocket /> Boot complete
                      </span>
                      <span className="flex items-center gap-2">
                        <FaCode /> Interactive shell ready
                      </span>
                    </div>

                    <RunContext.Provider value={runTyped}>
                      <div
                        ref={outputRef}
                        role="log"
                        aria-live="polite"
                        className="term-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-2 text-[13px] sm:text-base"
                      >
                        {entries.map((entry) => (
                          <div key={entry.id} className="mb-4 space-y-2">
                            <div className="flex flex-wrap items-center gap-x-2 text-terminal-secondary">
                              <span className="text-terminal-accent">{PROMPT}</span>
                              <span className="break-all">{entry.command}</span>
                            </div>
                            {entry.output !== null && entry.output !== '' && (
                              <div
                                className={`leading-6 text-terminal-text sm:leading-7 ${
                                  typeof entry.output === 'string' ? 'whitespace-pre-wrap break-words' : ''
                                }`}
                              >
                                {entry.output}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="no-scrollbar -mx-1 mt-2 flex shrink-0 gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
                        {quickCommands.map((name) => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => runTyped(name)}
                            className="shrink-0 rounded border border-terminal-accent/30 bg-terminal-accent/10 px-2.5 py-1 text-xs text-terminal-accent transition active:bg-terminal-accent/30"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </RunContext.Provider>

                    <label className="mt-2 flex shrink-0 cursor-text items-center gap-2 border-t border-terminal-accent/20 pt-3">
                      <span className="shrink-0 text-sm text-terminal-accent sm:text-base">{PROMPT}</span>
                      {typing ? (
                        <span className="flex min-w-0 flex-1 items-center whitespace-pre text-base" aria-live="off">
                          <span className="truncate">{input}</span>
                          <span className="cursor-blink ml-px inline-block h-[1.15em] w-[0.6em] shrink-0 bg-terminal-accent" />
                        </span>
                      ) : (
                        <input
                          ref={attachInput}
                          value={input}
                          onChange={(event) => {
                            historyIndex.current = null;
                            setInput(event.target.value);
                          }}
                          onKeyDown={onKeyDown}
                          className="w-full min-w-0 flex-1 bg-transparent text-base text-terminal-text caret-terminal-accent outline-none placeholder:text-terminal-secondary/40"
                          placeholder="type a command or click one above"
                          aria-label="Terminal command input"
                          enterKeyHint="go"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                        />
                      )}
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Sidebar />
          </div>
        </motion.div>
      </div>

      <ScrollHint ready={!booting} />
    </section>
  );
}
