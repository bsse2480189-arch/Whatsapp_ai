export type AutomationStatus = 'Active' | 'Paused' | 'Failed';

export interface AutomationMetric {
  sent: number;
  responded: number;
  conversion: number;
}

export interface Automation {
  id: string;
  title: string;
  description: string;
  status: AutomationStatus;
  lastRun: string;
  metrics: AutomationMetric;
  rules: string[];
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
}

export type ViewType = 'Dashboard' | 'Automations' | 'Contacts' | 'Settings';
