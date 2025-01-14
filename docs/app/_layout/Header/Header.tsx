import { BrandButtonMenu } from './BrandButtonMenu';
import { NavLink } from './NavLink';

export type HeaderProps = React.ComponentPropsWithRef<'header'>;

const LINKS: { href: string; label: string }[] = [{ href: '/', label: 'Home' }];

export const Header: React.FC<Readonly<HeaderProps>> = (props) => {
  return (
    <header {...props}>
      <nav className='flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-x-6'>
          <BrandButtonMenu />
          <div
            role='separator'
            aria-orientation='vertical'
            className='bg-border h-6 w-px shrink-0 forced-colors:bg-[ButtonBorder]'
          />
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} isActive>
              {link.label}
            </NavLink>
          ))}
          <a
            className='focus-visible:text-fg text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[WindowText]'
            href='/docs/getting-started/introduction'
          >
            Docs
            <span
              className='bg-fg absolute inset-x-0 bottom-[-0.550rem] h-0.5 w-full rounded'
              style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
            ></span>
          </a>
          <a
            className='focus-visible:text-fg text-muted-fg hover:text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[Gray]'
            href='/components'
          >
            Components
          </a>
          <a
            className='focus-visible:text-fg text-muted-fg hover:text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[Gray]'
            href='/colors'
          >
            Colors
          </a>
          <a
            className='focus-visible:text-fg text-muted-fg hover:text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[Gray]'
            href='/icons'
          >
            Icons
          </a>
          <a
            className='focus-visible:text-fg text-muted-fg hover:text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[Gray]'
            href='/charts'
          >
            Charts
          </a>
          <a
            className='focus-visible:text-fg text-muted-fg hover:text-fg relative flex items-center gap-x-3 py-2 text-sm tracking-tight transition-colors focus:outline-none sm:py-3 forced-colors:text-[Gray]'
            href='/themes'
          >
            Themes
          </a>
        </div>
        <div className='flex items-center gap-x-1'>
          <button
            type='button'
            aria-label='Open command palette'
            className='outline-ring kbt32x border-border text-fg hover:bg-secondary/90 active:bg-secondary/90 [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate box-border inline-flex h-9 items-center justify-center gap-x-2 rounded-lg border px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-sm/5 font-medium no-underline outline outline-0 outline-offset-2 [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] lg:text-sm/5 dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'
            data-rac=''
            id='react-aria-:R1l6tlb:'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              className='justd-icons size-4'
              data-slot='icon'
              aria-hidden='true'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='m20.25 20.25-4.123-4.123m0 0A7.25 7.25 0 1 0 5.873 5.873a7.25 7.25 0 0 0 10.253 10.253Z'
              ></path>
            </svg>
            <span className='text-muted-fg'>Search..</span>
            <kbd
              dir='ltr'
              className='-mr-2 ml-auto hidden items-center gap-[0.25rem] px-1 lg:inline-flex'
            >
              <kbd className='group-focus:text-fg bg-bg text-fg ring-fg/10 inline-grid min-h-5 min-w-5 place-content-center rounded text-center font-sans text-[.75rem] uppercase ring-1 group-focus:opacity-60 forced-colors:group-focus:text-[HighlightText]'>
                ⌘
              </kbd>
              <kbd className='group-focus:text-fg bg-bg text-fg ring-fg/10 inline-grid min-h-5 min-w-5 place-content-center rounded text-center font-sans text-[.75rem] uppercase ring-1 group-focus:opacity-60 forced-colors:group-focus:text-[HighlightText]'>
                K
              </kbd>
            </kbd>
          </button>
          <button
            type='button'
            aria-label='Copy https://getjustd.com/installation to clipboard'
            className='outline-ring kbt32x border-border text-fg hover:bg-secondary/90 active:bg-secondary/90 [&amp;_[data-slot=icon]]:text-fg [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate box-border inline-flex size-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border font-medium no-underline outline outline-0 outline-offset-2 [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'
            data-rac=''
            id='react-aria-:R2l6tlb:'
          >
            <span
              style={{
                opacity: 1,
                willChange: 'opacity, transform',
                transform: 'none',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
                className='justd-icons size-4'
                data-slot='icon'
                aria-hidden='true'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M7.75 7.75v-3a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v10.51a1 1 0 0 1-1 1h-3M3.75 8.75v10.5a1 1 0 0 0 1 1h10.5a1 1 0 0 0 1-1V8.75a1 1 0 0 0-1-1H4.75a1 1 0 0 0-1 1'
                ></path>
              </svg>
            </span>
          </button>
          <button
            type='button'
            aria-label='Switch theme'
            className='outline-ring kbt32x border-border text-fg hover:bg-secondary/90 active:bg-secondary/90 [&amp;_[data-slot=icon]]:text-fg [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate box-border inline-flex size-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border font-medium no-underline outline outline-0 outline-offset-2 [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'
            data-rac=''
            id='react-aria5814583125-:r61:'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              className='justd-icons size-4'
              data-slot='icon'
              aria-hidden='true'
            >
              <path
                stroke='currentColor'
                strokeLinecap='square'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M8.75 17.25h-5a1 1 0 0 1-1-1V5.75a1 1 0 0 1 1-1h16.5a1 1 0 0 1 1 1v10.5a1 1 0 0 1-1 1h-5m-6.5 0v3h6.5v-3m-6.5 0h6.5'
              ></path>
            </svg>
          </button>
          <div
            role='separator'
            aria-orientation='vertical'
            className='bg-border mx-2 h-7 w-px shrink-0 forced-colors:bg-[ButtonBorder]'
          ></div>
          <a
            rel='noopener noreferrer'
            className='outline-ring kbt32x border-border text-fg hover:bg-secondary/90 active:bg-secondary/90 [&amp;_[data-slot=icon]]:text-fg [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate box-border inline-flex size-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border font-medium no-underline outline outline-0 outline-offset-2 transition-colors [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] focus:outline-none focus-visible:outline-2 disabled:cursor-default disabled:opacity-60 disabled:focus-visible:outline-0 dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'
            data-rac=''
            aria-label='Github Repository'
            href='https://github.com/justdlabs/justd'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 25'
              className='justd-icons size-4'
              data-slot='icon'
              aria-hidden='true'
            >
              <path
                fill='currentColor'
                d='M12 2.7c5.525 0 10 4.476 10 10a10.02 10.02 0 0 1-6.813 9.488c-.5.1-.687-.212-.687-.475 0-.337.012-1.412.012-2.75 0-.937-.312-1.537-.675-1.85 2.226-.25 4.563-1.1 4.563-4.937 0-1.1-.387-1.988-1.025-2.688.1-.25.45-1.275-.1-2.65 0 0-.837-.275-2.75 1.025a9.3 9.3 0 0 0-2.5-.337c-.85 0-1.7.112-2.5.337-1.913-1.287-2.75-1.025-2.75-1.025-.55 1.375-.2 2.4-.1 2.65-.638.7-1.025 1.6-1.025 2.688 0 3.825 2.325 4.687 4.55 4.937-.287.25-.55.688-.637 1.338-.575.262-2.013.687-2.913-.825-.188-.3-.75-1.038-1.538-1.025-.837.012-.337.475.013.662.425.238.912 1.125 1.025 1.413.2.562.85 1.637 3.362 1.175 0 .837.013 1.625.013 1.862 0 .263-.188.563-.688.475A9.99 9.99 0 0 1 2 12.701c0-5.525 4.475-10 10-10Z'
              ></path>
            </svg>
          </a>
          <a
            rel='noopener noreferrer'
            className='outline-ring kbt32x border-border text-fg hover:bg-secondary/90 active:bg-secondary/90 [&amp;_[data-slot=icon]]:text-fg [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-icon:theme(colors.muted.fg)] hover:[--button-icon:theme(colors.fg)] active:[--button-icon:theme(colors.fg)] relative isolate box-border inline-flex size-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border font-medium no-underline outline outline-0 outline-offset-2 transition-colors [--button-hover-overlay:theme(colors.white/10%)] before:absolute before:rounded-[calc(theme(borderRadius.lg)-1px)] after:absolute after:rounded-[calc(theme(borderRadius.lg)-1px)] focus:outline-none focus-visible:outline-2 disabled:cursor-default disabled:opacity-60 disabled:focus-visible:outline-0 dark:after:rounded-lg forced-colors:outline-[Highlight] forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText] forced-colors:disabled:text-[GrayText] [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-1 [&amp;>[data-slot=icon]]:size-4 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--button-icon]'
            data-rac=''
            aria-label='Follow Update on X'
            href='https://x.com/intent/follow?screen_name=irsyadadl'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 25'
              className='justd-icons size-4'
              data-slot='icon'
              aria-hidden='true'
            >
              <path
                fill='currentColor'
                d='M17.403 4.25h2.882l-6.296 7.201 7.407 9.799h-5.8l-4.542-5.943-5.198 5.943H2.973l6.734-7.702L2.602 4.25h5.946l4.106 5.432 4.75-5.432Zm-1.011 15.274h1.597L7.68 5.885H5.967z'
              ></path>
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
};
