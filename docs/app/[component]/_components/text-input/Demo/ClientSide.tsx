'use client';

import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextInput,
  DemoShell,
} from '@exoshell/ui';
import { useMemo, useState } from 'react';
import { templateKeys } from './Demo';

export const ClientSide: React.FC<{ htmlCodeTemplate: string }> = ({
  htmlCodeTemplate,
}) => {
  const [label, setLabel] = useState('Input label');
  const [description, setDescription] = useState('Input description');
  const [error, setError] = useState('');

  const code = useMemo(() => {
    return htmlCodeTemplate
      .replace(templateKeys.label, label)
      .replace(templateKeys.description, description)
      .replace(templateKeys.placeholder, error);
  }, [htmlCodeTemplate, label, description, error]);

  return (
    <DemoShell
      main={
        <TextInput
          classNames={{
            root: 'max-w-[340px] grow',
          }}
          label={label}
          description={description}
          error={error}
          isInvalid={error !== ''}
          inputProps={{
            placeholder: 'Input placeholder',
          }}
        />
      }
      sidebar={
        <>
          <TextInput label='Label' value={label} onChange={setLabel} />
          <TextInput
            label='Description'
            value={description}
            onChange={setDescription}
          />
          <TextInput label='Error' value={error} onChange={setError} />
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
