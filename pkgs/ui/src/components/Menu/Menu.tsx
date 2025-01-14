'use client';

import { Button, Popover } from '../..';
import {
  Menu as AriaMenu,
  MenuTrigger as AriaMenuTrigger,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { _tvMenu, tvMenu } from './styles';

// =============================================================================
// #region MenuContextType

export type MenuContextType = VariantProps<typeof _tvMenu>;

// #endregion MenuContextType

// =============================================================================
// #region Menu

export type MenuProps = MenuContextType &
  React.ComponentPropsWithRef<typeof AriaMenu> & {
    label: React.ReactNode;
    buttonProps?: Omit<React.ComponentPropsWithRef<typeof Button>, 'children'>;
    menuTriggerProps?: Omit<
      React.ComponentPropsWithRef<typeof AriaMenuTrigger>,
      'children'
    >;
    popoverProps?: Omit<
      React.ComponentPropsWithRef<typeof Popover>,
      'children'
    >;
  };

export const Menu: React.FC<MenuProps> = ({
  children,
  className,
  label,
  buttonProps,
  menuTriggerProps,
  popoverProps,
  ...props
}) => {
  return (
    <AriaMenuTrigger {...menuTriggerProps}>
      <Button {...buttonProps}>{label}</Button>
      <Popover {...popoverProps}>
        <AriaMenu className={tvMenu.root({ className, ...props })} {...props}>
          {children}
        </AriaMenu>
      </Popover>
    </AriaMenuTrigger>
  );
};

// #endregion Menu
