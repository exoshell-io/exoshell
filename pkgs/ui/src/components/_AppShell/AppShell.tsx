'use client';

import { type PolymorphicComponentProps } from '../..';
// import { Allotment } from 'allotment';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import 'allotment/dist/style.css';
import { isValidElement } from 'react';
import { tv } from 'tailwind-variants';

export {
  AppShellRightBar as RightBar,
  AppShellFooter as Footer,
  AppShellHeader as Header,
  AppShellMain as Main,
  AppShellLeftBar as LeftBar,
  AppShell as Root,
};

export const tvAppShell = tv({
  slots: {
    root: 'h-dvh',
    header: 'h-(--app-shell-header-height)',
    content: 'h-(--app-shell-content-height) w-full',
    navbar: 'h-full max-h-full overflow-scroll',
    main: 'w-full min-h-full',
    aside: 'h-full max-h-full overflow-scroll',
    footer: 'h-(--app-shell-footer-height)',
  },
});

export const AppShell = <E extends React.ElementType = 'div'>({
  as,
  children,
  className,
  Header,
  Navbar,
  Aside,
  Footer,
  ...props
}: PolymorphicComponentProps<
  E,
  typeof tvAppShell,
  never,
  {
    Header?: React.ReactNode;
    Navbar?: React.ReactNode;
    Aside?: React.ReactNode;
    Footer?: React.ReactNode;
  }
>) => {
  const Element: React.ElementType = as ?? 'div';
  let headerHeight: string | undefined = undefined;
  let footerHeight: string | undefined = undefined;
  if (isValidElement(Header)) {
    console.log('HEADER IS VALID');
    const props = Header.props as React.ComponentPropsWithoutRef<
      typeof AppShellHeader
    >;
    headerHeight = props['height'] as string;
  }
  if (isValidElement(Footer)) {
    const props = Footer.props as React.ComponentPropsWithoutRef<
      typeof AppShellFooter
    >;
    footerHeight = props['height'] as string;
  }
  return (
    <Element
      style={{
        '--app-shell-header-height': headerHeight,
        '--app-shell-content-height':
          'calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))',
        '--app-shell-footer-height': footerHeight,
      }}
      className={tvAppShell().root({ className })}
      {...props}
    >
      {Header}
      <div className='h-(--app-shell-content-height)'>
        <PanelGroup direction='horizontal'>
          {Navbar !== undefined && <Panel id='left-bar'>{Navbar}</Panel>}
          <PanelResizeHandle />
          <Panel id='content'>{children}</Panel>
          {Aside !== undefined && <Panel id='right-bar'>{Aside}</Panel>}
        </PanelGroup>
      </div>
      {/* <Allotment vertical={false} className={tvAppShell().content()}>
        {Navbar !== undefined && <Allotment.Pane>{Navbar}</Allotment.Pane>}
        <Allotment.Pane>{children}</Allotment.Pane>
        {Aside !== undefined && <Allotment.Pane>{Aside}</Allotment.Pane>}
      </Allotment> */}
      {Footer}
    </Element>
  );
};

export const AppShellHeader = <E extends React.ElementType = 'header'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<
  E,
  typeof tvAppShell,
  never,
  { height: string }
>) => {
  const Element: React.ElementType = as ?? 'header';
  return (
    <Element className={tvAppShell().header({ className })} {...props}>
      {children}
    </Element>
  );
};

export const AppShellLeftBar = <E extends React.ElementType = 'nav'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvAppShell>) => {
  const Element: React.ElementType = as ?? 'nav';
  return (
    <Element className={tvAppShell().navbar({ className })} {...props}>
      {children}
    </Element>
  );
};

export const AppShellMain = <E extends React.ElementType = 'main'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvAppShell>) => {
  const Element: React.ElementType = as ?? 'main';
  return (
    <Element className={tvAppShell().main({ className })} {...props}>
      {children}
    </Element>
  );
};

export const AppShellRightBar = <E extends React.ElementType = 'aside'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<E, typeof tvAppShell>) => {
  const Element: React.ElementType = as ?? 'aside';
  return (
    <Element className={tvAppShell().aside({ className })} {...props}>
      {children}
    </Element>
  );
};

export const AppShellFooter = <E extends React.ElementType = 'footer'>({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<
  E,
  typeof tvAppShell,
  never,
  { height: string }
>) => {
  const Element: React.ElementType = as ?? 'footer';
  return (
    <Element className={tvAppShell().footer({ className })} {...props}>
      {children}
    </Element>
  );
};
