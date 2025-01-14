'use client';

import { Breadcrumb, Button, DemoShell } from '@exoshell/ui';
import { useHover } from '@mantine/hooks';
import { useMemo } from 'react';

export const Styles: React.FC = () => {
  const { hovered: isRootHovered, ref: refRoot } = useHover();

  return (
    <DemoShell
      main={
        <Button
          classes={{
            root: 'data-outline-root:outline-2  outline-green-500 group',
          }}
          data-outline-root={isRootHovered ? true : undefined}
        >
          {useMemo(
            () =>
              ['Home', 'Docs', 'Breadcrumbs'].map((item) => (
                <Breadcrumb key={item}>{item}</Breadcrumb>
              )),
            [],
          )}
        </Button>
      }
      sidebar={
        <div className='flex flex-col justify-center'>
          {(
            [[refRoot, 'root', 'Root element']] satisfies [
              React.RefObject<unknown>,
              string,
              string,
            ][]
          ).map(([ref, label, description]) => (
            <div
              key={label}
              className='px-[12px] py-[6px] hover:bg-gray-100'
              ref={ref}
            >
              <p className='font-bold'>{label}</p>
              <p className='text-sm'>{description}</p>
            </div>
          ))}
        </div>
      }
    />
  );
};
