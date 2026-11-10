import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  achievements,
  certifications,
  education,
  experience,
  leadership,
  profile,
  projects,
  quotes,
  research,
  skills,
  socials,
  themes,
  workshops,
  type Project,
  type ThemeName,
} from '../../data/portfolio';
import { downloadResume, prefersReducedMotion, scrollToId } from '../../lib/utils';

/** Runs a command in the terminal as if the visitor had typed it. */
export const RunContext = createContext<(command: string) => void>(() => {});

/** A command name inside terminal output. Clicking it types the command into the prompt and runs it. */
export function Cmd({ name, children }: { name: string; children?: ReactNode }) {
  const run = useContext(RunContext);
  return (
    <button type="button" className="cmd-link" onClick={() => run(name)} title={`Run "${name}"`}>
      {children ?? name}
    </button>
  );
}

export const portfolioCommands: [name: string, description: string][] = [
  ['about', 'who I am'],
  ['experience', 'work experience'],
  ['projects', 'things I have built'],
  ['research', 'my research paper'],
  ['certifications', 'certificates I hold'],
  ['skills', 'technical skills'],
  ['education', 'academic background'],
  ['achievements', 'awards and honours'],
  ['leadership', 'positions of responsibility'],
  ['workshops', 'workshops given and attended'],
  ['contact', 'get in touch'],
  ['socials', 'GitHub, LinkedIn and more'],
  ['resume', 'download my resume'],
  ['gui', 'jump to the GUI version'],
];

export const shellCommands = ['help', 'clear', 'history', 'whoami', 'date', 'pwd', 'ls', 'cd', 'cat', 'echo', 'theme'];

export const funCommands = ['neofetch', 'matrix', 'ascii', 'quote', 'fortune', 'coffee', 'hack', 'sudo', 'uptime', 'exit'];

export const commandCatalog = [...portfolioCommands.map(([name]) => name), ...shellCommands, ...funCommands];

/** Commands offered as tap targets above the prompt on small screens. */
export const quickCommands = [
  'help',
  'about',
  'projects',
  'research',
  'certifications',
  'experience',
  'skills',
  'education',
  'contact',
  'resume',
  'gui',
  'clear',
];

const files: Record<string, string> = {
  'about.txt': 'about',
  'experience.txt': 'experience',
  'education.txt': 'education',
  'skills.txt': 'skills',
  'achievements.txt': 'achievements',
  'contact.txt': 'contact',
  'projects/': 'projects',
  'research/': 'research',
  'certifications/': 'certifications',
  'resume.pdf': 'resume',
};

export const fileNames = Object.keys(files);

export interface CommandContext {
  history: string[];
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  openProject: (project: Project) => void;
}

const Key = ({ children }: { children: ReactNode }) => <span className="text-terminal-accent">{children}</span>;

const Dim = ({ children }: { children: ReactNode }) => <span className="text-terminal-secondary">{children}</span>;

const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    className="break-words text-terminal-link underline decoration-terminal-link/40 underline-offset-4 hover:decoration-terminal-link"
  >
    {children}
  </a>
);

const Bullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-1">
    {items.map((item, index) => (
      <li key={index} className="flex gap-2">
        <span className="shrink-0 text-terminal-accent">›</span>
        <span className="min-w-0">{item}</span>
      </li>
    ))}
  </ul>
);

/** Prints lines one after another, like a script writing to stdout. */
function Lines({ lines, delay = 420 }: { lines: string[]; delay?: number }) {
  const [count, setCount] = useState(prefersReducedMotion() ? lines.length : 1);

  useEffect(() => {
    if (count >= lines.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [count, delay, lines.length]);

  return <div className="whitespace-pre-wrap">{lines.slice(0, count).join('\n')}</div>;
}

/** A short burst of "digital rain" drawn on a canvas. */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--t-accent').trim() || '0 255 136';
    const size = 14;
    const columns = Math.ceil(width / size);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -20));
    const glyphs = 'アカサタナハマヤラワ0123456789ASR<>/{}[]';
    context.font = `${size}px "JetBrains Mono", monospace`;

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.12)';
      context.fillRect(0, 0, width, height);
      context.fillStyle = `rgb(${accent.split(' ').join(', ')})`;
      drops.forEach((row, column) => {
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        context.fillText(glyph, column * size, row * size);
        drops[column] = row * size > height && Math.random() > 0.96 ? 0 : row + 1;
      });
    };

    if (prefersReducedMotion()) {
      for (let frame = 0; frame < 40; frame += 1) draw();
      return;
    }

    const interval = window.setInterval(draw, 55);
    const stop = window.setTimeout(() => window.clearInterval(interval), 9000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="h-44 w-full rounded border border-terminal-accent/20 bg-black sm:h-56" />
      <div className="mt-1 text-xs text-terminal-secondary">Wake up, visitor… the Matrix has you.</div>
    </div>
  );
}

export const asciiBanner = [
  ' █████╗   ███████╗  ██████╗ ',
  '██╔══██╗  ██╔════╝  ██╔══██╗',
  '███████║  ███████╗  ██████╔╝',
  '██╔══██║  ╚════██║  ██╔══██╗',
  '██║  ██║  ███████║  ██║  ██║',
  '╚═╝  ╚═╝  ╚══════╝  ╚═╝  ╚═╝',
].join('\n');

export function AsciiBanner({ className = '' }: { className?: string }) {
  return (
    <pre aria-label="ASR" className={`m-0 inline-block text-left font-mono leading-[1.15] text-terminal-accent ${className}`}>
      {asciiBanner}
    </pre>
  );
}

export function HelpOutput() {
  return (
    <div className="space-y-3 text-sm leading-7">
      <div>
        Available commands <Dim>— click or tap any command to run it:</Dim>
      </div>
      <div className="grid gap-x-6 sm:grid-cols-2">
        {portfolioCommands.map(([name, description]) => (
          <div key={name} className="flex min-w-0 items-baseline gap-2">
            <span className="text-terminal-secondary">•</span>
            <Cmd name={name} />
            <span className="truncate text-xs text-terminal-secondary/70">{description}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0">
        <Dim>shell:</Dim>
        {shellCommands.map((name) => (
          <Cmd key={name} name={name} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0">
        <Dim>fun:</Dim>
        {funCommands.map((name) => (
          <Cmd key={name} name={name} />
        ))}
      </div>
      <div className="text-xs leading-6 text-terminal-secondary">
        Tab to autocomplete · ↑ ↓ for history · Prefer a regular page? Scroll down or run <Cmd name="gui" />.
      </div>
    </div>
  );
}

function projectByQuery(query: string) {
  const needle = query.toLowerCase();
  return projects.find((project) => project.name.toLowerCase().includes(needle));
}

export function runCommand(raw: string, ctx: CommandContext): ReactNode {
  const [first, ...args] = raw.trim().split(/\s+/);
  const command = first.toLowerCase();

  switch (command) {
    case 'help':
      return <HelpOutput />;

    case 'whoami':
      return `${profile.fullName} — ${profile.role}`;

    case 'about':
      return (
        <div className="space-y-2">
          <div>
            <Key>Name:</Key> {profile.fullName}
          </div>
          <div>
            <Key>Location:</Key> {profile.location}
          </div>
          <div>
            <Key>Role:</Key> {profile.role}
          </div>
          <div>
            <Key>Interests:</Key> {profile.interests.join(', ')}
          </div>
          <div>
            <Key>Bio:</Key> {profile.summary} {profile.now}
          </div>
          <div className="text-xs text-terminal-secondary">
            Next: <Cmd name="experience" /> · <Cmd name="projects" /> · <Cmd name="research" />
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-2">
          {skills.map((group) => (
            <div key={group.category}>
              <Key>{group.short}:</Key> {group.items.join(', ')}
            </div>
          ))}
        </div>
      );

    case 'experience':
      return (
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.org} className="space-y-2">
              <div>
                <Key>{job.role}</Key> — {job.org}
              </div>
              <div>
                {job.period}
                {job.location ? ` · ${job.location}` : ''}
              </div>
              <div className="text-terminal-secondary">{job.summary}</div>
              <Bullets items={job.points} />
            </div>
          ))}
          <div className="text-xs text-terminal-secondary">
            See also: <Cmd name="leadership" /> · <Cmd name="workshops" />
          </div>
        </div>
      );

    case 'projects':
    case 'project': {
      if (args.length > 0) {
        const match = projectByQuery(args.join(' '));
        if (!match) return `projects: no project matching "${args.join(' ')}"`;
        ctx.openProject(match);
        return `Opening ${match.name}…`;
      }
      return (
        <div className="space-y-3">
          <div className="text-terminal-secondary">{projects.length} projects — click one for the full details:</div>
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <button
                key={project.name}
                type="button"
                onClick={() => ctx.openProject(project)}
                className="flex flex-col items-start justify-start rounded border border-terminal-accent/40 bg-black/30 p-3 text-left transition hover:border-terminal-accent hover:bg-terminal-accent/10"
              >
                <div className="text-terminal-accent">{project.name}</div>
                <div className="mt-1 text-xs leading-5 text-terminal-secondary">
                  {project.domain} • {project.period}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    case 'research':
    case 'paper':
    case 'papers':
      return (
        <div className="space-y-4">
          {research.map((paper, index) => (
            <div key={paper.doi} className="space-y-2">
              <div>
                <Dim>[{index + 1}]</Dim> <Key>{paper.title}</Key>
              </div>
              <div>
                {paper.authors} · {paper.affiliation}
              </div>
              <div className="text-terminal-secondary">
                {paper.venue} · {paper.year} · {paper.status}
              </div>
              <div>
                <Key>DOI:</Key> <Ext href={paper.doiUrl}>{paper.doi}</Ext>
              </div>
              <div>
                <Key>Code:</Key> <Ext href={paper.codeUrl}>{paper.codeUrl.replace('https://', '')}</Ext>
              </div>
              <div>
                <Key>Key findings:</Key>
              </div>
              <Bullets items={paper.findings} />
              <div>
                <Key>Keywords:</Key> {paper.keywords.join(', ')}
              </div>
            </div>
          ))}
          <div className="text-xs text-terminal-secondary">
            Abstract and BibTeX are in the GUI — run <Cmd name="gui" /> or scroll down.
          </div>
        </div>
      );

    case 'certifications':
    case 'certification':
    case 'certificates':
    case 'certs':
      return (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.title}>
              <div>
                <Dim>[{cert.type}]</Dim> <Key>{cert.title}</Key>
              </div>
              <div>
                {cert.issuer} · {cert.date}
              </div>
              <div className="text-sm text-terminal-secondary">{cert.description}</div>
            </div>
          ))}
        </div>
      );

    case 'education':
      return (
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.degree}>
              <div>
                <Key>{item.short}</Key> — {item.institution}
              </div>
              <div>
                {item.affiliation ? `${item.affiliation} • ` : ''}
                {item.period} • {item.score}
              </div>
              {item.notes?.map((note) => (
                <div key={note} className="text-terminal-secondary">
                  {note}
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case 'achievements':
      return (
        <Bullets
          items={achievements.map((item) => (
            <>
              <Key>{item.title}</Key>
              {item.date ? ` (${item.date})` : ''}
              <span className="text-terminal-secondary"> — {item.detail}</span>
            </>
          ))}
        />
      );

    case 'leadership':
      return (
        <Bullets
          items={leadership.map((item) => (
            <>
              <Key>{item.role}</Key> — {item.org} <Dim>({item.period})</Dim>
            </>
          ))}
        />
      );

    case 'workshops':
      return (
        <div className="space-y-2">
          <div>
            <Key>Conducted:</Key> {workshops.conducted}
          </div>
          {workshops.attended.map((item) => (
            <div key={item.title}>
              <Key>Attended:</Key> {item.title} — {item.where} ({item.date}). {item.text}
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-1">
          <div>
            <Key>Email:</Key> <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
          </div>
          <div>
            <Key>Phone:</Key> <Ext href={`tel:${profile.phoneHref}`}>{profile.phone}</Ext>
          </div>
          <div>
            <Key>Location:</Key> {profile.locationLong}
          </div>
          <div className="text-xs text-terminal-secondary">
            Find me online: <Cmd name="socials" />
          </div>
        </div>
      );

    case 'socials':
      return (
        <div className="space-y-1">
          {socials.map((social) => (
            <div key={social.name}>
              <Key>{social.name}:</Key> <Ext href={social.url}>{social.label}</Ext>
            </div>
          ))}
          <div>
            <Key>Email:</Key> <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
          </div>
        </div>
      );

    case 'resume':
      downloadResume();
      return 'Resume downloaded! Check your downloads folder.';

    case 'gui':
      window.setTimeout(() => scrollToId('gui'), 350);
      return 'Launching GUI… scrolling down.';

    case 'history':
      return ctx.history.length
        ? ctx.history.map((item, index) => `${String(index + 1).padStart(3, ' ')}  ${item}`).join('\n')
        : 'No commands in history yet.';

    case 'date':
      return new Date().toString();

    case 'pwd':
      return '/home/aditya';

    case 'ls':
      return (
        <div className="flex flex-wrap gap-x-5 gap-y-0">
          {fileNames.map((file) => (
            <Cmd key={file} name={file.endsWith('/') ? files[file] : `cat ${file}`}>
              {file}
            </Cmd>
          ))}
        </div>
      );

    case 'cd':
      if (!args[0] || args[0] === '~' || args[0] === '.') return '';
      if (files[`${args[0].replace(/\/$/, '')}/`]) return runCommand(files[`${args[0].replace(/\/$/, '')}/`], ctx);
      return `cd: ${args[0]}: No such directory. Try ls.`;

    case 'cat': {
      if (!args[0]) {
        return (
          <div>
            cat: missing file operand. Try <Cmd name="cat about.txt" /> or <Cmd name="ls" />.
          </div>
        );
      }
      const target = files[args[0]] ?? files[`${args[0]}/`] ?? files[`${args[0]}.txt`];
      if (target) return runCommand(target, ctx);
      return `cat: ${args[0]}: No such file or directory`;
    }

    case 'echo':
      return args.join(' ');

    case 'theme': {
      const next = args[0]?.toLowerCase() as ThemeName | undefined;
      if (next && themes.includes(next)) {
        ctx.setTheme(next);
        return `Theme switched to ${next}.`;
      }
      return (
        <div>
          {next ? `theme: unknown theme "${next}". ` : ''}Available themes:{' '}
          {themes.map((name, index) => (
            <span key={name}>
              {index > 0 ? ', ' : ''}
              <Cmd name={`theme ${name}`}>{name}</Cmd>
              {name === ctx.theme ? ' (current)' : ''}
            </span>
          ))}
        </div>
      );
    }

    case 'neofetch':
      return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <AsciiBanner className="shrink-0 text-[10px]" />
          <div className="space-y-1 font-mono text-sm leading-6">
            <div>
              <Key>visitor</Key>@<Key>asr</Key>
            </div>
            <div>
              <Key>OS:</Key> ASR Linux 22.04
            </div>
            <div>
              <Key>Host:</Key> Developer Workstation
            </div>
            <div>
              <Key>Kernel:</Key> v8.68
            </div>
            <div>
              <Key>Shell:</Key> React Terminal
            </div>
            <div>
              <Key>CPU:</Key> Curiosity @ 100%
            </div>
            <div>
              <Key>GPU:</Key> Creativity Engine
            </div>
            <div>
              <Key>Memory:</Key> Coffee Powered
            </div>
            <div>
              <Key>Languages:</Key> 8+
            </div>
            <div>
              <Key>Projects:</Key> {projects.length}
            </div>
            <div>
              <Key>Research:</Key> {research.length} preprint
            </div>
            <div>
              <Key>Experience:</Key> {profile.role}
            </div>
          </div>
        </div>
      );

    case 'matrix':
      return <MatrixRain />;

    case 'ascii':
      return <AsciiBanner className="text-[10px] sm:text-[15px]" />;

    case 'quote':
    case 'fortune':
      return quotes[Math.floor(Math.random() * quotes.length)];

    case 'coffee':
      return <Lines lines={['Brewing coffee...', '█████████', 'Done.', '+20 Productivity']} />;

    case 'hack':
      return (
        <Lines
          lines={['Initializing exploit chain...', 'Bypassing safeguards...', 'Access granted.', '[system] simulated']}
        />
      );

    case 'sudo':
      if (args[0] === 'hire' && args[1]?.toLowerCase() === 'aditya') {
        return (
          <div>
            <div>Permission granted.</div>
            <div>HR notified.</div>
            <div className="text-xs text-terminal-secondary">
              Make it official: <Cmd name="contact" />
            </div>
          </div>
        );
      }
      if (args[0] === 'rm') return 'Nice try. This incident will be reported.';
      return (
        <div>
          visitor is not in the sudoers file. Try <Cmd name="sudo hire aditya" />.
        </div>
      );

    case 'uptime':
      return 'up 42 days, 7 hours, 19 minutes';

    case '42':
      return 'The answer to life, the universe and everything.';

    case 'exit':
    case 'logout':
      return 'Session terminated. Refresh to start again.';

    default:
      return (
        <div>
          <span className="text-terminal-error">{first}: command not found.</span> Try <Cmd name="help" />.
        </div>
      );
  }
}
