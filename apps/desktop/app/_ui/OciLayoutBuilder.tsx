import {
  ActionIcon,
  ActionIconGroup,
  Box,
  FileButton,
  Group,
  ScrollArea,
  Stack,
  Tooltip,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';
import { useListState, useMap } from '@mantine/hooks';
import { Editor, OnChange } from '@monaco-editor/react';
import { Allotment } from 'allotment';
import { useCallback, useMemo, useState } from 'react';
import { IconCreateFile, IconFileOpen } from './icons';

export const OciLayoutBuilder: React.FC = () => {
  const [treeNodes, { append: appendTreeNodes }] = useListState<TreeNodeData>(
    [],
  );
  const editors = useMap<string, string>([]);
  const [activeEditorId, setActiveEditorId] = useState<string | null>(null);
  const activeEditor = useMemo(
    () =>
      typeof activeEditorId === 'string' ? editors.get(activeEditorId) : null,
    [editors, activeEditorId],
  );
  const changeActiveEditorValue = useCallback<OnChange>(
    (value) => {
      if (typeof activeEditorId === 'string' && typeof value === 'string') {
        editors.set(activeEditorId, value);
      }
    },
    [activeEditorId, editors],
  );
  const tree = useTree();
  const addFile = useCallback(() => {
    const id = Date.now().toString();
    appendTreeNodes({
      label: `Untitled`,
      value: id,
    });
  }, [appendTreeNodes]);
  const openFile = useCallback(
    async (file: File | null) => {
      if (file === null) {
        return;
      }
      const id = Date.now().toString();
      appendTreeNodes({
        label: file.name,
        value: id,
      });
      editors.set(id, await file.text());
      setActiveEditorId(id);
    },
    [appendTreeNodes, editors],
  );
  return (
    <>
      <Box h='200' className='border border-solid'>
        <Allotment>
          <Allotment.Pane preferredSize={200} minSize={100} maxSize={500}>
            <Stack gap={0}>
              <Group gap='xs' px='xs'>
                <FileButton onChange={openFile}>
                  {(props) => (
                    <Tooltip label='Open file from file system'>
                      <ActionIcon variant='subtle' color='gray' {...props}>
                        <IconFileOpen />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </FileButton>
                <Tooltip label='Create new file'>
                  <ActionIcon variant='subtle' color='gray' onClick={addFile}>
                    <IconCreateFile />
                  </ActionIcon>
                </Tooltip>
              </Group>
              {/* <Dropzone
                  activateOnClick={false}
                  onDrop={(files) => console.log('Received files', files)}
                  h='100%'
                  maw='100%'
                  accept={IMAGE_MIME_TYPE}
                  p={0}
                  classNames={{
                    inner: 'max-h-full',
                  }}
                > */}
              <ScrollArea
                className='pointer-events-auto h-full max-h-full'
                bg='red'
              >
                <Tree
                  tree={tree}
                  selectOnClick
                  data={treeNodes}
                  w={200}
                  pl='md'
                />
              </ScrollArea>
            </Stack>
            {/* </Dropzone> */}
          </Allotment.Pane>
          <Allotment.Pane className='p-1'>
            <Editor
              height='200px'
              defaultLanguage=''
              defaultValue={activeEditor ?? ''}
              onChange={changeActiveEditorValue}
            />
          </Allotment.Pane>
        </Allotment>
      </Box>
    </>
  );
};
