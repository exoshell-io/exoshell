'use client';

import { emptyObject, type SlotComponentProps } from '../..';
import { Link as AriaLink } from 'react-aria-components';
import React, { createContext, useContext, useMemo } from 'react';
import { _tvLink, tvLink } from './styles';
import type { VariantProps } from 'tailwind-variants';
import { mergeProps } from 'react-aria';

// =============================================================================
// #region LinkContext
export type LinkContextType = VariantProps<typeof _tvLink>;

export const LinkContext = createContext<LinkContextType>({});

export const useLinkContext = (
  ...contexts: LinkContextType[]
): LinkContextType | undefined => {
  return mergeProps(useContext(LinkContext), ...contexts);
};
// #endregion

// =============================================================================
// #region LinkGroup
export type LinkGroupProps = SlotComponentProps<
  typeof _tvLink,
  'group',
  Omit<React.ComponentPropsWithRef<'div'>, 'children'> & {
    beforeChildren?: React.ReactNode;
    children?: Iterable<React.ReactElement>;
    afterChildren?: React.ReactNode;
    label?: React.ReactNode;
    labelProps?: Omit<React.ComponentPropsWithRef<'p'>, 'children'>;
  }
>;

export const LinkGroup: React.FC<LinkGroupProps> = ({
  beforeChildren,
  children,
  afterChildren,
  className,
  label,
  labelProps: {
    className: labelClassName,
    ...labelProps
  } = emptyObject as NonNullable<LinkGroupProps['labelProps']>,
  ...props
}) => {
  const ctx = useLinkContext(props);
  const links = useMemo((): React.ReactNode => {
    if (!children) {
      return null;
    }
    const acc = [];
    for (const child of children) {
      acc.push(<li key={crypto.randomUUID()}>{child}</li>);
    }
    return <ul>{acc}</ul>;
  }, [children]);

  return (
    <LinkContext value={{ ...ctx }}>
      <div
        data-group-link
        className={tvLink.group({ className, ...ctx })}
        {...props}
      >
        {beforeChildren !== undefined && beforeChildren}
        {label !== undefined && (
          <h3
            className={tvLink.groupLabel({
              className: labelClassName,
              ...ctx,
              ...labelProps,
            })}
          >
            {label}
          </h3>
        )}
        {links}
        {afterChildren !== undefined && afterChildren}
      </div>
    </LinkContext>
  );
};

// #endregion

// =============================================================================
// #region Link
export type LinkProps = SlotComponentProps<
  typeof _tvLink,
  'link',
  React.ComponentPropsWithRef<typeof AriaLink>
>;

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  ...props
}) => {
  const ctx = useLinkContext(props);
  return (
    <AriaLink
      className={(renderProps) => {
        if (typeof className === 'function') {
          className = className(renderProps);
        }
        return tvLink.link({ className, ...ctx, ...renderProps });
      }}
      {...props}
    >
      {children}
    </AriaLink>
  );
};
// #endregion
