import type { MDXComponents } from 'mdx/types';
import { tvButton, Link } from '@exoshell/ui';
import { IconLink } from '@/_icons';

// eslint-disable-next-line @eslint-react/hooks-extra/no-useless-custom-hooks
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ className, ...props }: React.ComponentProps<'pre'>) => {
      if (className && className.includes('shiki')) {
        className = `${className} !bg-gray-100 overflow-x-scroll`;
      }
      return <pre {...props} className={className} />;
    },
    h1: ({ children, className, ...props }: React.ComponentProps<'h2'>) => {
      const id =
        typeof children === 'string'
          ? children.toLowerCase().replace(/\s+/g, '-')
          : undefined;
      return (
        <h2
          {...props}
          className={`${className} group/title relative mt-[38px] mb-[16px]`}
        >
          <div id={id} className='relative top-[-100px]' />
          <Link
            href={`${process.env['BASE_URL'] ?? ''}/`}
            className='text-[1.75rem] font-bold'
          >
            {children}
          </Link>
          <button
            type='button'
            aria-hidden='true'
            tabIndex={-1}
            className={tvButton.root({
              className:
                'absolute top-0 bottom-0 -left-6 text-gray-200 group-hover/title:text-gray-400 hover:text-blue-400',
            })}
          >
            <IconLink />
          </button>
        </h2>
      );
    },
  };
}
