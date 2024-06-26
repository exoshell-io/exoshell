'use client';

export type * from '@exoshell/model';
export * from './dashboards';
export * from './layout';
export * from './querySurreal';
export * from './scriptRuns';
export * from './scripts';
export * from './settings';
export * from './tabs';
export * from './workflows';
export * from './events';

export const queryKeys = {
  scripts: ['scripts'],
  scriptRuns: ['scriptRuns'],
  dashboards: ['dashboards'],
  workflows: ['workflows'],
} as const;
