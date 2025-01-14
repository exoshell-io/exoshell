'use client';

import {
  Button as AriaButton,
  Dialog as AriaDialog,
  Heading as AriaHeading,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import {
  Button,
  type ComponentProps,
  type PolymorphicComponentProps,
} from '../..';

export const tvDialog = tv({
  slots: {
    root: [
      'relative peer group/dialog flex max-h-[inherit] not-has-data-[slot=dialog-body]:**:data-[slot=dialog-header]:pb-0 [&::-webkit-scrollbar]:size-0.5 [scrollbar-width:thin] flex-col overflow-hidden outline-hidden',
    ],
    header: 'relative flex flex-col gap-0.5 sm:gap-1 p-4 sm:p-6',
    description: 'text-sm text-muted-fg',
    body: [
      'has-[input]:pb-1',
      'flex flex-1 isolate flex-col overflow-auto px-4 sm:px-6',
      'max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]',
    ],
    footer:
      'mt-auto flex isolate flex-col-reverse justify-between gap-3 sm:flex-row p-4 sm:p-6',
    closeIndicator:
      'close absolute right-1 top-1 sm:right-2 sm:top-2 data-focused:outline-hidden data-focused:bg-secondary data-hovered:bg-secondary grid place-content-center rounded-xl sm:rounded-md data-focus-visible:ring-1 data-focus-visible:ring-primary size-8 sm:size-7 z-50',
  },
});

export const Dialog: React.FC<
  ComponentProps<
    typeof tvDialog,
    never,
    React.ComponentPropsWithRef<typeof AriaDialog>
  >
> = ({ children, className, ...props }) => {
  return (
    <AriaDialog className={tvDialog().root({ className })} {...props}>
      {children}
    </AriaDialog>
  );
};

export const DialogTrigger: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof Button>>
> = (props) => <Button {...props} />;

export const DialogHeader = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  title,
  description,
  ...props
}: PolymorphicComponentProps<
  E,
  typeof tvDialog,
  never,
  {
    title?: string;
    description?: string;
  }
>) => {
  const Element: React.ElementType = as ?? 'div';
  return (
    <Element
      data-slot='dialog-header'
      className={tvDialog().header({ className })}
      {...props}
    >
      {title && <DialogHeaderTitle>{title}</DialogHeaderTitle>}
      {description && (
        <DialogHeaderDescription>{description}</DialogHeaderDescription>
      )}
      {!title && typeof children === 'string' ? (
        <DialogHeaderTitle>{children}</DialogHeaderTitle>
      ) : (
        children
      )}
    </Element>
  );
};

const tvTitle = tv({
  base: 'flex flex-1 items-center text-fg',
  variants: {
    level: {
      1: 'font-semibold text-lg sm:text-xl',
      2: 'font-semibold text-lg sm:text-xl',
      3: 'font-semibold text-base sm:text-lg',
      4: 'font-semibold text-base',
    },
  },
});

export const DialogHeaderTitle: React.FC<
  ComponentProps<
    typeof tvTitle,
    never,
    React.ComponentPropsWithRef<typeof AriaHeading>
  >
> = ({ className, level, ...props }) => (
  <AriaHeading
    slot='title'
    level={2}
    className={tvTitle({ className, level })}
    {...props}
  />
);

export const DialogHeaderDescription = <E extends React.ElementType = 'p'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvDialog>) => {
  const Element: React.ElementType = as ?? 'p';
  return (
    <Element
      data-slot='dialog-description'
      className={tvDialog().description({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const DialogBody = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvDialog>) => {
  const Element: React.ElementType = as ?? 'div';
  return (
    <Element
      data-slot='dialog-body'
      className={tvDialog().body({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};
export const DialogFooter = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvDialog>) => {
  const Element: React.ElementType = as ?? 'div';
  return (
    <Element
      data-slot='dialog-footer'
      className={tvDialog().footer({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const DialogCloseButton: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof Button>>
> = (props) => <Button slot='close' variant='outline' {...props} />;

export const DialogCloseIndicator: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof AriaButton>>
> = (props) => (
  <AriaButton slot='close' className={tvDialog().closeIndicator()} {...props} />
);
