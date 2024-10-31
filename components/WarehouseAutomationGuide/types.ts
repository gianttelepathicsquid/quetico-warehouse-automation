import { LucideIcon } from 'lucide-react';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export interface InsightContent {
  challenge?: string;
  example?: string;
}

export interface Insight {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string[] | InsightContent[] | string;
  stats?: {
    value: number;
    label: string;
  };
}

export interface InsightCardProps {
  insight: Insight;
  isVisible: boolean;
}

export interface Alternative {
  id: string;
  icon: LucideIcon;
  title: string;
  benefit: string;
}
