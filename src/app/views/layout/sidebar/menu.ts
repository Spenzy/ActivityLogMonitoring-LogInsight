import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    subItems: [
      {
        label: 'Jobs Analysis Dashboard',
        link: '/dashboard/jobs',
      },
      {
        label: 'Logs Analysis Dashboard',
        link: '/dashboard/logs',
      },
    ]
  },
  {
    label: 'Analysis & Prediction',
    icon: 'pie-chart',
    subItems: [
          {
            label: 'Duration & Cluster Prediction',
        link: '/charts-graphs/PredictiveModels',
      },
      {
        label: 'SentimentalAnalysis',
        link: '/charts-graphs/SentimentalAnalysis',
      },
    ]
  }
];
