'use client';

import {
  Dialog,
  DialogTrigger,
  OverlayArrow,
  Popover,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Button, type ComponentProps } from '../..';

export { DialogTrigger as Popover } from 'react-aria-components';

export const tvPopover = tv({
  base: '',
  variants: {},
  defaultVariants: {},
});

export type PopoverProps = ComponentProps<typeof tvPopover> &
  Readonly<React.PropsWithChildren>;

export const PopoverContent: React.FC<PopoverProps> = ({ children }) => {
  return (
    <DialogTrigger>
      <Button>Settings</Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox='0 0 12 12'>
            <path d='M0 0 L6 6 L12 0' />
          </svg>
        </OverlayArrow>
        <Dialog>{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
};
