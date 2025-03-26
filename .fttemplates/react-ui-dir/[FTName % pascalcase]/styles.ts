import { tv } from 'tailwind-variants';

export const _tv[FTName % pascalcase] = tv({
  slots: {
    root: ''
  },
  variants: {},
  defaultVariants: {}
});

export const tv[FTName % pascalcase] = _tv[FTName % pascalcase]();
