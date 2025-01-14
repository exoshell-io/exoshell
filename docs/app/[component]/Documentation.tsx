'use client';

import { Fragment } from 'react';
import { LuTableOfContents as IconToc } from 'react-icons/lu';
import type { DocumentationSection } from './_components/_meta';
import { Title } from './ScrollableTitle';
import { Link, LinkGroup } from '@exoshell/ui';
import { useRef } from 'react';

export type DocumentationProps = {
  sections: DocumentationSection[];
};

export const Documentation: React.FC<DocumentationProps> = ({ sections }) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <>
      <div className='mx-auto max-w-[820px] grow'>
        {sections.map((section, index) => (
          <Fragment key={section.title}>
            <Title
              anchorIdRef={(ref) => {
                refs.current[index] = ref;
              }}
            >
              {section.title}
            </Title>
            {section.content}
          </Fragment>
        ))}
      </div>
      <div className='mt-[32px] h-full w-[260px]'>
        <nav className='sticky top-[92px] pl-[16px]'>
          <div className='pb-[32px] pl-[16px]'>
            <div className='flex flex-row items-center gap-[16px]'>
              <IconToc className='rotate-180' />
              Table of contents
            </div>
            <LinkGroup className='mt-[16px]' variant='mantine'>
              {sections.map((section) => {
                return (
                  <Link
                    key={section.title}
                    href={
                      '#' + section.title.toLowerCase().replace(/\s+/g, '-')
                    }
                  >
                    {section.title}
                  </Link>
                );
              })}
            </LinkGroup>
          </div>
        </nav>
      </div>
    </>
  );
};
