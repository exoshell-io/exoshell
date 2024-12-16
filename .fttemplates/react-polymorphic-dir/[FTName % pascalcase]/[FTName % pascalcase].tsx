import { tv } from 'tailwind-variants';
import { type PolymorphicComponentProps } from '@/PolymorphicComponentProps';

export const [FTName % camelcase] = tv({
  base: '',
  variants: {},
  defaultVariants: {}
});

export type [FTName % pascalcase]Props<E extends React.ElementType> =
  PolymorphicComponentProps<E, typeof [FTName % camelcase]>;

export const [FTName % pascalcase] = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: [FTName % pascalcase]Props<E>) => {
  const Element: React.ElementType = as ?? 'div';
  return (
    <Element className={[FTName % camelcase]({ className })} {...props}>
      {children}
    </Element>
  );
}
