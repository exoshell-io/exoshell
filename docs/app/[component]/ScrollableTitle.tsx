import { useMemo } from 'react';
import { Link, tvButton } from '@exoshell/ui';
import { IconLink } from '@/_icons';

export type TitleProps = React.ComponentPropsWithRef<'div'> & {
  anchorIdRef?: React.Ref<HTMLDivElement>;
};

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  id,
  anchorIdRef,
  ...props
}) => {
  const _id = useMemo(
    () =>
      id !== undefined
        ? id
        : typeof children === 'string'
          ? children.toLowerCase().replace(/\s+/g, '-')
          : undefined,
    [id, children],
  );
  return (
    <h2
      {...props}
      className={`${className} group/title relative mt-[38px] mb-[16px]`}
    >
      {/* Offset title anchor for scrolling */}
      <div ref={anchorIdRef} id={_id} className='relative top-[-100px]' />
      <Link
        href={`${process.env['BASE_URL'] ?? ''}#${_id}`}
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
};
