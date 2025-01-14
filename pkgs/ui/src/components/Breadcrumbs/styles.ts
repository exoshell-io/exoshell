import { tv } from 'tailwind-variants';

export const _tvBreadcrumbs = tv({
  slots: {
    root: '',
    breadcrumb: '',
    separator: '',
    link: '',
  },
  variants: {
    variant: {
      default: {
        root: ['flex items-center gap-2'],
        breadcrumb: ['flex flex-row items-center gap-2 text-sm'],
        separator: [''],
        link: ['not-data-current:hover:underline'],
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const tvBreadcrumbs = _tvBreadcrumbs();
