'use client';

import { type SlotComponentProps } from '../..';
import { motion, LayoutGroup as MotionLayoutGroup } from 'motion/react';
import { createContext, useContext, useId } from 'react';
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

// =============================================================================
// #region Styles
export const _tvTabs = tv({
  slots: {
    root: 'group/tabs flex forced-color-adjust-none',
    tabsList: 'flex forced-color-adjust-none',
    tab: [
      'relative flex whitespace-nowrap cursor-pointer items-center justify-center text-sm font-medium outline-hidden data-hovered:text-fg',
      'py-[10px] px-[20px]',
    ],
    selectedTabSpan: '',
    panel: '',
  },
  variants: {
    variant: {
      default: {
        root: 'gap-4',
        tabsList: '',
        selectedTabSpan: 'absolute rounded bg-fg',
      },
      outline: {
        root: '',
        tabsList: 'before:border-b before:border-gray-200',
        tab: 'rounded-t-lg mb-[-1px]',
      },
      editor: {
        root: '',
      },
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        tabsList: 'flex-row ',
        tab: '',
        selectedTabSpan: '-bottom-px inset-x-0 h-0.5 w-full',
      },
      vertical: {
        root: 'flex-row',
        tabsList: [
          'flex-col items-start gap-y-4 border-l',
          '*:w-full *:py-0 *:pl-4 *:pr-2',
        ],
        tab: 'w-full py-0 pl-4 pr-2',
        selectedTabSpan: 'left-0 h-[calc(100%-10%)] w-0.5 transform',
      },
    },
    isSelected: {
      false: {
        tab: 'text-muted-fg',
      },
      true: {
        tab: 'text-fg',
      },
    },
    isFocused: {
      false: {
        tab: 'ring-0',
      },
      true: {
        tab: 'text-fg',
      },
    },
    isDisabled: {
      true: {
        tab: 'text-muted-fg/50',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      isSelected: true,
      className: {
        tab: 'border-t border-l border-r bg-white',
      },
    },
    {
      variant: ['outline', 'default'],
      orientation: 'horizontal',
      className: {
        tabsList: 'border-b border-border',
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
});

export const tvTabs = _tvTabs();
// #endregion

// =============================================================================
// #region Tabs
type TabsProps = SlotComponentProps<
  typeof _tvTabs,
  'root',
  React.ComponentPropsWithRef<typeof AriaTabs>
>;

const ContextTabs = createContext<VariantProps<typeof _tvTabs>>({});

export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ContextTabs
      value={{
        variant: props.variant,
        // Defaulting `orientation` to `horizontal` is a hardcoded shortcut.
        // It could be updated from the `AriaTabs.className(renderProps => {...})` function.
        orientation: props.orientation ?? 'horizontal',
      }}
    >
      <AriaTabs
        className={(renderProps) => {
          if (typeof className === 'function') {
            className = className(renderProps);
          }
          return tvTabs.root({ className, ...props, ...renderProps });
        }}
        {...props}
      >
        {children}
      </AriaTabs>
    </ContextTabs>
  );
};

Tabs.displayName = '@exoshell/ui/Tabs';
// #endregion

// =============================================================================
// #region TabsList
export type TabsListProps = SlotComponentProps<
  typeof _tvTabs,
  'tabsList',
  React.ComponentPropsWithRef<typeof AriaTabList>
>;

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  ...props
}) => {
  const ctx = useContext(ContextTabs);
  const layoutId = useId();
  return (
    <MotionLayoutGroup id={layoutId}>
      <AriaTabList
        className={(renderProps) => {
          if (typeof className === 'function') {
            className = className(renderProps);
          }
          return tvTabs.tabsList({
            className,
            ...ctx,
            ...props,
            ...renderProps,
          });
        }}
        {...props}
      >
        {children}
      </AriaTabList>
    </MotionLayoutGroup>
  );
};

TabsList.displayName = '@exoshell/ui/TabsList';
// #endregion

// =============================================================================
// #region TabsTab
export type TabsTabProps = SlotComponentProps<
  typeof _tvTabs,
  'tab',
  React.ComponentPropsWithRef<typeof AriaTab> & {
    selectedTabSpanProps?: React.ComponentPropsWithRef<typeof motion.span>;
  }
>;

// Respect https://eslint-react.xyz/docs/rules/no-unstable-default-props
const defaultSelectedSpanProps: TabsTabProps['selectedTabSpanProps'] = {};

export const TabsTab: React.FC<TabsTabProps> = ({
  children,
  className,
  selectedTabSpanProps: {
    className: selectedTabSpanClassName,
    ...selectedTabSpan
  } = defaultSelectedSpanProps,
  ...props
}) => {
  const ctx = useContext(ContextTabs);
  return (
    <AriaTab
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTabs.tab({ className, ...ctx, ...props, ...renderProps });
      }}
      {...props}
    >
      {(renderProps) => (
        <>
          {typeof children === 'function' ? children(renderProps) : children}
          {renderProps.isSelected && (
            <motion.span
              className={tvTabs.selectedTabSpan({
                className: selectedTabSpanClassName,
                ...ctx,
                ...renderProps,
              })}
              layoutId='current-selected'
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              {...selectedTabSpan}
            />
          )}
        </>
      )}
    </AriaTab>
  );
};

TabsTab.displayName = '@exoshell/ui/TabsTab';
// #endregion

// =============================================================================
// #region TabsPanel
export type TabsPanelProps = SlotComponentProps<
  typeof _tvTabs,
  'panel',
  React.ComponentPropsWithRef<typeof AriaTabPanel>
>;

export const TabsPanel: React.FC<TabsPanelProps> = ({
  children,
  className,
  ...props
}) => {
  const ctx = useContext(ContextTabs);
  return (
    <AriaTabPanel
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvTabs.panel({ className, ...ctx, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaTabPanel>
  );
};

TabsPanel.displayName = '@exoshell/ui/TabsPanel';
// #endregion
