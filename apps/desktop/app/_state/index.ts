export type * from '@exoshell/model';
export * from './dashboards';
export * from './layout';
export * from './query';
export * from './scriptRuns';
export * from './scripts';
export * from './settings';
export * from './tabs';
export * from './workflows';

export const queryKeys = {
  scripts: ['scripts'],
  scriptRuns: ['scriptRuns'],
  dashboards: ['dashboards'],
  workflows: ['workflows'],
} as const;
