import { tv } from 'tailwind-variants';
import { type PolymorphicComponentProps } from '@exoshell/ui';

export const tv[FTName % pascalcase] = tv({
  base: '',
  variants: {},
  defaultVariants: {}
});

export type [FTName % pascalcase]Props<E extends React.ElementType> =
  PolymorphicComponentProps<E, typeof tv[FTName % pascalcase]> & Readonly<{}>;

export const [FTName % pascalcase] = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: [FTName % pascalcase]Props<E>) => {
  const Element: React.ElementType = as ?? 'div';
  return (
    <Element className={tv[FTName % pascalcase]({ className })} {...props}>
      {children}
    </Element>
  );
}
