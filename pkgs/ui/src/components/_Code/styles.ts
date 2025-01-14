import { tv } from 'tailwind-variants';

export const _tvCode = tv({
  slots: {
    root: '',
  },
  variants: {
    variant: {
      block: { root: 'block' },
      inline: { root: 'inline' },
    },
  },
  defaultVariants: {
    variant: 'block',
  },
});

export const tvCode = _tvCode();
