import { profile } from '../data/portfolio';

/** Resolve a file from /public against the deployment base path (e.g. /asr-terminal-portfolio/). */
export const asset = (file: string) => `${import.meta.env.BASE_URL}${encodeURI(file)}`;

export const resumeUrl = () => asset(profile.resumeFile);

export function downloadResume() {
  const link = document.createElement('a');
  link.href = resumeUrl();
  link.download = profile.resumeDownloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True on devices whose main input is a mouse / trackpad (so focusing an input will not open a keyboard). */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
