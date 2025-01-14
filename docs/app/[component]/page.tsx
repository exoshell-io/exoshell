import {
  Button,
  Code,
  IconEdit,
  IconGithub,
  IconNpm,
  Link,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Tooltip,
} from '@exoshell/ui';
import { readdir } from 'node:fs/promises';
import type { Meta } from './_components/_meta';
import { Props } from './Props';
import { Documentation } from './Documentation';

export type StaticParam = { component: string };

export async function generateStaticParams() {
  const staticParams: StaticParam[] = [];
  const files = await readdir('./app/[component]/_components/', {
    withFileTypes: true,
  });
  for (const file of files) {
    if (!file.isDirectory() || file.name.startsWith('_')) {
      continue;
    }
    staticParams.push({ component: file.name });
  }
  return staticParams;
}

export const dynamicParams = false;

export default async function Page({
  params,
}: Readonly<{
  params: Promise<StaticParam>;
}>) {
  const component = (await params).component;
  const {
    meta: { Styles, ...meta },
  } = (await import(`./_components/${component}/index.tsx`)) as { meta: Meta };
  return (
    <>
      <header className='mx-auto max-w-[min(1080px,100%)] pt-[32px] pb-[48px]'>
        <div className=''>
          <h1 className='pb-[15px] text-5xl font-extrabold capitalize'>
            {meta.name}
          </h1>
          {meta.description && (
            <p className='pb-[32px] text-[18px] text-gray-500'>
              {meta.description}
            </p>
          )}
          <div className='flex flex-col gap-y-[10px]'>
            {meta.import && (
              <HeaderItem label='Import'>
                <Tooltip tooltip='Copy to clipboard'>
                  <Button variant='unstyled' className='text-[13px]'>
                    <Code code={meta.import} className='**:!bg-transparent' />
                  </Button>
                </Tooltip>
              </HeaderItem>
            )}
            <HeaderItem label='Source'>
              <div className='flex flex-row items-center gap-x-[12px]'>
                <IconGithub />
                <Link
                  href={`https://github.com/exoshell-io/exoshell/blob/master/pkgs/ui/src/components/${component}/${component}.tsx`}
                >
                  View source code
                </Link>
              </div>
            </HeaderItem>
            <HeaderItem label='Docs'>
              <div className='flex flex-row items-center gap-x-[12px]'>
                <IconEdit />
                <Link
                  href={`https://github.com/exoshell-io/exoshell/blob/master/docs/app/_components/${component}/page.mdx`}
                >
                  Edit this page
                </Link>
              </div>
            </HeaderItem>
            <HeaderItem label='Package'>
              <div className='flex flex-row items-center gap-x-[12px]'>
                <IconNpm color='rgb(193, 33, 39)' />
                <Link href='https://www.npmjs.com/package/@exoshell/ui'>
                  @exoshell/ui
                </Link>
              </div>
            </HeaderItem>
          </div>
        </div>
      </header>
      <Tabs variant='outline'>
        <div className='border-b border-b-gray-200'>
          <TabsList className='mx-auto mb-[-1px] max-w-[1080px]'>
            <TabsTab id='doc' className='data-active:bg-white'>
              Documentation
            </TabsTab>
            <TabsTab id='props' className='data-active:bg-white'>
              Props
            </TabsTab>
            <TabsTab id='styles' className='data-active:bg-white'>
              Styles
            </TabsTab>
          </TabsList>
        </div>
        <TabsPanel
          id='doc'
          className='flex flex-row bg-white px-[64px] pt-[10px] pb-[80px]'
        >
          <Documentation sections={meta.sections} />
        </TabsPanel>
        <TabsPanel id='props' className='bg-white pt-[34px] pb-[80px]'>
          <Props props={meta.props} />
        </TabsPanel>
        <TabsPanel id='styles' className='bg-white pt-[34px] pb-[80px]'>
          <div className='mx-auto max-w-[1080px]'>
            <Styles />
          </div>
        </TabsPanel>
      </Tabs>
    </>
  );
}

const HeaderItem: React.FC<
  Readonly<React.PropsWithChildren<{ label: string }>>
> = ({ children, label }) => {
  return (
    <div className='flex flex-row items-center text-sm'>
      <p className='w-24 text-gray-500'>{label}</p>
      {children}
    </div>
  );
};
