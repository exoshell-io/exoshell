import { tv } from 'tailwind-variants';

export const _tvDisclosure = tv({
  slots: {
    group:
      'data-disabled:cursor-not-allowed data-disabled:opacity-75 cursor-pointer',
    disclosure: 'peer w-full group/disclosure',
    heading: '',
    button: 'flex items-center gap-x-2 cursor-pointer',
    chevron: [
      'group-data-expanded/disclosure:rotate-90',
      'group-data-expanded/disclosure:transition',
    ],
    panel: [
      'pt-[12px]',
      'overflow-hidden',
      'text-muted-fg',
      'text-sm',
      'transition-all',
      'has-data-[slot=disclosure-group]:**:[button]:px-4',
      '**:data-[slot=disclosure-group]:border-t **:data-[slot=disclosure-group]:**:[.internal-chevron]:hidden',
    ],
  },
  variants: {
    variant: {
      shadcn: {},
      mantine: {},
    },
    isFocused: {
      true: {
        button: 'outline-hidden text-fg',
      },
    },
  },
  defaultVariants: {},
});

export const tvDisclosure = _tvDisclosure();
