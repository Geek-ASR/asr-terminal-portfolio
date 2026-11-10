import { useEffect, useMemo, useState } from 'react';
import {
  FaArrowUp,
  FaAward,
  FaBrain,
  FaBriefcase,
  FaCertificate,
  FaChalkboardTeacher,
  FaCheck,
  FaCopy,
  FaCubes,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaTerminal,
  FaTrophy,
  FaUsers,
} from 'react-icons/fa';
import { SiGeeksforgeeks } from 'react-icons/si';
import {
  achievements,
  certifications,
  education,
  experience,
  focusAreas,
  leadership,
  profile,
  projects,
  research,
  skills,
  socials,
  socialUrl,
  workshops,
  type Certification,
  type Project,
  type ProjectCategory,
} from '../../data/portfolio';
import { asset, downloadResume, prefersReducedMotion, scrollToId, scrollToTop } from '../../lib/utils';
import { ProjectLinks } from '../ProjectModal';
import { Nav } from './Nav';
import { Chip, Reveal, Section, cardClass, ghostButton, primaryButton } from './primitives';

const socialIcons: Record<string, JSX.Element> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  GeeksforGeeks: <SiGeeksforgeeks />,
};

/** Types and erases each phrase in turn. */
function useTypewriter(phrases: readonly string[]) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let phrase = 0;
    let length = phrases[0].length;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      let wait: number;
      if (!deleting && length === phrases[phrase].length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && length === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        wait = 300;
      } else {
        length += deleting ? -1 : 1;
        setText(phrases[phrase].slice(0, length));
        wait = deleting ? 35 : 70;
      }
      timer = window.setTimeout(tick, wait);
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [phrases]);

  return text;
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    setCopied(key);
    window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1800);
  };

  return { copied, copy };
}

function Hero() {
  const role = useTypewriter(profile.roles);
  const stats = [
    { value: `${projects.length}`, label: 'Projects built' },
    { value: `${research.length}`, label: research.length === 1 ? 'Research preprint' : 'Research preprints' },
    { value: `${certifications.length}`, label: 'Certifications' },
    { value: '8.68', label: 'B.E. CGPA' },
  ];

  return (
    <section id="about" aria-label="About" className="scroll-mt-16 pb-10 pt-12 sm:pb-16 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <Reveal>
          <div className="font-mono text-xs text-terminal-secondary/80 sm:text-sm">
            <span className="text-terminal-accent">visitor@asr:~$</span> whoami
          </div>
          <p className="mt-5 font-mono text-sm text-terminal-secondary sm:text-base">Hi, I&apos;m</p>
          <h1 className="mt-2 font-mono text-[2rem] font-bold leading-tight text-terminal-text sm:text-5xl lg:text-[2.75rem] xl:text-[2.9rem]">
            {profile.fullName}
          </h1>
          <div className="mt-3 flex h-8 items-center font-mono text-lg text-terminal-accent sm:text-2xl" aria-label={profile.roles.join(', ')}>
            <span className="text-terminal-secondary/60">&gt;&nbsp;</span>
            <span aria-hidden="true">{role}</span>
            <span className="cursor-blink ml-0.5 inline-block h-[1.05em] w-[0.5em] bg-terminal-accent" aria-hidden="true" />
          </div>
          <p className="mt-6 max-w-xl font-sans text-base leading-7 text-terminal-text/80 sm:text-lg sm:leading-8">{profile.summary}</p>
          <p className="mt-3 max-w-xl font-sans text-sm leading-7 text-terminal-text/60 sm:text-base">{profile.now}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-terminal-secondary sm:text-sm">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-terminal-accent" /> {profile.locationLong}
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-accent" />
              </span>
              Open to opportunities
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={downloadResume} className={primaryButton}>
              <FaDownload /> Download Resume
            </button>
            <button type="button" onClick={() => scrollToId('contact')} className={ghostButton}>
              <FaEnvelope /> Get in touch
            </button>
            <a href={socialUrl('GitHub')} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${ghostButton} px-3`}>
              <FaGithub className="text-lg" />
            </a>
            <a href={socialUrl('LinkedIn')} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${ghostButton} px-3`}>
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[1.4rem] border border-dashed border-terminal-accent/25" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-terminal-accent/50 shadow-[0_0_50px_rgb(var(--t-accent)/0.25)]">
              <img
                src={asset(profile.photo)}
                alt={profile.fullName}
                width={340}
                height={420}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-10 font-mono text-xs text-terminal-accent">
                <span className="text-terminal-secondary">~/</span>aditya <span className="text-terminal-secondary">· {profile.role.toLowerCase()}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${cardClass} px-4 py-4 text-center sm:py-5`}>
            <div className="font-mono text-2xl font-bold text-terminal-accent sm:text-3xl">{stat.value}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-terminal-secondary sm:text-xs">{stat.label}</div>
          </div>
        ))}
      </Reveal>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area, index) => {
          const icons = [<FaBrain key="a" />, <FaShieldAlt key="b" />, <FaLaptopCode key="c" />, <FaCubes key="d" />];
          return (
            <Reveal key={area.title} delay={0.05 * index}>
              <div className={`${cardClass} h-full p-5`}>
                <div className="flex items-center gap-2.5 font-mono text-sm font-semibold text-terminal-accent">
                  <span className="text-lg">{icons[index % icons.length]}</span> {area.title}
                </div>
                <p className="mt-3 font-sans text-sm leading-6 text-terminal-text/65">{area.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <Section id="experience" command="experience" title="Experience" subtitle="Research, industry experience and the communities I have led.">
      <div className="relative space-y-6 border-l border-terminal-accent/25 pl-6 sm:pl-8">
        {experience.map((job) => (
          <Reveal key={job.org} className="relative">
            <span className="absolute -left-[31px] top-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-terminal-accent bg-terminal-bg sm:-left-[39px]">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal-accent" />
            </span>
            <article className={`${cardClass} p-5 sm:p-6`}>
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-lg font-semibold text-terminal-accent">
                    <FaBriefcase className="shrink-0 text-base" /> {job.role}
                  </h3>
                  <div className="mt-1 font-sans text-base text-terminal-text">{job.org}</div>
                </div>
                <div className="font-mono text-xs leading-6 text-terminal-secondary sm:text-right">
                  <div>{job.period}</div>
                  {job.location && <div>{job.location}</div>}
                </div>
              </div>
              <ul className="mt-4 space-y-2 font-sans text-sm leading-6 text-terminal-text/75 sm:text-[15px]">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="shrink-0 font-mono text-terminal-accent">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.summary.split(' • ').map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        {leadership.map((item) => (
          <Reveal key={item.org} className="relative">
            <span className="absolute -left-[31px] top-5 h-3.5 w-3.5 rounded-full border border-terminal-accent/60 bg-terminal-bg sm:-left-[39px]" />
            <article className={`${cardClass} p-5`}>
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-base font-semibold text-terminal-accent">
                    <FaUsers className="shrink-0" /> {item.role}
                  </h3>
                  <div className="mt-1 font-sans text-[15px] text-terminal-text">{item.org}</div>
                </div>
                <div className="font-mono text-xs leading-6 text-terminal-secondary">{item.period}</div>
              </div>
              <p className="mt-3 font-sans text-sm leading-6 text-terminal-text/70">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const filters: ('All' | ProjectCategory)[] = ['All', 'AI', 'Web', 'Blockchain'];
const INITIAL_PROJECTS = 6;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const shown = project.stack.slice(0, 5);
  const extra = project.stack.length - shown.length;

  return (
    <article
      className={`${cardClass} group flex h-full cursor-pointer flex-col p-5`}
      onClick={() => onOpen(project)}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold leading-6 text-terminal-accent sm:text-lg">{project.name}</h3>
        <span className="shrink-0 whitespace-nowrap pt-0.5 font-mono text-[11px] text-terminal-secondary/80">{project.period.split(' · ')[0]}</span>
      </div>
      <div className="mt-1 font-mono text-xs text-terminal-secondary">{project.domain}</div>
      <p className="line-clamp-3 mt-3 font-sans text-sm leading-6 text-terminal-text/70">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {shown.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
        {extra > 0 && <Chip>+{extra}</Chip>}
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <ProjectLinks project={project} size="sm" />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(project);
          }}
          className="ml-auto font-mono text-xs text-terminal-secondary underline decoration-dotted underline-offset-4 transition group-hover:text-terminal-accent"
        >
          details →
        </button>
      </div>
    </article>
  );
}

function Projects({ openProject }: { openProject: (project: Project) => void }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter))),
    [filter],
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_PROJECTS);

  return (
    <Section
      id="projects"
      command="projects"
      title="Projects"
      subtitle="Products, research prototypes and hackathon builds. Click a card for the full story."
    >
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((name) => {
          const count = name === 'All' ? projects.length : projects.filter((project) => project.categories.includes(name)).length;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={filter === name}
              onClick={() => setFilter(name)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition sm:text-sm ${
                filter === name
                  ? 'border-terminal-accent bg-terminal-accent/20 text-terminal-accent'
                  : 'border-terminal-accent/20 text-terminal-text/70 hover:border-terminal-accent/60 hover:text-terminal-accent'
              }`}
            >
              {name} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={`${filter}-${project.name}`} delay={Math.min(index, 5) * 0.05}>
            <ProjectCard project={project} onOpen={openProject} />
          </Reveal>
        ))}
      </div>

      {filtered.length > INITIAL_PROJECTS && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAll((value) => !value)} className={ghostButton}>
            {showAll ? 'Show fewer projects' : `Show all ${filtered.length} projects`}
          </button>
        </div>
      )}
    </Section>
  );
}

function Research() {
  const { copied, copy } = useCopy();

  return (
    <Section
      id="research"
      command="research"
      title="Research"
      subtitle="Sole-authored preprints on digital identity security and evidence-grounded AI systems."
    >
      <div className="space-y-6">
        {research.map((paper) => (
          <Reveal key={paper.id}>
            <article className={`${cardClass} overflow-hidden`}>
              <div className="border-b border-terminal-accent/15 bg-terminal-accent/5 px-5 py-3 sm:px-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="accent">Preprint</Chip>
                  <Chip>
                    {paper.venue} · {paper.year}
                  </Chip>
                  <Chip>Sole author</Chip>
                </div>
              </div>
              <div className="p-5 sm:p-7">
                <h3 className="font-mono text-lg font-semibold leading-7 text-terminal-accent sm:text-xl sm:leading-8">{paper.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-terminal-text/80">
                  <span className="font-medium text-terminal-text">{paper.authors}</span>
                  <span className="text-terminal-accent/40">·</span>
                  <span>{paper.affiliation}</span>
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-terminal-secondary">Summary</h4>
                    <p className="mt-3 font-sans text-sm leading-7 text-terminal-text/75 sm:text-[15px]">{paper.summary}</p>
                    {paper.keywords && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {paper.keywords.map((keyword) => (
                          <Chip key={keyword}>{keyword}</Chip>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-terminal-secondary">Highlights</h4>
                    <ul className="mt-3 space-y-3 font-sans text-sm leading-6 text-terminal-text/75">
                      {paper.highlights.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="shrink-0 font-mono text-terminal-accent">0{index + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={paper.paperUrl} target="_blank" rel="noreferrer" className={primaryButton}>
                    <FaFileAlt /> Read on Zenodo
                  </a>
                  <a href={paper.codeUrl} target="_blank" rel="noreferrer" className={ghostButton}>
                    {paper.codeUrl.includes('github.com') ? <FaGithub /> : <FaExternalLinkAlt className="text-xs" />} Code
                  </a>
                </div>

                <dl className="mt-6 grid gap-x-8 gap-y-2 font-mono text-xs leading-6 text-terminal-secondary sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="shrink-0 text-terminal-accent">Zenodo</dt>
                    <dd className="break-all">{paper.paperLabel}</dd>
                  </div>
                  {paper.license && (
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-terminal-accent">License</dt>
                      <dd>{paper.license}</dd>
                    </div>
                  )}
                </dl>

                {paper.bibtex && (
                  <details className="group mt-5 rounded-lg border border-terminal-accent/15 bg-black/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-mono text-xs text-terminal-secondary transition hover:text-terminal-accent sm:text-sm [&::-webkit-details-marker]:hidden">
                      <span>
                        <span className="text-terminal-accent">$</span> cat citation.bib
                      </span>
                      <span className="text-terminal-accent transition group-open:rotate-90">›</span>
                    </summary>
                    <div className="relative border-t border-terminal-accent/15">
                      <button
                        type="button"
                        onClick={() => copy(paper.id, paper.bibtex ?? '')}
                        className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded border border-terminal-accent/30 bg-terminal-bg px-2 py-1 font-mono text-[11px] text-terminal-accent transition hover:bg-terminal-accent/15"
                      >
                        {copied === paper.id ? <FaCheck /> : <FaCopy />} {copied === paper.id ? 'Copied' : 'Copy'}
                      </button>
                      <pre className="term-scroll m-0 overflow-x-auto p-4 pt-10 font-mono text-[11px] leading-5 text-terminal-text/80 sm:text-xs">
                        {paper.bibtex}
                      </pre>
                    </div>
                  </details>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const certIcons: Record<Certification['type'], JSX.Element> = {
  Course: <FaCertificate />,
  Award: <FaTrophy />,
  'Guest Lecture': <FaChalkboardTeacher />,
};

function Certifications() {
  return (
    <Section
      id="certifications"
      command="certifications"
      title="Certifications"
      subtitle="Certificates for courses completed, awards won and lectures delivered."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((cert, index) => (
          <Reveal key={cert.title} delay={index * 0.05}>
            <article className={`${cardClass} flex h-full gap-4 p-5`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-terminal-accent/30 bg-terminal-accent/10 text-xl text-terminal-accent">
                {certIcons[cert.type]}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="accent">{cert.type}</Chip>
                  <span className="font-mono text-xs text-terminal-secondary">{cert.date}</span>
                </div>
                <h3 className="mt-2 font-mono text-base font-semibold leading-6 text-terminal-text">{cert.title}</h3>
                <div className="mt-0.5 font-sans text-sm text-terminal-accent/90">{cert.issuer}</div>
                <p className="mt-2 font-sans text-sm leading-6 text-terminal-text/65">{cert.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" command="skills" title="Skills" subtitle="Languages, frameworks and tools I work with.">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.04}>
            <div className={`${cardClass} h-full p-5`}>
              <h3 className="font-mono text-sm font-semibold text-terminal-accent">
                <span className="text-terminal-secondary/60">{'// '}</span>
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-terminal-accent/20 bg-terminal-accent/5 px-2.5 py-1 font-mono text-xs text-terminal-text/90 transition hover:border-terminal-accent/60 hover:text-terminal-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" command="education" title="Education & Achievements">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-terminal-secondary">
            <FaGraduationCap className="text-terminal-accent" /> Education
          </h3>
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 0.05}>
              <article className={`${cardClass} p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-mono text-base font-semibold leading-6 text-terminal-accent">{item.short}</h4>
                  <span className="shrink-0 rounded border border-terminal-accent/40 bg-terminal-accent/15 px-2 py-0.5 font-mono text-xs text-terminal-accent">
                    {item.score}
                  </span>
                </div>
                <div className="mt-1.5 font-sans text-[15px] leading-6 text-terminal-text">{item.institution}</div>
                <div className="mt-1 font-sans text-sm leading-6 text-terminal-text/60">
                  {item.degree}
                  {item.affiliation ? ` · ${item.affiliation}` : ''}
                </div>
                <div className="mt-2 font-mono text-xs text-terminal-secondary">{item.period}</div>
                {item.notes?.map((note) => (
                  <div key={note} className="mt-3 flex gap-2 font-sans text-sm leading-6 text-terminal-text/75">
                    <FaAward className="mt-1 shrink-0 text-terminal-accent" /> {note}
                  </div>
                ))}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-terminal-secondary">
            <FaTrophy className="text-terminal-accent" /> Achievements
          </h3>
          {achievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className={`${cardClass} flex gap-4 p-5`}>
                <div className="font-mono text-xl font-bold text-terminal-accent/50">0{index + 1}</div>
                <div className="min-w-0">
                  <h4 className="font-mono text-[15px] font-semibold leading-6 text-terminal-text">{item.title}</h4>
                  <p className="mt-1 font-sans text-sm leading-6 text-terminal-text/65">{item.detail}</p>
                  {item.date && <div className="mt-1.5 font-mono text-xs text-terminal-secondary">{item.date}</div>}
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <article className={`${cardClass} p-5`}>
              <h4 className="flex items-center gap-2 font-mono text-[15px] font-semibold text-terminal-text">
                <FaChalkboardTeacher className="text-terminal-accent" /> Workshops
              </h4>
              <p className="mt-2 font-sans text-sm leading-6 text-terminal-text/65">{workshops.summary}</p>
              {workshops.conducted.map((item) => (
                <p key={item.title} className="mt-2 font-sans text-sm leading-6 text-terminal-text/65">
                  <span className="text-terminal-text/90">&ldquo;{item.title}&rdquo;</span> — {item.where}, {item.date}.
                </p>
              ))}
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const { copied, copy } = useCopy();

  return (
    <Section id="contact" command="contact" title="Get in touch">
      <Reveal>
        <div className={`${cardClass} overflow-hidden`}>
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="p-6 sm:p-9">
              <h3 className="font-mono text-xl font-bold leading-8 text-terminal-text sm:text-2xl">
                Let&apos;s build something <span className="text-terminal-accent">worth remembering</span>.
              </h3>
              <p className="mt-4 max-w-md font-sans text-sm leading-7 text-terminal-text/70 sm:text-base">
                {profile.availability} Whether it is a role, a collaboration or a question about my research, my inbox is open.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={primaryButton}>
                  <FaEnvelope /> Say hello
                </a>
                <button type="button" onClick={downloadResume} className={ghostButton}>
                  <FaDownload /> Resume
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-terminal-accent/20 px-3 py-2 font-mono text-xs text-terminal-text/80 transition hover:border-terminal-accent hover:text-terminal-accent"
                  >
                    <span className="text-base">{socialIcons[social.name]}</span> {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-terminal-accent/15 bg-terminal-accent/5 p-6 sm:p-9 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-4 rounded-lg border border-terminal-accent/15 bg-black/30 p-4">
                <FaEnvelope className="shrink-0 text-lg text-terminal-accent" />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-terminal-secondary">Email</div>
                  <a href={`mailto:${profile.email}`} className="block truncate font-mono text-sm text-terminal-text transition hover:text-terminal-accent">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copy('email', profile.email)}
                  aria-label="Copy email address"
                  className="shrink-0 rounded border border-terminal-accent/25 p-2 text-sm text-terminal-accent transition hover:bg-terminal-accent/15"
                >
                  {copied === 'email' ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-terminal-accent/15 bg-black/30 p-4">
                <FaPhoneAlt className="shrink-0 text-lg text-terminal-accent" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-terminal-secondary">Phone</div>
                  <a href={`tel:${profile.phoneHref}`} className="font-mono text-sm text-terminal-text transition hover:text-terminal-accent">
                    {profile.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-terminal-accent/15 bg-black/30 p-4">
                <FaMapMarkerAlt className="shrink-0 text-lg text-terminal-accent" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-terminal-secondary">Location</div>
                  <div className="font-mono text-sm text-terminal-text">{profile.locationLong}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-terminal-accent/15 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-terminal-secondary sm:flex-row sm:px-6 lg:px-10">
        <div className="text-center sm:text-left">
          © {new Date().getFullYear()} {profile.fullName}. Designed and built by {profile.name}.
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 rounded border border-terminal-accent/30 px-3 py-1.5 text-terminal-accent transition hover:bg-terminal-accent/15"
        >
          <FaTerminal /> Back to terminal <FaArrowUp className="text-[10px]" />
        </button>
      </div>
    </footer>
  );
}

export function Gui({ openProject }: { openProject: (project: Project) => void }) {
  return (
    <div id="gui" className="gui-grid relative scroll-mt-0 border-t border-terminal-accent/20">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Hero />
        <Experience />
        <Projects openProject={openProject} />
        <Research />
        <Certifications />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
