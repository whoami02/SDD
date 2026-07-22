export interface Topic {
  id: string;
  title: string;
  hook?: string;
  explanation?: string;
  practice?: string;
  diagramUrl?: string;
  diagramExplanation?: string;
  articleUrl?: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  topics: Topic[];
  isMockInterview?: boolean;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  days: DayPlan[];
}

// ─── GSDD Types ───────────────────────────────────────────────────────────────

export interface GsddBasic {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: 'basics';
}

export interface GsddDesign {
  id: string;
  title: string;
  slug: string;
  content?: string;
  overviewImage: string;
  detailImage?: string;
  category: 'designs';
}

export interface GsddIntro {
  id: 'gsdd-intro';
  title: string;
  content: string;
  category: 'intro';
}

export type GsddItem = GsddBasic | GsddDesign | GsddIntro;

export interface GsddSection {
  id: string;
  title: string;
  items: GsddItem[];
}

