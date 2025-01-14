'use client';

import { createContext, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  Button as AriaButton,
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  DisclosurePanel as AriaDisclosurePanel,
  Heading as AriaHeading,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { IconChevronRight, type SlotComponentProps } from '../..';
import { _tvDisclosure, tvDisclosure } from './styles';

// =============================================================================
// #region DisclosureContext

export type DisclosureContextType = VariantProps<typeof _tvDisclosure>;

export const DisclosureContext = createContext<DisclosureContextType>({});

export const useDisclosureContext = (
  ...contexts: DisclosureContextType[]
): DisclosureContextType | undefined => {
  return mergeProps(useContext(DisclosureContext), ...contexts);
};

// #endregion

// =============================================================================
// #region Disclosure
// See https://react-spectrum.adobe.com/react-aria/Disclosure.html

type AriaDisclosureProps = Omit<
  React.ComponentPropsWithRef<typeof AriaDisclosure>,
  'children'
>;
type AriaHeadingProps = Omit<
  React.ComponentPropsWithRef<typeof AriaHeading>,
  'children'
>;
type AriaButtonProps = Omit<
  React.ComponentPropsWithRef<typeof AriaButton>,
  'children'
>;
type AriaDisclosurePanelProps = Omit<
  React.ComponentPropsWithRef<typeof AriaDisclosurePanel>,
  'children'
>;

export type DisclosureProps = SlotComponentProps<
  typeof _tvDisclosure,
  'disclosure',
  AriaDisclosureProps & {
    headingProps?: AriaHeadingProps;
    buttonProps?: AriaButtonProps;
    panelProps?: AriaDisclosurePanelProps;
    label: React.ComponentPropsWithRef<typeof AriaButton>['children'];
    leftSection?: React.ReactNode;
    children: React.ReactNode;
  }
>;

// https://eslint-react.xyz/docs/rules/no-unstable-default-props
const defaultAriaHeadingProps: AriaHeadingProps = {};
const defaultAriaButtonProps: AriaButtonProps = {};
const defaultAriaDisclosurePanelProps: AriaDisclosurePanelProps = {};

export const Disclosure: React.FC<DisclosureProps> = ({
  children,
  className,
  headingProps: {
    className: headingClassName,
    ...headingProps
  } = defaultAriaHeadingProps,
  buttonProps: {
    className: buttonClassName,
    ...buttonProps
  } = defaultAriaButtonProps,
  label,
  leftSection,
  panelProps: {
    className: panelClassName,
    ...panelProps
  } = defaultAriaDisclosurePanelProps,
  ...props
}) => {
  return (
    <AriaDisclosure
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvDisclosure.disclosure({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      <AriaHeading
        className={tvDisclosure.heading({
          className: headingClassName,
          ...headingProps,
        })}
        {...headingProps}
      >
        <AriaButton
          slot='trigger'
          className={(renderProps) => {
            if (typeof buttonClassName === 'function') {
              buttonClassName = buttonClassName(renderProps);
            }
            return tvDisclosure.button({
              className: buttonClassName,
              ...buttonProps,
              ...renderProps,
            });
          }}
        >
          {(renderProps) => (
            <>
              {leftSection !== undefined ? (
                leftSection
              ) : (
                <IconChevronRight
                  size={15}
                  data-chevron
                  className={tvDisclosure.chevron({ ...renderProps })}
                />
              )}
              {typeof label === 'function' ? label(renderProps) : label}
            </>
          )}
        </AriaButton>
      </AriaHeading>
      <AriaDisclosurePanel
        className={(renderProps) => {
          if (typeof panelClassName === 'function') {
            panelClassName = panelClassName(renderProps);
          }
          return tvDisclosure.panel({
            className: panelClassName,
            ...panelProps,
            ...renderProps,
          });
        }}
        {...panelProps}
      >
        {children}
      </AriaDisclosurePanel>
    </AriaDisclosure>
  );
};

// #endregion

// =============================================================================
// #region DisclosureGroup

export type DisclosureGroupProps = SlotComponentProps<
  typeof _tvDisclosure,
  'group',
  React.ComponentPropsWithRef<typeof AriaDisclosureGroup>
>;

export const DisclosureGroup: React.FC<DisclosureGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaDisclosureGroup
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvDisclosure.group({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaDisclosureGroup>
  );
};

// #endregion
