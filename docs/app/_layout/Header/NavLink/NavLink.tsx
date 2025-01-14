'use client';

import { Link } from 'react-aria-components';

export type NavLinkProps = React.ComponentPropsWithRef<typeof Link> & {
  isActive: boolean;
};

export const NavLink: React.FC<Readonly<NavLinkProps>> = ({
  children,
  // isActive,
  ...props
}) => {
  return (
    <Link {...props}>
      {children}
      {/* {isActive && (
        <span
          className='bg-fg absolute inset-x-0 bottom-[-0.550rem] h-0.5 w-full rounded'
          style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
        />
      )} */}
    </Link>
  );
};
