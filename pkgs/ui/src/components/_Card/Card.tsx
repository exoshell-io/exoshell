'use client';

import { tv } from 'tailwind-variants';
import { type PolymorphicComponentProps } from '../..';
import { Heading as AriaHeading } from 'react-aria-components';

export const tvCard = tv({
  slots: {
    root: [
      'rounded-lg bg-bg has-[table]:**:data-[slot=card-footer]:border-t **:data-[slot=table-header]:bg-muted/50 has-[table]:overflow-hidden border text-fg shadow-xs **:[table]:overflow-hidden',
    ],
    header: 'flex flex-col gap-y-1 px-6 py-5',
    title: 'sm:leading-6 leading-none font-semibold tracking-tight',
    description: 'text-muted-fg text-sm',
    main: 'px-6 pb-6 has-[[data-slot=table-header]]:bg-muted/40 has-[table]:p-0 [&:has(table)+[data-slot=card-footer]]:py-5 has-[table]:border-t **:data-[slot=table-cell]:px-6 **:data-[slot=table-column]:px-6',
    footer: 'flex items-center p-6 pt-0',
  },
});

export const Card = <E extends React.ElementType = 'article'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard>) => {
  const Element: React.ElementType = as ?? 'article';
  const tvClassNames = tvCard();
  return (
    <Element
      data-slot='card'
      className={tvClassNames.root({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const CardHeader = <E extends React.ElementType = 'header'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard> &
  Readonly<{
    title?: string;
    description?: string;
  }>) => {
  const Element: React.ElementType = as ?? 'header';
  const tvClassNames = tvCard({ className });
  return (
    <Element
      data-slot='card-header'
      className={tvClassNames.header()}
      {...props}
    >
      {children}
    </Element>
  );
};

export const CardTitle = <E extends React.ElementType = typeof AriaHeading>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard>) => {
  const Element: React.ElementType = as ?? AriaHeading;
  const tvClassNames = tvCard();
  return (
    <Element
      data-slot='card-title'
      className={tvClassNames.title({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const CardDescription = <E extends React.ElementType = 'p'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard>) => {
  const Element: React.ElementType = as ?? 'p';
  const tvClassNames = tvCard();
  return (
    <Element
      data-slot='card-description'
      className={tvClassNames.description({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const CardMain = <E extends React.ElementType = 'main'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard>) => {
  const Element: React.ElementType = as ?? 'main';
  const tvClassNames = tvCard();
  return (
    <Element
      data-slot='card-content'
      className={tvClassNames.main({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};

export const CardFooter = <E extends React.ElementType = 'footer'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvCard>) => {
  const Element: React.ElementType = as ?? 'footer';
  const tvClassNames = tvCard();
  return (
    <Element
      data-slot='card-footer'
      className={tvClassNames.footer({ className })}
      {...props}
    >
      {children}
    </Element>
  );
};
