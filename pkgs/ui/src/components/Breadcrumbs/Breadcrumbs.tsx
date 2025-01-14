'use client';

import { createContext, useContext } from 'react';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
} from 'react-aria-components';
import { type ClassNameValue } from 'tailwind-merge';
import {
  type ComponentsProps,
  IconChevronRight,
  Link,
  type SlotComponentProps,
} from '../..';
import { _tvBreadcrumbs, tvBreadcrumbs } from './styles';
import { mergeProps } from 'react-aria';

// =============================================================================
// #region BreadcrumbsContext

export type BreadcrumbsContextType = SlotComponentProps<
  typeof _tvBreadcrumbs,
  keyof (typeof _tvBreadcrumbs)['slots']
> & {
  /** Customize CSS classes for each components */
  classes?: {
    [key in keyof (typeof _tvBreadcrumbs)['slots']]?: ClassNameValue;
  };
} & BreadcrumbContextType;

export type BreadcrumbContextType = {
  /** Include separators (defaults to `true`) */
  withSeparators?: boolean;
  /** Customize separator */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  separator?: 'chevron' | React.ReactNode;
};

export const BreadcrumbsContext = createContext<BreadcrumbsContextType>({});

export const useBreadcrumbsContext = (
  ...contexts: BreadcrumbsContextType[]
): BreadcrumbsContextType | undefined => {
  return mergeProps(useContext(BreadcrumbsContext), ...contexts);
};

// #endregion

// =============================================================================
// #region Breadcrumbs

export type BreadcrumbsProps = BreadcrumbsContextType &
  React.ComponentPropsWithRef<typeof AriaBreadcrumbs>;

/** @see https://react-spectrum.adobe.com/react-aria/Breadcrumbs.html */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  className,
  ...props
}) => {
  const ctx = useBreadcrumbsContext(props);
  return (
    <BreadcrumbsContext value={{ ...ctx }}>
      <AriaBreadcrumbs
        className={tvBreadcrumbs.root({
          className: [ctx?.classes?.root, className],
          ...ctx,
        })}
        {...props}
      >
        {children}
      </AriaBreadcrumbs>
    </BreadcrumbsContext>
  );
};

// #endregion

// =============================================================================
// #region Breadcrumb

export type BreadcrumbProps = SlotComponentProps<
  typeof _tvBreadcrumbs,
  'breadcrumb' | 'link' | 'separator',
  React.ComponentPropsWithRef<typeof Link> &
    BreadcrumbContextType & {
      breadcrumbProps?: ComponentsProps<typeof AriaBreadcrumb>;
      separatorProps?: ComponentsProps<'span'>;
    }
>;

const defaultBreadcrumbProps: BreadcrumbProps['breadcrumbProps'] = {};
const defaultSeparatorProps: BreadcrumbProps['separatorProps'] = {};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  className,
  breadcrumbProps: {
    className: breadcrumbClassName,
    ...breadcrumbProps
  } = defaultBreadcrumbProps,
  separatorProps: {
    className: separatorClassName,
    ...separatorProps
  } = defaultSeparatorProps,
  ...props
}) => {
  const ctx = useBreadcrumbsContext(props);
  return (
    <AriaBreadcrumb
      className={(renderProps) => {
        if (typeof breadcrumbClassName === 'function') {
          breadcrumbClassName = breadcrumbClassName(renderProps);
        }
        return tvBreadcrumbs.breadcrumb({
          className: [ctx?.classes?.breadcrumb, breadcrumbClassName],
          ...ctx,
          ...renderProps,
        });
      }}
      {...breadcrumbProps}
    >
      {(renderProps) => (
        <>
          <Link
            className={(renderProps) => {
              if (typeof className === 'function') {
                className = className(renderProps);
              }
              return tvBreadcrumbs.link({
                className: [ctx?.classes?.link, className],
                ...ctx,
                ...renderProps,
              });
            }}
            {...props}
          >
            {children}
          </Link>
          {!renderProps.isCurrent && (ctx?.withSeparators ?? true) && (
            <span
              aria-hidden
              className={tvBreadcrumbs.separator({
                className: [ctx?.classes?.separator, separatorClassName],
                ...ctx,
              })}
              {...separatorProps}
            >
              {ctx?.separator === undefined || ctx.separator === 'chevron' ? (
                <IconChevronRight />
              ) : (
                ctx.separator
              )}
            </span>
          )}
        </>
      )}
    </AriaBreadcrumb>
  );
};

// #endregion
