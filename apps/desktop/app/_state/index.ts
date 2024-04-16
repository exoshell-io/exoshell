'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// #region Types

export type Workflow = {
  name: string;
  id: string;
};

export type Dashboard = {
  name: string;
  id: string;
};

export type Tab = {
  href: string;
};

// #endregion

export type Store = {
  // Layout
  tabs: Tab[];
  activeTab?: number;
  setActiveTab: (activeTab?: number | null) => void;
  openTab: (href: string, focus?: boolean) => void;
  closeTab: (index: number) => void;
  // Workflows
  workflows: {
    [key: string]: Workflow;
  };
  createWorkflow: (focus?: boolean) => void;
  updateWorkflow: (id: string, workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  // Dashboards
  dashboards: {
    [key: string]: Dashboard;
  };
  createDashboard: (focus?: boolean) => void;
  updateDashboard: (id: string, dashboard: Dashboard) => void;
  deleteDashboard: (id: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Layout
      tabs: [],
      activeTab: 0,
      setActiveTab: (activeTab?: number | null) =>
        set({ activeTab: activeTab ?? undefined }),
      openTab: (href: string, focus = true) => {
        set((state) => {
          const index = state.tabs.findIndex((tab) => tab.href === href);
          if (index === -1) {
            state.tabs.push({ href });
            if (focus) {
              state.activeTab = state.tabs.length - 1;
            }
          } else if (focus) {
            state.activeTab = index;
          }
          return { tabs: [...state.tabs], activeTab: state.activeTab };
        });
      },
      closeTab: (index: number) => {
        set((state) => {
          if (index < 0 || index >= state.tabs.length) {
            return state;
          }
          if (state.activeTab === index) {
            if (state.tabs.length === 1) {
              state.activeTab = undefined;
            } else if (index >= state.tabs.length - 1) {
              state.activeTab = state.tabs.length - 2;
            }
          }
          state.tabs.splice(index, 1);
          if (
            state.activeTab !== undefined &&
            state.activeTab >= state.tabs.length
          ) {
            state.activeTab--;
          }
          return { tabs: [...state.tabs], activeTab: state.activeTab };
        });
      },

      // Workflows
      workflows: {},
      createWorkflow: (focus = false) => {
        const id = `${Date.now()}-${Math.random()}`;
        set((state) => {
          state.workflows[id] = { name: 'Untitled', id };
          state.tabs.push({ href: `workflow://${id}` });
          if (focus) {
            state.activeTab = state.tabs.length - 1;
          }
          return {
            workflows: { ...state.workflows },
            tabs: [...state.tabs],
            activeTab: state.activeTab,
          };
        });
      },
      updateWorkflow: (id: string, workflow: Workflow) => {
        set((state) => {
          state.workflows[id] = workflow;
          return { workflows: { ...state.workflows } };
        });
      },
      deleteWorkflow: (id: string) => {
        set((state) => {
          delete state.workflows[id];
          filterTab(`workflow://${id}`, state);
          return {
            workflows: { ...state.workflows },
            tabs: [...state.tabs],
            activeTab: state.activeTab,
          };
        });
      },

      // Dashboards
      dashboards: {},
      createDashboard: (focus = false) => {
        const id = `${Date.now()}-${Math.random()}`;
        set((state) => {
          state.dashboards[id] = { name: 'Untitled', id };
          state.tabs.push({ href: `dashboard://${id}` });
          if (focus) {
            state.activeTab = state.tabs.length - 1;
          }
          return {
            dashboards: { ...state.dashboards },
            tabs: [...state.tabs],
            activeTab: state.activeTab,
          };
        });
      },
      updateDashboard: (id: string, dashboard: Dashboard) => {
        set((state) => {
          state.dashboards[id] = dashboard;
          return { dashboards: { ...state.dashboards } };
        });
      },
      deleteDashboard: (id: string) => {
        set((state) => {
          delete state.dashboards[id];
          filterTab(`dashboard://${id}`, state);
          return {
            dashboards: { ...state.dashboards },
            tabs: [...state.tabs],
            activeTab: state.activeTab,
          };
        });
      },
    }),
    {
      name: 'exoshell',
      version: 0,
    },
  ),
);

function filterTab(tabId: string, state: Store) {
  state.tabs = state.tabs.filter((tab) => !tab.href.startsWith(tabId));
  if (state.tabs.length === 0) {
    state.activeTab = undefined;
  } else if (
    state.activeTab !== undefined &&
    state.activeTab >= state.tabs.length
  ) {
    state.activeTab = state.tabs.length - 1;
  }
}
