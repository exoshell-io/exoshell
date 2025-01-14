import { tv } from 'tailwind-variants';

export const _tvLink = tv({
  slots: {
    link: 'content-center',

    /** Slots used in {@link LinkGroup} */
    group: '',
    groupLabel: '',
  },
  variants: {
    variant: {
      default: {
        link: '',
      },
      mantine: {
        link: [
          '[:where(*[data-group-link])>ul>li>&]:border-l',
          'pl-[23px]',
          'leading-[34px] block',
        ],
        group: '',
        groupLabel: [
          'pl-[23px] border-l bg-gray-50 border-l-gray-200 flex flex-row items-center leading-[34px] h-[34px]',
        ],
      },
    },
    isActive: {
      true: {
        link: '',
      },
    },
  },
  compoundVariants: [{ isActive: true, variant: 'mantine', link: 'text-blue' }],
  defaultVariants: {
    variant: 'default',
  },
});

export const tvLink = _tvLink();
