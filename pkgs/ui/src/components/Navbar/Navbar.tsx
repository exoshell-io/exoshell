import { tv } from 'tailwind-variants';
import { type PolymorphicComponentProps } from '../..';

export const tvNavbar = tv({
  base: 'relative @container isolate flex w-full flex-col',
  variants: {
    intent: {
      floating: 'pt-2 px-2.5',
      navbar: '',
      inset: 'bg-bg min-h-svh',
    },
  },
  defaultVariants: {
    intent: 'navbar',
  },
});

export type NavbarProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, typeof tvNavbar> & Readonly<{}>;

export const Navbar = <E extends React.ElementType = 'header'>({
  as,
  children,
  className,
  intent,
  ...props
}: NavbarProps<E>) => {
  const Element: React.ElementType = as ?? 'header';
  return (
    <Element className={tvNavbar({ className, intent })} {...props}>
      {children}
    </Element>
  );
};
