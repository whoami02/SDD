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
