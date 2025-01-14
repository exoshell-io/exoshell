'use client';

import { createContext, useContext } from 'react';
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup as AriaToggleButtonGroup,
} from 'react-aria-components';
import { mergeProps } from 'react-aria';
import { type SlotComponentProps } from '../..';
import { _tvToggleButton, tvToggleButton } from './styles';

// =============================================================================
// #region ToggleButtonContext

export type ToggleButtonGroupContextType = SlotComponentProps<
  typeof _tvToggleButton,
  keyof (typeof _tvToggleButton)['slots'],
  { classes?: { [key in keyof (typeof _tvToggleButton)['slots']]?: string } }
> &
  ToggleButtonContextType;

export type ToggleButtonContextType = object;

export const ToggleButtonContext = createContext<ToggleButtonGroupContextType>(
  {},
);

export const useToggleButtonContext = (
  ...contexts: ToggleButtonGroupContextType[]
): ToggleButtonGroupContextType | undefined => {
  return mergeProps(useContext(ToggleButtonContext), ...contexts);
};

// #endregion

// =============================================================================
// #region ToggleButtonGroup

export type ToggleButtonGroupProps = SlotComponentProps<
  typeof _tvToggleButton,
  'toggleGroup',
  ToggleButtonGroupContextType &
    React.ComponentPropsWithRef<typeof AriaToggleButtonGroup>
>;

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  children,
  className,
  ...props
}) => {
  const ctx = useToggleButtonContext(props);
  return (
    <ToggleButtonContext value={{ ...ctx }}>
      <AriaToggleButtonGroup
        className={(renderProps) => {
          if (typeof className === 'function') {
            className = className(renderProps);
          }
          return tvToggleButton.toggleGroup({
            className,
            ...props,
            ...renderProps,
          });
        }}
        {...props}
      >
        {children}
      </AriaToggleButtonGroup>
    </ToggleButtonContext>
  );
};

// #endregion

// =============================================================================
// #region ToggleButton

export type ToggleButtonProps = SlotComponentProps<
  typeof _tvToggleButton,
  'toggle',
  ToggleButtonContextType & React.ComponentPropsWithRef<typeof AriaToggleButton>
>;

/** @see https://react-spectrum.adobe.com/react-aria/ToggleButton.html */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <AriaToggleButton
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvToggleButton.toggle({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaToggleButton>
  );
};

// #endregion
