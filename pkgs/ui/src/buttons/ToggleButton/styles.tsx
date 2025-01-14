import { tv } from 'tailwind-variants';

export const _tvToggleButton = tv({
  slots: {
    toggleGroup: '',
    toggle: '',
  },
  variants: {
    variant: {},
  },
});

export const tvToggleButton = _tvToggleButton();
