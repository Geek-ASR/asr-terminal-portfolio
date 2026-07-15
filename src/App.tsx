import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTerminal, FaRocket, FaCode, FaBrain, FaServer, FaShieldAlt } from 'react-icons/fa';
import { SiSolidity, SiLangchain, SiMongodb, SiReact, SiTypescript, SiNodedotjs } from 'react-icons/si';

interface CommandResult {
  id: number;
  command: string;
  output: string | JSX.Element;
  type?: 'command' | 'system' | 'error';
}

interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  timeline: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    name: 'LearnIt',
    tagline: 'MERN Stack • Gemini API • WebRTC • REST APIs',
    description: 'A collaborative learning platform with real-time sessions, AI-assisted guidance, and scalable backend services.',
    stack: ['React', 'Node', 'MongoDB', 'Gemini AI', 'WebRTC'],
    timeline: '2024',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    name: 'NYAYA',
    tagline: 'AI Legal Assistant • LangChain • Lawyer Marketplace',
    description: 'A legal-tech assistant that empowers users with decision trees, digital agreements, and AI-guided workflows.',
    stack: ['LangChain', 'Python', 'FastAPI', 'Decision Trees'],
    timeline: '2023',
    github: 'https://github.com',
  },
  {
    name: 'XpropertY',
    tagline: 'Blockchain • NFT • Solidity • IPFS',
    description: 'A property tokenization experience built on Ethereum with secure smart contracts and immutable records.',
    stack: ['Solidity', 'IPFS', 'React', 'Hardhat'],
    timeline: '2022',
    github: 'https://github.com',
  },
  {
    name: 'DSA Visart',
    tagline: 'Algorithm Visualizer • DSA Learning Platform',
    description: 'An intuitive education tool for understanding data structures and algorithms through visual exploration.',
    stack: ['TypeScript', 'React', 'Algorithms'],
    timeline: '2023',
    github: 'https://github.com',
  },
];

const quoteBank = [
  '“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke',
  '“Programs must be written for people to read, and only incidentally for machines to execute.” — Harold Abelson',
  '“First, solve the problem. Then, write the code.” — John Johnson',
  '“The best way to predict the future is to implement it.” — David Heinemeier Hansson',
  '“Simplicity is the soul of efficiency.” — Austin Freeman',
  '“Stay hungry. Stay foolish.” — Steve Jobs',
  '“The only way to go fast is to go well.” — Robert C. Martin',
  '“Code is like humor. When you have to explain it, it’s bad.” — Cory House',
  '“Talk is cheap. Show me the code.” — Linus Torvalds',
  '“Debugging is twice as hard as writing the code in the first place.” — Brian Kernighan',
  '“The computer was born to solve problems that did not exist before.” — Bill Gates',
  '“You can’t connect the dots looking forward; you can to looking backward.” — Steve Jobs',
  '“Innovation distinguishes between a leader and a follower.” — Steve Jobs',
  '“Life is too short for long, complicated code.” — Anonymous',
  '“A good programmer is someone who always looks both ways before crossing a one-way street.” — Doug Linder',
  '“Design is not just what it looks like and feels like. Design is how it works.” — Steve Jobs',
  '“The best error message is the one that never shows up.” — Anonymous',
  '“If you can’t explain it simply, you don’t understand it well enough.” — Albert Einstein',
  '“Every big step in software is a leap of faith.” — Anonymous',
  '“Make it work, make it right, make it fast.” — Kent Beck',
  '“The journey of a thousand miles begins with one step.” — Lao Tzu',
  '“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.” — Antoine de Saint-Exupéry',
  '“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt',
  '“A line of code is a line of thought.” — Anonymous',
  '“The goal is to make software that feels inevitable.” — Anonymous',
  '“The most important property of a program is whether it has a useful purpose.” — Christopher Strachey',
];

const commandCatalog = ['help', 'about', 'skills', 'experience', 'projects', 'education', 'achievements', 'leadership', 'workshops', 'contact', 'socials', 'resume', 'clear', 'history', 'date', 'pwd', 'ls', 'cd', 'cat', 'echo', 'theme', 'neofetch', 'matrix', 'ascii', 'quote', 'fortune', 'coffee', 'hack', 'sudo', 'uptime', 'exit'];

function App() {
  const [history, setHistory] = useState<CommandResult[]>([]);
  const [input, setInput] = useState('');
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState('green');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBooting(false);
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          command: 'help',
          output: (
            <div className="space-y-2 text-sm leading-7">
              <div>Available commands:</div>
              <div className="grid gap-1 text-terminal-secondary sm:grid-cols-2">
                {commandCatalog.slice(0, 20).map((cmd) => (
                  <div key={cmd}>• {cmd}</div>
                ))}
              </div>
              <div className="text-terminal-secondary">Type <span className="text-terminal-accent">help</span> to view commands again.</div>
            </div>
          ),
          type: 'system',
        },
      ]);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!booting) {
      inputRef.current?.focus();
    }
  }, [booting]);

  useEffect(() => {
    if (!booting && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, booting]);

  const themeClasses = useMemo(() => ({
    green: 'text-terminal-text',
    ubuntu: 'text-terminal-secondary',
    hacker: 'text-terminal-accent',
    dracula: 'text-[#ff79c6]',
    nord: 'text-[#8fbcbb]',
    retro: 'text-[#f0e68c]',
  }), [theme]);

  const downloadResume = () => {
    const baseUrl = ((import.meta as any).env.BASE_URL) || '/';
    const link = document.createElement('a');
    link.href = `${baseUrl}CV_Aditya Rekhe.pdf`;
    link.download = 'Aditya_Rekhe_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    const trimmed = command.trim();
    const nextId = Date.now();
    setHistory((prev) => [...prev, { id: nextId, command: trimmed, output: renderOutput(trimmed), type: 'command' }]);
    setInput('');
  };

  const renderOutput = (raw: string) => {
    const parts = raw.split(' ');
    const [command, ...args] = parts;

    switch (command) {
      case 'help':
        return (
          <div className="space-y-2 text-sm leading-7">
            <div>Available commands:</div>
            <div className="grid gap-1 text-terminal-secondary sm:grid-cols-2">
              {commandCatalog.map((cmd) => (
                <div key={cmd}>• {cmd}</div>
              ))}
            </div>
          </div>
        );
      case 'whoami':
        return 'Aditya Surendra Rekhe — Software Engineer';
      case 'about':
        return (
          <div className="space-y-2">
            <div><span className="text-terminal-accent">Name:</span> Aditya Surendra Rekhe</div>
            <div><span className="text-terminal-accent">Location:</span> Pune, India</div>
            <div><span className="text-terminal-accent">Role:</span> Software Engineer</div>
            <div><span className="text-terminal-accent">Interests:</span> AI, Backend, Distributed Systems, Blockchain, Cybersecurity, System Design</div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-2">
            <div><span className="text-terminal-accent">Languages:</span> C++, Java, Python, JavaScript, TypeScript, HTML, CSS, Solidity</div>
            <div><span className="text-terminal-accent">Frameworks:</span> React, Node, MongoDB, SQL, REST APIs, LangChain, IPFS</div>
            <div><span className="text-terminal-accent">Tools:</span> Git, GitHub, VS Code, Figma, Canva</div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-2">
            <div><span className="text-terminal-accent">Software Engineer</span> — Stratacent Technologies Pvt Ltd</div>
            <div>September 2025 — Present</div>
            <div>Incident Management • RCA • Infrastructure Troubleshooting • Cybersecurity Operations • GenAI Internal Chatbot</div>
          </div>
        );
      case 'projects':
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <button key={project.name} onClick={() => setSelectedProject(project)} className="rounded border border-terminal-accent/40 bg-black/30 p-3 text-left transition hover:border-terminal-accent hover:bg-terminal-accent/10">
                <div className="text-terminal-accent">{project.name}</div>
                <div className="mt-1 text-xs text-terminal-secondary">{project.tagline}</div>
              </button>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-2">
            <div><span className="text-terminal-accent">B.E. Computer Engineering</span> — Dr. D. Y. Patil Institute of Technology</div>
            <div>SPPU • CGPA 8.68</div>
            <div>HSC 89% • SSC 85.6%</div>
          </div>
        );
      case 'achievements':
        return 'Third Prize — Intercollege Blockchain Hackathon • Selected Unfold 2023 • 20 Credit Honors in Blockchain Technology • Guest Lecturer for Blockchain Workshops';
      case 'leadership':
        return 'Blockchain Lead — Google Developer Groups • Event Manager — ACES';
      case 'workshops':
        return 'Delivered blockchain workshops and mentored students on modern application architecture and secure development workflows.';
      case 'contact':
        return 'Email: adityarekhe1030@gmail.com • Phone: +91 8446586979 • Pune, India';
      case 'socials':
        return (
          <div className="flex flex-wrap gap-4 text-terminal-link">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:adityarekhe1030@gmail.com">Email</a>
          </div>
        );
      case 'resume':
        downloadResume();
        return 'Resume downloaded! Check your downloads folder.';
      case 'clear':
        setHistory([]); return 'Terminal cleared.';
      case 'history':
        return history.map((item) => item.command).join('\n');
      case 'date':
        return new Date().toString();
      case 'pwd':
        return '/home/aditya';
      case 'ls':
        return 'Desktop Documents Projects Downloads .gitignore README.md';
      case 'cd':
        return 'Changed directory. Use pwd to confirm your location.';
      case 'cat':
        return 'cat: missing file operand';
      case 'echo':
        return args.join(' ');
      case 'theme':
        if (args[0]) {
          const nextTheme = args[0].toLowerCase();
          if (['green', 'ubuntu', 'hacker', 'dracula', 'nord', 'retro'].includes(nextTheme)) {
            setTheme(nextTheme);
            return `Theme switched to ${nextTheme}.`;
          }
        }
        return 'Available themes: green, ubuntu, hacker, dracula, nord, retro';
      case 'neofetch':
        return (
          <div className="space-y-2 font-mono text-sm">
            <div>OS: ASR Linux 22.04</div>
            <div>Host: Developer Workstation</div>
            <div>Kernel: v8.68</div>
            <div>Shell: React Terminal</div>
            <div>CPU: Curiosity @ 100%</div>
            <div>GPU: Creativity Engine</div>
            <div>Memory: Coffee Powered</div>
            <div>Languages: 8+</div>
            <div>Projects: 4</div>
            <div>Experience: Software Engineer</div>
          </div>
        );
      case 'matrix':
        return <div className="whitespace-pre text-xs text-terminal-accent">{Array.from({ length: 18 }, (_, i) => Array.from({ length: 50 }, (_, j) => (i + j) % 2 === 0 ? '1' : '0').join('')).join('\n')}</div>;
      case 'ascii':
        return <div className="whitespace-pre text-terminal-accent text-xs leading-5">{`  ██████╗  ██████╗ ███████╗███████╗\n  ██╔══██╗██╔═══██╗██╔════╝██╔════╝\n  ██████╔╝██║   ██║███████╗███████╗\n  ██╔══██╗██║   ██║╚════██║╚════██║\n  ██║  ██║╚██████╔╝███████║███████║\n  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`}</div>;
      case 'quote':
        return quoteBank[Math.floor(Math.random() * quoteBank.length)];
      case 'fortune':
        return quoteBank[Math.floor(Math.random() * quoteBank.length)];
      case 'coffee':
        return 'Brewing coffee...\n█████████\nDone.\n+20 Productivity';
      case 'hack':
        return 'Initializing exploit chain...\nBypassing safeguards...\nAccess granted.\n[system] simulated';
      case 'sudo':
        if (args[0] === 'hire' && args[1] === 'aditya') {
          return 'Permission granted.\nHR notified.';
        }
        return 'sudo: command not found';
      case 'uptime':
        return 'up 42 days, 7 hours, 19 minutes';
      case 'exit':
        return 'Session terminated. Refresh to start again.';
      default:
        return 'Command not found. Try help.';
    }
  };

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

  return (
    <div className={`min-h-screen bg-terminal-bg text-terminal-text ${themeClasses[theme as keyof typeof themeClasses]} font-mono`}> 
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,255,136,0.08),transparent_45%)] p-4 sm:p-6 lg:p-10">
        <div className="absolute inset-0 overflow-hidden">
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

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="scanlines relative w-full max-w-6xl overflow-hidden rounded-2xl border border-terminal-accent/25 bg-black/70 shadow-[0_0_60px_rgba(0,255,136,0.15)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-terminal-accent/20 bg-terminal-accent/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-terminal-secondary">
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

          <div className="flex min-h-[78vh] flex-col lg:flex-row">
            <div className="flex-1 min-h-0 p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {booting ? (
                  <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 text-sm leading-7">
                    {bootLines.map((line, index) => (
                      <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.35 }}>
                        {line}
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} className="mt-6 space-y-4 text-terminal-accent">
                      <div className="font-bold text-lg space-y-1 tracking-wider">
                        <div>  █████╗   ███████╗  ██████╗</div>
                        <div>  ██╔══██╗  ██╔════╝  ██╔══██╗</div>
                        <div>  ███████║  ███████╗  ██████╔╝</div>
                        <div>  ██╔══██║  ╚════██║  ██╔══██╗</div>
                        <div>  ██║  ██║  ███████║  ██║  ██║</div>
                        <div>  ╚═╝  ╚═╝  ╚══════╝  ╚═╝  ╚═╝</div>
                      </div>
                      <div className="pt-4 text-center space-y-2">
                        <div className="text-terminal-text font-bold text-lg">Aditya Surendra Rekhe</div>
                        <div className="text-terminal-secondary text-sm">Software Engineer • Pune, India</div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col space-y-3">
                    <div className="mb-3 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-terminal-secondary">
                      <span className="flex items-center gap-2"><FaRocket /> Boot complete</span>
                      <span className="flex items-center gap-2"><FaCode /> Interactive shell ready</span>
                    </div>
                    <div ref={terminalRef} className="flex-1 overflow-y-auto pr-2 text-sm sm:text-base">
                      {history.map((entry) => (
                        <div key={entry.id} className="mb-4 space-y-2">
                          <div className="flex items-center gap-2 text-terminal-secondary">
                            <span className="text-terminal-accent">visitor@asr:~$</span>
                            <span>{entry.command}</span>
                          </div>
                          {entry.type === 'command' && typeof entry.output === 'string' ? (
                            <div className="whitespace-pre-wrap leading-7 text-terminal-text">{entry.output}</div>
                          ) : (
                            <div className="leading-7 text-terminal-text">{entry.output}</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 border-t border-terminal-accent/20 pt-3">
                      <span className="text-terminal-accent">visitor@asr:~$</span>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCommand(input);
                          }
                        }}
                        className="w-full bg-transparent outline-none"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full border-t border-terminal-accent/20 bg-black/20 p-4 lg:w-[320px] lg:border-l lg:border-t-0">
              <div className="space-y-4 text-sm leading-7">
                <div className="flex justify-center">
                  <img src="./profile.jpeg" alt="Aditya Surendra Rekhe" className="h-40 w-40 rounded-lg border-2 border-terminal-accent/50 shadow-[0_0_30px_rgba(0,255,136,0.3)] object-cover" />
                </div>
                <div className="text-center">
                  <div className="text-terminal-accent font-semibold">Aditya Surendra Rekhe</div>
                  <div className="text-xs text-terminal-secondary">Software Engineer</div>
                  <div className="text-xs text-terminal-secondary">Pune, India</div>
                </div>
                <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
                  <div className="mb-2 flex items-center gap-2 text-terminal-accent">
                    <FaBrain /> <span>Focus</span>
                  </div>
                  <div>AI • Backend • Distributed Systems • Blockchain • Cybersecurity</div>
                </div>
                <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
                  <div className="mb-2 flex items-center gap-2 text-terminal-accent">
                    <FaServer /> <span>Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-terminal-secondary">
                    <SiReact className="text-2xl" />
                    <SiTypescript className="text-2xl" />
                    <SiNodedotjs className="text-2xl" />
                    <SiMongodb className="text-2xl" />
                    <SiSolidity className="text-2xl" />
                    <SiLangchain className="text-2xl" />
                  </div>
                </div>
                <div className="rounded border border-terminal-accent/20 bg-terminal-accent/10 p-3">
                  <div className="mb-2 flex items-center gap-2 text-terminal-accent">
                    <FaShieldAlt /> <span>Availability</span>
                  </div>
                  <div>Open to ambitious product engineering and systems work.</div>
                </div>
                <button onClick={downloadResume} className="w-full rounded border border-terminal-accent/40 bg-terminal-accent/20 px-3 py-2 text-terminal-accent transition hover:border-terminal-accent hover:bg-terminal-accent/30">
                  Download Resume →
                </button>
                <div className="flex gap-3 text-xl text-terminal-link">
                  <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                  <a href="mailto:adityarekhe1030@gmail.com" aria-label="Email"><FaEnvelope /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} className="w-full max-w-2xl rounded-2xl border border-terminal-accent/30 bg-terminal-bg/95 p-6 shadow-[0_0_60px_rgba(0,255,136,0.25)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xl text-terminal-accent">{selectedProject.name}</div>
                  <div className="mt-1 text-sm text-terminal-secondary">{selectedProject.tagline}</div>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-terminal-secondary">✕</button>
              </div>
              <p className="leading-7 text-terminal-text">{selectedProject.description}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div><span className="text-terminal-accent">Timeline:</span> {selectedProject.timeline}</div>
                <div><span className="text-terminal-accent">Stack:</span> {selectedProject.stack.join(' • ')}</div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noreferrer" className="rounded border border-terminal-accent/40 px-3 py-2 text-terminal-accent">GitHub</a>}
                {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="rounded border border-terminal-accent/40 px-3 py-2 text-terminal-accent">Live Demo</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
