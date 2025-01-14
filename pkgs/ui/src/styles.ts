import { tv } from 'tailwind-variants';

export const tvFocusRing = tv({
  variants: {
    isFocused: { true: 'ring-4 ring-ring/20 outline-hidden' },
    isFocusVisible: { true: 'ring-4 ring-ring/20 outline-hidden' },
    isInvalid: { true: 'ring-4 ring-danger/20' },
  },
});

export const tvFocusStyles = tv({
  extend: tvFocusRing,
  variants: {
    isFocused: { true: 'border-ring/70 forced-colors:border-[Highlight]' },
    isInvalid: { true: 'border-danger/70 forced-colors:border-[Mark]' },
  },
});

export const tvFocusButtonStyles = tv({
  base: 'outline outline-ring forced-colors:outline-[Highlight] outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
});
