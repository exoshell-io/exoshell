import { tv } from 'tailwind-variants';

// =============================================================================
// #region Styles
export const _tvTextInput = tv({
  slots: {
    root: 'flex flex-col',
    label: 'font-medium',
    description: 'text-gray-400',
    input: 'border border-gray-300 min-h-[36px] px-[12px]',
    error: 'mt-[5px] text-xs',
  },
  variants: {
    size: {
      xs: { root: 'text-xs', description: 'text-xs', input: 'leading-[28px]' },
      sm: { root: 'text-sm', description: 'text-xs', input: 'leading-[34px]' },
      md: { root: 'text-md', description: 'text-sm', input: 'leading-[40px]' },
      lg: { root: 'text-lg', description: 'text-md', input: 'leading-[48px]' },
    },
    radius: {
      xxs: { root: '', input: 'rounded-[1px]' },
      xs: { root: '', input: 'rounded-xs' },
      sm: { root: '', input: 'rounded-sm' },
      lg: { root: '', input: 'rounded-md' },
    },
    hasDescription: {
      true: { input: 'mt-[5px]' },
    },
    isInvalid: {
      true: {
        input: 'border-red-500 text-red-500 outline-red-500',
        error: 'text-red-500',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    radius: 'xs',
  },
});

export const tvTextInput = _tvTextInput();
// #endregion
