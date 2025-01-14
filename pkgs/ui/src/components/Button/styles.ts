import { tv } from 'tailwind-variants';

export const _tvButton = tv({
  slots: {
    root: 'inline-flex items-center justify-center gap-x-2 outline-ring outline-offset-2 rounded cursor-pointer',
  },
  variants: {
    variant: {
      unstyled: { root: '' },
      solid: {
        root: [
          'border-transparent bg-(--button-border)',
          'before:inset-0 before:-z-10 before:bg-(--button-bg) before:shadow-sm data-disabled:before:shadow-none',
          'after:shadow-[shadow:inset_0_1px_theme(--color-white/15%)] data-pressed:after:bg-(--button-hover-overlay) data-hovered:after:bg-(--button-hover-overlay) data-disabled:after:shadow-none after:inset-0 after:-z-10',
          'dark:after:-inset-px dark:before:hidden dark:border-white/5 dark:bg-(--button-bg)',
        ],
      },
      outline: {
        root: [
          'border-border data-hovered:border-secondary-fg/10 data-pressed:border-secondary-fg/10 data-hovered:bg-secondary/90 text-secondary-fg',
          '[--button-icon:var(--color-secondary-fg)]/50 data-hovered:[--button-icon:var(--color-fg)]',
          'data-pressed:bg-secondary/90 data-pressed:[--button-icon:var(--color-secondary-fg)]',
        ],
      },
      plain: {
        root: [
          'border-transparent text-secondary-fg [--button-icon:var(--color-secondary-fg)]/50',
          'data-hovered:[--button-icon:var(--color-secondary-fg)] data-hovered:bg-secondary',
          'data-pressed:[--button-icon:var(--color-secondary-fg)] data-pressed:bg-secondary',
        ],
      },
    },
    isFocusVisible: {
      true: {
        root: 'outline',
      },
    },
  },
});

export const tvButton = _tvButton();
