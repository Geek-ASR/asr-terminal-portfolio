/**
 * Single source of truth for everything shown on the site.
 * The terminal commands and the GUI sections are both rendered from this file,
 * so editing an entry here updates both views.
 */

export const profile = {
  name: 'Aditya Rekhe',
  fullName: 'Aditya Surendra Rekhe',
  initials: 'ASR',
  role: 'Software Engineer',
  roles: ['Software Engineer', 'Full-Stack Developer', 'Independent Researcher', 'Blockchain Enthusiast'],
  location: 'Pune, India',
  locationLong: 'Pune, Maharashtra, India',
  email: 'adityarekhe1030@gmail.com',
  phone: '+91 8446586979',
  phoneHref: '+918446586979',
  resumeFile: 'CV_Aditya Rekhe.pdf',
  resumeDownloadName: 'Aditya_Rekhe_Resume.pdf',
  photo: 'profile.jpeg',
  interests: ['AI', 'Backend', 'Distributed Systems', 'Blockchain', 'Cybersecurity', 'System Design'],
  focus: 'AI • Backend • Distributed Systems • Blockchain • Cybersecurity',
  availability: 'Open to ambitious product engineering and systems work.',
  summary:
    "I'm a Software Engineer from Pune, India. I enjoy building products where AI, web development, blockchain and system design intersect.",
  now: 'Currently an independent researcher, building adversarial evaluation infrastructure for cryptographic credential verification and for retrieval-based fact-checking systems. Previously a Software Engineer at Stratacent Technologies.',
} as const;

export interface SocialLink {
  name: string;
  label: string;
  url: string;
}

export const socials: SocialLink[] = [
  { name: 'GitHub', label: 'github.com/Geek-ASR', url: 'https://github.com/Geek-ASR' },
  {
    name: 'LinkedIn',
    label: 'linkedin.com/in/aditya-rekhe-94b27122a',
    url: 'https://www.linkedin.com/in/aditya-rekhe-94b27122a/',
  },
  {
    name: 'GeeksforGeeks',
    label: 'geeksforgeeks.org/user/adityare545t',
    url: 'https://www.geeksforgeeks.org/user/adityare545t/',
  },
];

export const socialUrl = (name: string) => socials.find((s) => s.name === name)?.url ?? '#';

export interface FocusArea {
  title: string;
  text: string;
}

export const focusAreas: FocusArea[] = [
  {
    title: 'AI & GenAI',
    text: 'Machine learning, NLP and retrieval-augmented generation, from an evidence-grounded fact-checking pipeline to a GenAI chatbot built at work.',
  },
  {
    title: 'Security Research',
    text: 'Applied cryptography and adversarial evaluation of digital identity credential libraries, with coordinated vulnerability disclosure.',
  },
  {
    title: 'Full-Stack Web',
    text: 'React, Next.js and Node.js applications with clean APIs, real-time features, tested code and well-structured databases.',
  },
  {
    title: 'Blockchain',
    text: 'Solidity smart contracts, NFTs and IPFS-backed dApps. Hackathon prize winner and guest lecturer on blockchain technology.',
  },
];

export interface EducationItem {
  institution: string;
  affiliation?: string;
  degree: string;
  short: string;
  period: string;
  score: string;
  notes?: string[];
}

export const education: EducationItem[] = [
  {
    institution: 'Dr. D. Y. Patil Institute of Technology, Pune',
    affiliation: 'Savitribai Phule Pune University (SPPU)',
    degree: 'Bachelor of Engineering (Computer Engineering)',
    short: 'B.E. Computer Engineering',
    period: 'Oct 2021 – Jul 2025',
    score: 'CGPA 8.68 / 10',
    notes: ['20-credit Honours specialization in Blockchain Technology'],
  },
  {
    institution: 'P.S. Deshmukh English Medium School & Junior College, Shahapur',
    degree: 'Higher Secondary Certificate (HSC), Maharashtra State Board',
    short: 'HSC',
    period: 'May 2021',
    score: '89%',
  },
  {
    institution: 'P.S. Deshmukh English Medium School & Junior College, Shahapur',
    degree: 'Secondary School Certificate (SSC), Maharashtra State Board',
    short: 'SSC',
    period: 'March 2019',
    score: '85.6%',
  },
];

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    org: 'Self-directed research',
    role: 'Independent Researcher',
    period: 'May 2026 – Present',
    location: 'Pune, India',
    summary: 'Adversarial Evaluation • Applied Cryptography • Digital Identity • Fact-Checking Systems • Vulnerability Disclosure',
    points: [
      'Designed and built adversarial evaluation infrastructure for cryptographic credential verification and for retrieval-based fact-checking systems.',
      'Ran coordinated vulnerability disclosure with open-source maintainers; prepared a specification-level submission for the relevant standards body.',
    ],
  },
  {
    org: 'Stratacent Technologies Pvt. Ltd.',
    role: 'Software Engineer',
    period: 'Sep 2025 – Apr 2026',
    location: 'Pune, India',
    summary: 'Incident Management • RCA • Infrastructure Troubleshooting • Cybersecurity Operations • GenAI Internal Chatbot',
    points: [
      'Handled incident management across database, cybersecurity and infrastructure domains in production environments.',
      'Performed root cause analysis for critical system failures and operational incidents.',
      'Contributed to development of a GenAI-powered internal chatbot system.',
      'Worked with cross-functional teams to improve system reliability and operational workflows.',
    ],
  },
];

export interface LeadershipItem {
  org: string;
  role: string;
  period: string;
  text: string;
}

export const leadership: LeadershipItem[] = [
  {
    org: 'Google Developer Groups (GDG) student chapter',
    role: 'Blockchain Lead',
    period: 'Mar 2023 – Feb 2025',
    text: 'Conducted blockchain workshops and sessions, driving hands-on learning and developer engagement.',
  },
  {
    org: 'ACES — Association of Computer Engineering Students',
    role: 'Event Manager',
    period: 'Jul 2022 – Aug 2022',
    text: 'Planned and ran events for the college club, coordinating teams to deliver engaging activities for the campus community.',
  },
];

export type ProjectCategory = 'AI' | 'Web' | 'Blockchain';

export interface Project {
  name: string;
  domain: string;
  period: string;
  description: string;
  highlights?: string[];
  stack: string[];
  /** Label for the list above. Defaults to "Stack". */
  stackLabel?: string;
  categories: ProjectCategory[];
  github?: string;
  demo?: string;
  paper?: string;
  team?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Aheadly',
    domain: 'Student Mentorship Marketplace',
    period: '2026',
    description:
      'A two-sided marketplace connecting students with mentors for career and study-abroad guidance, designed end to end: market research, system architecture, database and API design.',
    highlights: [
      '580 automated tests across unit, real-Postgres integration and multi-browser E2E testing, with GitHub Actions, CodeQL and dependency scanning.',
      'Secured using STRIDE, OWASP Top 10 / API Top 10 and ASVS Level 2, with verification, fraud prevention and dispute handling.',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS v4', 'Vitest', 'Playwright', 'GitHub Actions'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/MentorshipPlatform',
    demo: 'https://geek-asr.github.io/MentorshipPlatform/',
    featured: true,
  },
  {
    name: 'NeuralCraft',
    domain: 'Interactive 3D Playground for Learning AI/ML',
    period: '2026',
    description:
      'A browser-based 3D voxel-world playground that teaches AI, ML and data science through 36 lessons and 6 interactive labs: gradient descent, k-means, neural networks, embeddings and Q-learning.',
    highlights: [
      'Code sandbox with Blockly, Python and JavaScript.',
      '3D environment with dynamic lighting and A* pathfinding.',
      'Local-first XP and badge system, deployed free with no backend.',
    ],
    stack: ['TypeScript', 'Vite', 'Three.js', 'Blockly', 'CodeMirror 6', 'Pyodide', 'Web Audio API', 'Vitest'],
    categories: ['AI', 'Web'],
    github: 'https://github.com/Geek-ASR/Trial-AI_Playground',
    demo: 'https://geek-asr.github.io/Trial-AI_Playground/',
    team: 'Solo',
    featured: true,
  },
  {
    name: 'CareCircle',
    domain: 'Community Platform for Chronic Illness',
    period: '2026',
    description:
      'A community platform unifying forum discussion, real-time chat, Q&A and condition tracking for people managing chronic illness, with dedicated communities per condition and support for comorbidities.',
    highlights: [
      'Authentication, row-level security and realtime features built on Supabase.',
      'Deployed serverless via GitHub Pages, with CI/CD running lint, test, build and migration checks on every PR.',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Supabase (Auth, Postgres / RLS, Realtime)'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/care-circle',
    demo: 'https://geek-asr.github.io/care-circle/',
    featured: true,
  },
  {
    name: 'TruthLens',
    domain: 'AI Fact-Checking Pipeline',
    period: '2026',
    description:
      'An evidence-first pipeline for fact-checking short-form political video and image posts. It decomposes a post into atomic claims, researches each against the open web, and subjects every generated verdict to a deterministic, non-LLM validator before anything is published.',
    highlights: [
      'Multi-stage pipeline: ingestion (download, transcribe, OCR) → claim extraction → research planning → evidence retrieval → stance analysis → verdict → deterministic validation → aggregation → human-approved publishing.',
      'Every LLM stage runs on local models by default: no API key and no per-token cost.',
      'Released with a preprint and the 202-item TruthLens-202 evaluation corpus.',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL / pgvector', 'Redis', 'Ollama', 'faster-whisper', 'Docker'],
    categories: ['AI'],
    github: 'https://github.com/Geek-ASR/truthlens',
    paper: 'https://zenodo.org/records/22758785',
    team: 'Solo',
    featured: true,
  },
  {
    name: 'LearnIt',
    domain: 'AI-Assisted Learning & Engagement Platform',
    period: 'Sept 2024 – Mar 2025',
    description:
      'A MERN-stack educational platform that integrates AI-assisted learning support with collaborative learning features. Built as the final-year B.E. project.',
    highlights: [
      'Gemini API-based assistance for interactive query resolution and personalized learning support.',
      'Real-time communication over WebRTC.',
      'Designed backend APIs, database architecture and modular system workflows.',
    ],
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Gemini API', 'WebRTC', 'REST APIs'],
    categories: ['AI', 'Web'],
    github: 'https://github.com/KhileshThakur/learnit-frontend',
    team: 'Team of 4',
    featured: true,
  },
  {
    name: 'NYAYA',
    domain: 'AI-Powered Legal Awareness & Guidance Platform',
    period: 'Jul 2023 – Oct 2023',
    description:
      'A web and app based legal awareness and guidance platform with an AI chatbot for assistance, decision trees, a marketplace for lawyers, online consultation, digital agreements and more.',
    highlights: ['Led a team of 6 as team lead.'],
    stack: ['AI Chatbot', 'Decision Trees', 'Lawyer Marketplace', 'Online Consultation', 'Digital Agreements'],
    stackLabel: 'Features',
    categories: ['AI', 'Web'],
    team: 'Team of 6 · Team Lead',
    featured: true,
  },
  {
    name: 'XpropertY',
    domain: 'Decentralized Real Estate Platform',
    period: 'Dec 2023',
    description:
      'A blockchain-based real estate platform where property ownership is represented through NFTs, with smart contract-based transactions and decentralized document storage using IPFS. Built at the Unfold 2023 hackathon.',
    highlights: [
      'Smart contract-based property transactions with ownership represented as NFTs.',
      'Explored distributed trust, transparency and secure digital ownership.',
    ],
    stack: ['Solidity', 'Smart Contracts', 'NFTs', 'IPFS', 'React', 'Hardhat'],
    categories: ['Blockchain'],
    github: 'https://github.com/Geek-ASR/Unfold23_XpropertY',
    team: 'Team of 4',
    featured: true,
  },
  {
    name: 'DSA Visart',
    domain: 'DSA Learning & Visualization Platform',
    period: 'Apr 2022 – Jan 2023',
    description:
      'A web platform for learning data structures and algorithms in three parts: building the fundamentals through theory, visualizing algorithms on user-provided inputs, and solving DSA questions within the portal.',
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Algorithms'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/VisArt',
    team: 'Solo',
    featured: true,
  },
  {
    name: 'Govt. ITI (Women), Thane — Website & Smart Campus',
    domain: 'Institute Website & Campus Portal',
    period: '2026',
    description:
      'A bilingual (English + Marathi), mobile-first website and Smart Campus portal for Rajmata Jijau Government Industrial Training Institute (Women), Thane.',
    highlights: [
      'Smart attendance with rotating, HMAC-signed QR codes and location checks.',
      'Online quizzes with per-trainee shuffling, timers, autosave and analytics.',
      'Job and placement portal, website CMS and an installable PWA.',
      'Built to GIGW / WCAG 2.1 AA accessibility guidelines with full static SEO.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Express', 'PostgreSQL'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/iti-thane-women',
    demo: 'https://geek-asr.github.io/iti-thane-women/',
  },
  {
    name: 'DeutschPfad',
    domain: 'German-Learning Website',
    period: '2026',
    description:
      'A free German-language learning website for international students: vocabulary, grammar, stories, history, geography and real-life German, built as a static site with zero recurring infrastructure cost.',
    highlights: [
      'No signup, login, payment, backend or database.',
      "Progress is stored only in the learner's browser, with export / import to move it between devices.",
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Static Site'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/deutschpfad',
    demo: 'https://geek-asr.github.io/deutschpfad/',
    team: 'Solo',
  },
  {
    name: 'VedKarn',
    domain: 'Mentorship Platform',
    period: '2025',
    description:
      'A responsive, full-stack web application that connects people seeking guidance (mentees) with experienced professionals and alumni (mentors) for both career development and university admissions support.',
    stack: ['Next.js', 'React', 'TypeScript', 'ShadCN UI', 'Tailwind CSS', 'Firebase'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/VedKarn',
    demo: 'https://vedkarn.vercel.app/',
  },
  {
    name: 'ConnectWell',
    domain: 'Health Community Platform',
    period: '2025',
    description:
      'A platform that fosters supportive online communities for people sharing similar medical conditions. Users create personalised profiles, discover, join and create interest-based communities, and take part in discussions through posts and comments.',
    stack: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'ShadCN UI'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/ConnectWell',
  },
  {
    name: 'SIT Hackathon — Blockchain Edition',
    domain: 'Smart Contracts',
    period: '2023',
    description:
      'Smart-contract submissions for the SIT Hackathon (Blockchain Edition): a voting system, a supply-chain tracker and a digital-art contract. The submission won third prize.',
    stack: ['Solidity', 'Remix IDE', 'Smart Contracts'],
    categories: ['Blockchain'],
    github: 'https://github.com/Geek-ASR/SIT_Hackathon',
  },
  {
    name: 'ASR Terminal (this website)',
    domain: 'Terminal + GUI Portfolio',
    period: '2026',
    description:
      'This portfolio: an interactive terminal with clickable commands on top, and a regular graphical portfolio page underneath. Both views are rendered from one data file.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/asr-terminal-portfolio',
    demo: 'https://geek-asr.github.io/asr-terminal-portfolio/',
    team: 'Solo',
  },
];

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  affiliation: string;
  venue: string;
  year: string;
  status: string;
  summary: string;
  highlights: string[];
  keywords?: string[];
  /** Zenodo record for the preprint. */
  paperUrl: string;
  paperLabel: string;
  codeUrl: string;
  codeLabel: string;
  license?: string;
  bibtex?: string;
}

export const research: ResearchPaper[] = [
  {
    id: 'eudi',
    title: 'Differential Security Analysis of EU Digital Identity Credential Libraries',
    authors: 'Aditya Rekhe',
    affiliation: 'Independent Researcher',
    venue: 'Zenodo',
    year: '2026',
    status: 'Sole-authored preprint',
    summary:
      'To the best of my knowledge, the first systematic differential and adversarial evaluation of the libraries implementing the two credential formats mandated for the EU Digital Identity Wallet under eIDAS 2.0.',
    highlights: [
      'Developed 30 clause-based validation rules and 40 adversarial test cases, run against 7 implementations across 6 codebases in three programming languages (122 evaluations).',
      'Found implementation-specific security and standards-compliance issues and prepared the findings for responsible disclosure.',
    ],
    keywords: ['EU Digital Identity Wallet', 'eIDAS 2.0', 'verifiable credentials', 'differential testing', 'adversarial testing', 'applied cryptography'],
    paperUrl: 'https://zenodo.org/records/22884803',
    paperLabel: 'zenodo.org/records/22884803',
    codeUrl: 'https://drive.google.com/drive/folders/1jesQOI-XralDSthlgV8PkvZ-7DChFF4I?usp=sharing',
    codeLabel: 'Google Drive folder',
  },
  {
    id: 'truthlens',
    title:
      'TruthLens: A Verification-Gated Pipeline for Evidence-Grounded Fact-Checking of Short-Form Political Video',
    authors: 'Aditya Rekhe',
    affiliation: 'Independent Researcher',
    venue: 'Zenodo',
    year: '2026',
    status: 'Sole-authored preprint',
    summary:
      'TruthLens is an evidence-first pipeline for fact-checking short-form political video and image posts. It decomposes a post into atomic claims, researches each against the open web, and subjects every generated verdict to a deterministic, non-LLM validator before publication.',
    highlights: [
      'Built a multi-stage pipeline that retrieves sources, verifies claims, and requires supporting evidence before producing a verdict.',
      'Defined support validity and showed it is separable from label accuracy: validator recall improved from 16.7% to 40% at 100% precision.',
      'Developed a 202-item benchmark based on professionally fact-checked short-form videos and evaluated the system using a separate validation layer.',
    ],
    keywords: [
      'automated fact-checking',
      'misinformation detection',
      'claim extraction',
      'short-form video',
      'retrieval-augmented generation',
      'evaluation benchmark',
      'large language models',
    ],
    paperUrl: 'https://zenodo.org/records/22758785',
    paperLabel: 'zenodo.org/records/22758785',
    codeUrl: 'https://github.com/Geek-ASR/truthlens',
    codeLabel: 'github.com/Geek-ASR/truthlens',
    license: 'Paper and dataset: CC BY 4.0 · Code: MIT',
    bibtex: `@misc{rekhe2026truthlens,
  author    = {Rekhe, Aditya},
  title     = {{TruthLens: A Verification-Gated Pipeline for
                Evidence-Grounded Fact-Checking of Short-Form
                Political Video}},
  year      = {2026},
  publisher = {Zenodo},
  version   = {1.0.0},
  doi       = {10.5281/zenodo.22758785},
  url       = {https://doi.org/10.5281/zenodo.22758785}
}`,
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  type: 'Course' | 'Award' | 'Guest Lecture';
  description: string;
}

export const certifications: Certification[] = [
  {
    title: 'Third Position — Blockchain Hackathon',
    issuer: 'Symbiosis Institute of Technology (SIT), Pune · Cyber Blockchain Club with India Blockchain Alliance (IBA)',
    date: 'Sep 2023',
    type: 'Award',
    description:
      'Certificate of Appreciation for winning the 3rd position in the hackathon held on 17–18 September 2023 in collaboration with IBA (India Blockchain Alliance).',
  },
  {
    title: 'Resource Person — Blockchain Technology Workshop',
    issuer: "Dnyanprassarak Mandal's College and Research Centre (DMC), Goa",
    date: 'Jul 2024',
    type: 'Guest Lecture',
    description:
      'Invited by the Department of Computer Science to conduct the online workshop "Understanding and applying the Concepts of Blockchain Technology" for T.Y.B.Sc. Computer Science students on 31 July 2024. Received a Letter of Gratitude from the college.',
  },
  {
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Nov 2023',
    type: 'Course',
    description:
      'Certificate of Course Completion: network communication, standards and protocols, Ethernet, IPv4 / IPv6 addressing, routing and troubleshooting network connectivity.',
  },
];

export interface SkillGroup {
  category: string;
  /** Short label used by the terminal's `skills` command. */
  short: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    short: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Solidity', 'SQL'],
  },
  {
    category: 'Security',
    short: 'Security',
    items: ['Applied cryptography', 'Smart contracts', 'Digital forensics'],
  },
  {
    category: 'ML & Data',
    short: 'ML & Data',
    items: ['Machine learning', 'Deep learning', 'NLP', 'Retrieval-augmented generation', 'LangChain', 'LLM orchestration'],
  },
  {
    category: 'Frameworks & Technologies',
    short: 'Frameworks',
    items: ['React.js', 'Node.js', 'FastAPI', 'Next.js', 'MongoDB', 'PostgreSQL', 'pgvector', 'IPFS', 'WebRTC', 'REST API design'],
  },
];

export interface Achievement {
  title: string;
  detail: string;
  date?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Third Prize — Intercollegiate Blockchain Hackathon',
    detail: 'Hackathon held at Symbiosis Institute of Technology, Pune, in collaboration with India Blockchain Alliance (IBA).',
    date: 'Sep 2023',
  },
  {
    title: 'Selected Participant — Unfold 2023',
    detail: "Selected for Unfold 2023, among India's largest blockchain hackathons.",
    date: 'Dec 2023',
  },
  {
    title: 'Guest Lecturer — Blockchain Workshops',
    detail: 'Conducted blockchain and dApp development workshops at multiple universities.',
  },
  {
    title: 'Blockchain Lead — Google Developer Groups',
    detail: 'Led the blockchain track of the Google Developer Groups (GDG) student chapter.',
    date: 'Mar 2023 – Feb 2025',
  },
];

export const workshops = {
  summary: 'Conducted blockchain and dApp development workshops at multiple universities as a guest lecturer.',
  conducted: [
    {
      title: 'Understanding and applying the Concepts of Blockchain Technology',
      where: "Dnyanprassarak Mandal's College and Research Centre (DMC), Goa · online workshop for T.Y.B.Sc. Computer Science students",
      date: '31 July 2024',
    },
  ],
};

export const quotes = [
  '“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke',
  '“Programs must be written for people to read, and only incidentally for machines to execute.” — Harold Abelson',
  '“First, solve the problem. Then, write the code.” — John Johnson',
  '“Simplicity is the soul of efficiency.” — Austin Freeman',
  '“Stay hungry. Stay foolish.” — Steve Jobs',
  '“The only way to go fast is to go well.” — Robert C. Martin',
  '“Code is like humor. When you have to explain it, it’s bad.” — Cory House',
  '“Talk is cheap. Show me the code.” — Linus Torvalds',
  '“Debugging is twice as hard as writing the code in the first place.” — Brian Kernighan',
  '“Innovation distinguishes between a leader and a follower.” — Steve Jobs',
  '“Design is not just what it looks like and feels like. Design is how it works.” — Steve Jobs',
  '“If you can’t explain it simply, you don’t understand it well enough.” — Albert Einstein',
  '“Make it work, make it right, make it fast.” — Kent Beck',
  '“The journey of a thousand miles begins with one step.” — Lao Tzu',
  '“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.” — Antoine de Saint-Exupéry',
  '“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt',
];

export const themes = ['green', 'ubuntu', 'hacker', 'dracula', 'nord', 'retro'] as const;
export type ThemeName = (typeof themes)[number];
