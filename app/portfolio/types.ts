export type ThemeMode = "light" | "dark";

export type ThemeClasses = {
  page: string;
  header: string;
  shell: string;
  sectionShell: string;
  softCard: string;
  muted: string;
  subtle: string;
  label: string;
  nav: string;
  buttonAlt: string;
};

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type Project = {
  name: string;
  type: string;
  summary: string;
  impact: string;
  accent: string;
  story: string;
  role: string;
  highlight: string;
  challenge: string;
  approach: string[];
  stack: string[];
  outcome: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export type SharedProps = {
  isLight: boolean;
  isMobile: boolean;
  focusMode: boolean;
  shouldReduceMotion: boolean | null;
  themeClasses: ThemeClasses;
};
