import { tv } from 'tailwind-variants';

export const _tvDemoShell = tv({
  slots: {
    root: '',
  },
  variants: {
    variant: {
      mantine: {
        root: 'overflow-auto rounded border border-gray-200',
      },
    },
  },
  defaultVariants: {
    variant: 'mantine',
  },
});

export const tvDemoShell = _tvDemoShell();
