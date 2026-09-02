import type { ReactNode } from "react";

export type NavLink = { href: string; label: string };

export type HourRow = { label: string; value: string };

export type Offering = {
  id: string;
  name: string;
  description: string;
  meta?: string;
};

export type Step = { n: string; title: string; text: string };

export type StoryCard = {
  n: string;
  side: "left" | "right";
  kicker: string;
  caption: string;
  title: string;
  text: string;
  span: readonly [number, number, number, number];
};

export type Stat = { value: string; label: string };

export type TableColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
};

export type SitePublic = {
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  phone?: string;
  email?: string;
  address?: string;
  ctaHref: string;
  ctaLabel: string;
};

export type LandingCopy = {
  skip: string;
  scrollHint: string;
  offeringsKicker: string;
  offeringsTitle: string;
  processKicker: string;
  processTitle: string;
  aboutKicker: string;
  hoursTitle: string;
  contactKicker: string;
  contactTitle: string;
};

export type LandingHeroBackground = {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
};
