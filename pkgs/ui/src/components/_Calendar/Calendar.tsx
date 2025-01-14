'use client';

import {
  Button,
  IconChevronLeft,
  IconChevronRight,
  type ComponentProps,
} from '../..';
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  Heading as AriaHeading,
  Text as AriaText,
  useLocale,
  type DateValue,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { tvFocusRing } from '../../styles';

export const tvCalendar = tv({
  base: 'max-w-[17.5rem] sm:max-w-[15.8rem]',
  slots: {
    grid: '[&_td]:border-collapse [&_td]:px-0',
    gridHeader: 'text-sm lg:text-xs font-semibold text-muted-fg',
    errorMessage: 'text-sm text-red-600',
  },
});

export const tvCalendarCell = tv({
  extend: tvFocusRing,
  base: 'flex size-10 sm:size-9 cursor-default tabular-nums items-center justify-center rounded-lg sm:text-sm forced-colors:outline-0',
  variants: {
    isSelected: {
      false:
        'text-fg forced-colors:text-[ButtonText] data-hovered:bg-secondary-fg/15 data-pressed:bg-secondary-fg/20',
      true: 'bg-primary text-primary-fg data-invalid:bg-danger data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]',
    },
    isDisabled: {
      true: 'text-muted-fg/70 forced-colors:text-[GrayText]',
    },
  },
});

export type CalendarProps<T extends DateValue> = ComponentProps<
  typeof tvCalendar
> &
  Readonly<
    Omit<React.ComponentPropsWithRef<typeof AriaCalendar<T>>, 'children'>
  >;

/**
 * @see https://react-spectrum.adobe.com/react-aria/Calendar.html
 */
export const Calendar = <T extends DateValue>({
  className,
  ...props
}: CalendarProps<T>) => {
  const tvClassNames = tvCalendar();
  return (
    <AriaCalendar className={tvClassNames.base({ className })} {...props}>
      <CalendarHeader />
      <AriaCalendarGrid className={tvClassNames.grid()}>
        <AriaCalendarGridHeader>
          {(day) => (
            <AriaCalendarHeaderCell className={tvClassNames.gridHeader()}>
              {day}
            </AriaCalendarHeaderCell>
          )}
        </AriaCalendarGridHeader>
        <AriaCalendarGridBody>
          {(date) => (
            <AriaCalendarCell date={date} className={tvCalendarCell} />
          )}
        </AriaCalendarGridBody>
      </AriaCalendarGrid>
      <AriaText slot='errorMessage' className={tvClassNames.errorMessage()} />
    </AriaCalendar>
  );
};

const tvCalendarHeader = tv({
  base: 'flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4',
  slots: {
    heading: 'mr-2 text-muted-fg sm:text-sm flex-1 text-left font-medium',
    buttonsGroup: 'flex gap-1 items-center',
    button: 'size-8 **:data-[slot=icon]:text-fg sm:size-7',
  },
});

export type CalendarHeaderProps = ComponentProps<typeof tvCalendarHeader> &
  Readonly<Omit<React.ComponentPropsWithRef<'header'>, 'children'>>;

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  className,
  ...props
}) => {
  const tvClassNames = tvCalendarHeader();
  const { direction } = useLocale();

  return (
    <header className={tvClassNames.base({ className })} {...props}>
      <AriaHeading className={tvClassNames.heading()} />
      <div className={tvClassNames.buttonsGroup()}>
        <Button
          slot='previous'
          className={tvClassNames.button()}
          variant='plain'
        >
          {direction === 'rtl' ? <IconChevronRight /> : <IconChevronLeft />}
        </Button>
        <Button
          slot='previous'
          className={tvClassNames.button()}
          variant='plain'
        >
          {direction === 'rtl' ? <IconChevronLeft /> : <IconChevronRight />}
        </Button>
      </div>
    </header>
  );
};
