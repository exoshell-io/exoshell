'use client';

import {
  Breadcrumb,
  Breadcrumbs,
  DemoShell,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextInput,
} from '@exoshell/ui';
import { useMemo, useState } from 'react';

export const ClientSide: React.FC<{ htmlCodeTemplate: string }> = ({
  htmlCodeTemplate,
}) => {
  const [separator, setSeparator] = useState('chevron');

  const code = useMemo(() => {
    return htmlCodeTemplate;
  }, [htmlCodeTemplate]);

  return (
    <DemoShell
      main={
        <Breadcrumbs separator={separator}>
          <Breadcrumb>Home</Breadcrumb>
          <Breadcrumb>Docs</Breadcrumb>
          <Breadcrumb>Breadcrumbs</Breadcrumb>
        </Breadcrumbs>
      }
      sidebar={
        <>
          <TextInput
            label='Separator'
            value={separator}
            onChange={setSeparator}
          />
        </>
      }
      footer={
        <Tabs variant='editor'>
          <TabsList>
            <TabsTab id='1'>Demo.tsx</TabsTab>
          </TabsList>
          <TabsPanel id='1' className='text-[13px] *:px-[16px] *:py-[10px]'>
            {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
            <div dangerouslySetInnerHTML={{ __html: code }} />
          </TabsPanel>
        </Tabs>
      }
    />
  );
};
