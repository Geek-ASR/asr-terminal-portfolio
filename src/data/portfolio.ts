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
  now: 'Currently at Stratacent Technologies, working across production infrastructure, security operations and GenAI applications. Outside work I build full-stack products and do independent research on AI systems.',
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
  { name: 'ORCID', label: 'orcid.org/0009-0003-8009-3074', url: 'https://orcid.org/0009-0003-8009-3074' },
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
    text: 'LLM pipelines, retrieval-augmented generation and AI-assisted products, from a fact-checking research pipeline to a GenAI chatbot at work.',
  },
  {
    title: 'Full-Stack Web',
    text: 'React, Next.js and Node.js applications with clean APIs, real-time features and well-structured databases.',
  },
  {
    title: 'Blockchain',
    text: 'Solidity smart contracts, NFTs and IPFS-backed dApps. Honours specialization and hackathon wins in blockchain technology.',
  },
  {
    title: 'Systems & Security',
    text: 'Incident management, root cause analysis and infrastructure troubleshooting on production-scale systems.',
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
    period: '2021 – 2025',
    score: 'CGPA 8.68',
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
    org: 'Stratacent Technologies Pvt. Ltd.',
    role: 'Software Engineer',
    period: 'Sept 2025 – Present',
    location: 'Pune, India',
    summary:
      'Incident Management • RCA • Infrastructure Troubleshooting • Cybersecurity Operations • GenAI Internal Chatbot',
    points: [
      'Handle incident management across database, cybersecurity and infrastructure domains in production environments.',
      'Perform root cause analysis (RCA) for critical system failures and operational incidents.',
      'Contributed to the development of a GenAI-powered internal chatbot system.',
      'Work with cross-functional teams to improve system reliability, issue resolution and operational workflows.',
      'Gained exposure to production-scale systems, security operations and infrastructure troubleshooting.',
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
    org: 'Google Developer Groups (GDG)',
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
    name: 'TruthLens',
    domain: 'AI Fact-Checking Pipeline',
    period: '2026',
    description:
      'An evidence-first pipeline for fact-checking short-form political video and image posts. It decomposes a post into atomic claims, researches each against the open web, and subjects every generated verdict to a deterministic, non-LLM validator before anything is published.',
    highlights: [
      'Ten-stage pipeline: ingestion (download, transcribe, OCR) → claim extraction → research planning → evidence retrieval → stance analysis → verdict → deterministic validation → aggregation → carousel rendering → human-approved publishing.',
      'Every LLM stage runs on local models by default: no API key and no per-token cost.',
      'Released with a preprint and the 202-item TruthLens-202 evaluation corpus.',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL / pgvector', 'Redis', 'Ollama', 'faster-whisper', 'Docker'],
    categories: ['AI'],
    github: 'https://github.com/Geek-ASR/truthlens',
    paper: 'https://doi.org/10.5281/zenodo.22758785',
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
    name: 'CareCircle',
    domain: 'Chronic-Illness Community Platform',
    period: '2026',
    description:
      'A community platform for people living with chronic illness: every illness, not just one. Members join communities for their conditions, post and comment, ask questions, chat in real time and find people who understand what they are dealing with.',
    highlights: [
      'Community structure, real-time chat and a Q&A format in a single product.',
      'Static frontend on GitHub Pages with the backend entirely on Supabase (Auth, Postgres with row-level security, Realtime, Storage).',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'TanStack Query', 'Zustand', 'Supabase'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/care-circle',
    demo: 'https://geek-asr.github.io/care-circle/',
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
    name: 'NeuralCraft',
    domain: '3D Playground for Learning AI',
    period: '2026',
    description:
      'A free, browser-based 3D playground for learning AI, machine learning and data science through interactive experiments. Walk around a small voxel world, visit different labs, write real code and see the results visually.',
    highlights: [
      '36 lessons, from math and statistics to neural networks, embeddings, attention and reinforcement learning.',
      'Six interactive labs: Gradient Descent, Galton Board, K-Means, Neural Network / MNIST, Embeddings and Q-Learning.',
      'A sandbox for building structures with Blockly, Python or JavaScript. No backend, account or tracking.',
    ],
    stack: ['TypeScript', 'Three.js', 'Vite', 'Blockly', 'CodeMirror 6', 'Pyodide', 'Web Audio API', 'Vitest'],
    categories: ['AI', 'Web'],
    github: 'https://github.com/Geek-ASR/Trial-AI_Playground',
    demo: 'https://geek-asr.github.io/Trial-AI_Playground/',
    team: 'Solo',
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
    name: 'Mentorship Platform',
    domain: 'Student Mentorship Marketplace',
    period: '2026 · In development',
    description:
      'A student mentorship marketplace for career and study-abroad guidance: a low-cost, trustworthy place where students get practical guidance from people who have already done the thing they are preparing for.',
    highlights: [
      'Free knowledge and live events, affordable group sessions and paid 1-on-1 sessions on one engine.',
      'Designed docs-first: architecture, booking, payments, trust & safety and threat model.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'Vitest', 'Playwright'],
    categories: ['Web'],
    github: 'https://github.com/Geek-ASR/MentorshipPlatform',
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
  shortName: string;
  title: string;
  authors: string;
  affiliation: string;
  orcid: string;
  venue: string;
  year: string;
  status: string;
  abstract: string;
  findings: string[];
  keywords: string[];
  doi: string;
  doiUrl: string;
  softwareDoi: string;
  softwareDoiUrl: string;
  codeUrl: string;
  license: string;
  bibtex: string;
}

export const research: ResearchPaper[] = [
  {
    shortName: 'TruthLens',
    title:
      'TruthLens: A Verification-Gated Pipeline for Evidence-Grounded Fact-Checking of Short-Form Political Video',
    authors: 'Aditya Rekhe',
    affiliation: 'Independent Researcher',
    orcid: 'https://orcid.org/0009-0003-8009-3074',
    venue: 'Zenodo',
    year: '2026',
    status: 'Research preprint (not peer reviewed)',
    abstract:
      'TruthLens is an evidence-first pipeline for fact-checking short-form political video and image posts. It decomposes a post into atomic claims, researches each against the open web, and subjects every generated verdict to a deterministic, non-LLM validator before publication. The release includes the preprint, the 202-item TruthLens-202 evaluation corpus (URLs, labels and annotations only), and the supplementary results and protocols needed to reproduce the reported numbers.',
    findings: [
      "A deterministic, non-LLM validator checks that a verdict's citations exist, its sources were actually fetched, its numbers are grounded in retrieved evidence and its label does not contradict its own reasoning. A verdict that fails is downgraded, not published.",
      'Results are reported as an honest floor for a deliberately minimal, zero-cost, local-only configuration, not as a headline capability.',
      'Diagnostic finding: claim extraction, not retrieval, gates whether a post gets checked at all.',
    ],
    keywords: [
      'automated fact-checking',
      'misinformation detection',
      'claim extraction',
      'short-form video',
      'retrieval-augmented generation',
      'evaluation benchmark',
      'large language models',
      'computational journalism',
    ],
    doi: '10.5281/zenodo.22758785',
    doiUrl: 'https://doi.org/10.5281/zenodo.22758785',
    softwareDoi: '10.5281/zenodo.22758976',
    softwareDoiUrl: 'https://doi.org/10.5281/zenodo.22758976',
    codeUrl: 'https://github.com/Geek-ASR/truthlens',
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
  type: 'Course' | 'Internship' | 'Hackathon' | 'Workshop';
  description: string;
}

export const certifications: Certification[] = [
  {
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Nov 2023',
    type: 'Course',
    description:
      'Certificate of Course Completion: network communication, standards and protocols, Ethernet, IPv4 / IPv6 addressing, routing and troubleshooting network connectivity.',
  },
  {
    title: 'Frontend Web Development Internship',
    issuer: 'VirtualIntern',
    date: 'Jan 2024',
    type: 'Internship',
    description: 'Internship Completion Certificate for the one-month Frontend Web Development program.',
  },
  {
    title: 'DevClash Hackathon',
    issuer: 'DevKraft · Dr. D. Y. Patil Institute of Technology, Pimpri',
    date: 'Feb 2024',
    type: 'Hackathon',
    description: 'Certificate of Participation for solving real-world tech challenges in the DevClash hackathon.',
  },
  {
    title: 'Blockchain Bootcamp',
    issuer: 'SIT Pune',
    date: 'Jun 2023',
    type: 'Workshop',
    description:
      'Hands-on workshop on blockchain technology, cryptocurrencies, smart contracts, Ethereum, Hyperledger and decentralized application (dApp) architecture.',
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
    items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Solidity', 'HTML', 'CSS'],
  },
  {
    category: 'Web Development',
    short: 'Web',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs', 'FastAPI', 'WebRTC'],
  },
  {
    category: 'AI & GenAI',
    short: 'AI',
    items: ['LangChain', 'Gemini API', 'Retrieval-Augmented Generation', 'Local LLMs (Ollama)'],
  },
  {
    category: 'Blockchain',
    short: 'Blockchain',
    items: ['Ethereum', 'Smart Contracts', 'Hardhat', 'Remix IDE', 'Ethers.js', 'NFTs', 'IPFS'],
  },
  {
    category: 'Databases',
    short: 'Databases',
    items: ['MongoDB', 'SQL', 'PostgreSQL', 'Supabase', 'Firebase'],
  },
  {
    category: 'Tools',
    short: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Figma', 'Canva'],
  },
];

export interface Achievement {
  title: string;
  detail: string;
  date?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Third Prize — Intercollege Blockchain Hackathon',
    detail: 'Hackathon on blockchain technology held by All India Blockchain Alliance.',
    date: 'Sept 2023',
  },
  {
    title: 'Selected for Unfold 2023',
    detail: "Selected for and participated in Unfold@2023, one of India's biggest blockchain hackathons.",
    date: 'Dec 2023',
  },
  {
    title: '20-Credit Honours in Blockchain Technology',
    detail: 'Completed a 20-credit Honours specialization alongside the B.E. degree.',
  },
  {
    title: 'Guest Lecturer — Blockchain Workshops',
    detail: 'Conducted workshops on blockchain technology and dApps at multiple universities.',
  },
];

export const workshops = {
  conducted:
    'Delivered blockchain and dApp workshops at multiple universities as a guest lecturer, and mentored students as Blockchain Lead at GDG.',
  attended: [
    {
      title: 'Blockchain Bootcamp',
      where: 'SIT Pune · organized by Saurabh Tiwari',
      date: 'June 2023',
      text: 'Foundations of blockchain technology, cryptocurrencies, smart contracts, Ethereum, Hyperledger and dApp architecture through a hands-on workshop.',
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
