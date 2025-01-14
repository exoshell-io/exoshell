'use client';

import { DemoShell, Breadcrumbs, Breadcrumb } from '@exoshell/ui';
import { useHover } from '@mantine/hooks';
import { useMemo } from 'react';

export const Styles: React.FC = () => {
  const { hovered: isRootHovered, ref: refRoot } = useHover();
  const { hovered: isBreadcrumbHovered, ref: refBreadcrumb } = useHover();
  const { hovered: isLinkHovered, ref: refLink } = useHover();
  const { hovered: isSeparatorHovered, ref: refSeparator } = useHover();

  return (
    <DemoShell
      main={
        <Breadcrumbs
          classes={{
            root: 'data-outline-root:outline-2  outline-green-500 group',
            breadcrumb:
              'group-data-outline-breadcrumb:outline-2 group-data-outline-breadcrumb:outline-green-500',
            link: 'group-data-outline-link:outline-2 group-data-outline-link:outline-green-500',
            separator:
              'group-data-outline-separator:outline-2 group-data-outline-separator:outline-green-500',
          }}
          data-outline-root={isRootHovered ? true : undefined}
          data-outline-breadcrumb={isBreadcrumbHovered ? true : undefined}
          data-outline-link={isLinkHovered ? true : undefined}
          data-outline-separator={isSeparatorHovered ? true : undefined}
        >
          {useMemo(
            () =>
              ['Home', 'Docs', 'Breadcrumbs'].map((item) => (
                <Breadcrumb key={item}>{item}</Breadcrumb>
              )),
            [],
          )}
        </Breadcrumbs>
      }
      sidebar={
        <div className='flex flex-col justify-center'>
          {(
            [
              [refRoot, 'root', 'Root element'],
              [refBreadcrumb, 'breadcrumb', 'Breadcrumb element'],
              [refLink, 'link', 'Link element'],
              [refSeparator, 'separator', 'Separator element'],
            ] satisfies [React.RefObject<unknown>, string, string][]
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
