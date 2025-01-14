'use client';

import { type SlotComponentProps } from '../..';
import { Button as AriaButton } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { type ClassNameValue } from 'tailwind-merge';
import { createContext, useContext } from 'react';
import { _tvButton, tvButton } from './styles';
import { mergeProps } from 'react-aria';

// =============================================================================
// #region ButtonContext

export type ButtonContextType = VariantProps<typeof _tvButton>;

export const ButtonContext = createContext<ButtonContextType>({});

export const useButtonContext = (
  ...contexts: ButtonContextType[]
): ButtonContextType => {
  return mergeProps(useContext(ButtonContext), ...contexts);
};

// #endregion

// =============================================================================
// #region Button
export type ButtonProps = SlotComponentProps<
  typeof _tvButton,
  'root',
  React.ComponentPropsWithRef<typeof AriaButton> & {
    /** Customize CSS classes for each components */
    classes?: {
      [key in keyof (typeof _tvButton)['slots']]?: ClassNameValue;
    };
  }
>;

/** @see https://react-spectrum.adobe.com/react-aria/Button.html */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  classes,
  ...props
}) => {
  const ctx = useButtonContext(props);
  return (
    <AriaButton
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvButton.root({
          className: [classes?.root, className],
          ...ctx,
          ...renderProps,
        });
      }}
      {...props}
    >
      {children}
    </AriaButton>
  );
};
// #endregion

// =============================================================================
// #region FileTrigger
/** @see https://react-spectrum.adobe.com/react-aria/FileTrigger.html */
export { FileTrigger } from 'react-aria-components';
// #endregion
