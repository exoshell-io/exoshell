import { tv } from 'tailwind-variants';

export const _tvTable = tv({
  slots: {
    root: '',
    header: '',
    column: '',
    body: '',
    row: '',
    footer: '',
    cell: '',
    caption: '',
  },
  variants: {
    variant: {
      shadcn: {
        root: 'caption-bottom text-sm',
        header: '[&_tr]:border-b',
        column:
          'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        body: '',
        row: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted last:border-0',
        footer:
          'border-t bg-muted/50 font-medium last:border-0 transition-colors',
        cell: 'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        caption: 'mt-4 text-sm text-muted-foreground',
      },
      mantine: {
        root: '',
        header: '',
        column: '',
        body: '',
        row: '',
        footer: '',
        cell: '',
        caption: '',
      },
    },
    caption: {
      top: { root: 'caption-top' },
      bottom: { root: 'caption-bottom' },
    },
  },
  defaultVariants: {
    variant: 'shadcn',
  },
});

export const tvTable = _tvTable();
