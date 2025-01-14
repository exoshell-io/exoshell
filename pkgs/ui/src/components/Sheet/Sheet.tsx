'use client';

import { type ComponentProps } from '../..';
import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

export { DialogTrigger as Sheet } from 'react-aria-components';

export {
  DialogTrigger as SheetTrigger,
  DialogFooter as SheetFooter,
  DialogBody as SheetBody,
  DialogHeader as SheetHeader,
  DialogHeaderTitle as SheetHeaderTitle,
  DialogHeaderDescription as SheetHeaderDescription,
  DialogCloseButton as SheetCloseButton,
} from '../..';

export const tvSheetModalOverlay = tv({
  base: [
    'fixed top-0 left-0 w-full bg-fg/15 dark:bg-bg/40 h-(--visual-viewport-height) isolate z-50 flex items-center justify-center p-4',
  ],
  variants: {
    isBlurred: {
      true: 'backdrop-blur bg-bg/15 dark:bg-bg/40',
    },
    isEntering: {
      true: 'animate-in fade-in duration-300 ease-out',
    },
    isExiting: {
      true: 'animate-out fade-out duration-200 ease-in',
    },
  },
});

export const SheetModalOverlay: React.FC<
  ComponentProps<
    typeof tvSheetModalOverlay,
    never,
    React.ComponentPropsWithRef<typeof AriaModalOverlay>
  >
> = ({ children, className, isBlurred, isEntering, isExiting, ...props }) => {
  return (
    <AriaModalOverlay
      className={(renderProps) => {
        return tvSheetModalOverlay({
          className,
          isBlurred,
          isEntering: isEntering ?? renderProps.isEntering,
          isExiting: isExiting ?? renderProps.isExiting,
        });
      }}
      isDismissable
      {...props}
    >
      {children}
    </AriaModalOverlay>
  );
};

export const tvSheetModal = tv({
  base: 'fixed z-50 grid gap-4 bg-overlay border-fg/5 dark:border-border text-overlay-fg shadow-lg transition ease-in-out',
  variants: {
    isEntering: {
      true: 'duration-300 animate-in ',
    },
    isExiting: {
      true: 'duration-200 animate-out',
    },
    side: {
      top: 'inset-x-0 top-0 rounded-b-2xl border-b data-entering:slide-in-from-top data-exiting:slide-out-to-top',
      bottom:
        'inset-x-0 bottom-0 rounded-t-2xl border-t data-entering:slide-in-from-bottom data-exiting:slide-out-to-bottom',
      left: 'inset-y-0 left-0 h-auto w-[18rem] sm:w-[19rem] sm:w-3/4 overflow-y-auto border-r data-entering:slide-in-from-left data-exiting:slide-out-to-left sm:max-w-xs',
      right:
        'inset-y-0 right-0 h-auto w-[18rem] sm:w-[19rem] sm:w-3/4 overflow-y-auto border-l data-entering:slide-in-from-right data-exiting:slide-out-to-right sm:max-w-xs',
    },
    isFloat: {
      false: 'border-fg/20 dark:border-border',
      true: 'ring-fg/5 dark:ring-border',
    },
  },
  compoundVariants: [
    {
      side: 'top',
      isFloat: true,
      className: 'top-2 inset-x-2 rounded-xl ring-1 border-b-0',
    },
    {
      side: 'right',
      isFloat: true,
      className: 'right-2 inset-y-2 rounded-xl ring-1 border-l-0',
    },
    {
      side: 'bottom',
      isFloat: true,
      className: 'bottom-2 inset-x-2 rounded-xl ring-1 border-t-0',
    },
    {
      side: 'left',
      isFloat: true,
      className: 'left-2 inset-y-2 rounded-xl ring-1 border-r-0',
    },
  ],
});

export const SheetModal: React.FC<
  ComponentProps<
    typeof tvSheetModal,
    never,
    React.ComponentPropsWithRef<typeof AriaModal>
  >
> = ({ className, isEntering, isExiting, side, isFloat, ...props }) => {
  return (
    <AriaModal
      className={(renderProps) => {
        return tvSheetModal({
          className,
          side,
          isFloat,
          isEntering: isEntering ?? renderProps.isEntering,
          isExiting: isExiting ?? renderProps.isExiting,
        });
      }}
      {...props}
    />
  );
};
