'use client';

import { IconExoshell } from '@/_icons';
import { Button } from 'react-aria-components';

export interface BrandButtonMenuProps {}

export const BrandButtonMenu: React.FC<Readonly<BrandButtonMenuProps>> = () => {
  return (
    <>
      <Button className='outline-ring text-fg pressed:bg-secondary/90 active:bg-secondary/90 hover:bg-secondary/90 group [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate -ml-1 box-border inline-flex h-10 items-center justify-center gap-x-2 rounded-lg border border-transparent px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.2)-1px)] text-base font-medium no-underline outline-offset-2 [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] lg:text-sm/6 dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'>
        <span className='flex items-center gap-x-2'>
          <IconExoshell />
          <span className='font-mono text-base tracking-tight sm:text-sm'>
            Exoshell UI
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            className='justd-icons text-muted-fg group-hover:text-fg group-pressed:rotate-180 group-pressed:text-fg -mr-1 ml-3 size-3.5 transition duration-300'
            data-slot='icon'
            aria-hidden='true'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m20 9-8 8-8-8'
            ></path>
          </svg>
          <span className='sr-only'>Open menu</span>
        </span>
      </Button>
    </>
  );
};
