'use client';

import { type SlotComponentProps } from '../..';
import {
  OverlayArrow as AriaOverlayArrow,
  Tooltip as AriaTooltip,
  type TooltipProps as AriaTooltipProps,
  TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

// =============================================================================
// #region Styles
export const _tvTooltip = tv({
  slots: {
    root: 'group rounded-lg [&_strong]:font-medium border px-2.5 py-1.5 text-sm will-change-transform dark:shadow-none',
    arrow: '',
  },
  variants: {
    intent: {
      default: {
        root: 'bg-overlay text-overlay-fg [&_.arx]:fill-overlay [&_.arx]:stroke-border',
      },
      inverse: {
        root: 'border-transparent bg-fg text-bg dark:[&_.text-muted-fg]:text-fg/70 [&_.text-muted-fg]:text-bg/70 dark:[&_.arx]:fill-white [&_.arx]:fill-fg [&_.arx]:stroke-transparent',
      },
    },
    isEntering: {
      true: {
        root: [
          'animate-in fade-in',
          'data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1 data-[placement=bottom]:slide-in-from-top-1',
        ],
      },
    },
    isExiting: {
      true: {
        root: [
          'animate-in fade-in direction-reverse',
          'data-[placement=left]:slide-out-to-right-1 data-[placement=right]:slide-out-to-left-1 data-[placement=top]:slide-out-to-bottom-1 data-[placement=bottom]:slide-out-to-top-1',
        ],
      },
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

export const tvTooltip = _tvTooltip();
// #endregion

// =============================================================================
// #region Tooltip
type AriaTooltipTriggerProps = React.ComponentPropsWithRef<
  typeof AriaTooltipTrigger
>;

export type TooltipProps = SlotComponentProps<
  typeof _tvTooltip,
  'root',
  AriaTooltipTriggerProps &
    Pick<
      AriaTooltipProps,
      | 'className'
      | 'style'
      | 'placement'
      | 'containerPadding'
      | 'offset'
      | 'crossOffset'
      | 'shouldFlip'
      | 'arrowBoundaryOffset'
      | 'defaultOpen'
    > & {
      tooltip: AriaTooltipProps['children'];
    }
>;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  tooltip,
  ...props
}) => {
  return (
    <AriaTooltipTrigger delay={0} {...props}>
      {children}
      <AriaTooltip
        className={(renderProps) => {
          if (typeof className === 'function') {
            className = className(renderProps);
          }
          return tvTooltip.root({ className, ...props, ...renderProps });
        }}
      >
        {(renderProps) => {
          return (
            <AriaOverlayArrow>
              <svg width={8} height={8} viewBox='0 0 8 8'>
                <path d='M0 0 L4 4 L8 0' />
              </svg>
              {typeof tooltip === 'function' ? tooltip(renderProps) : tooltip}
            </AriaOverlayArrow>
          );
        }}
      </AriaTooltip>
    </AriaTooltipTrigger>
  );
};
// #endregion
