import { Button, Group, type RenderTreeNodePayload, Tree } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import {
  FaFolder as IconFolder,
  FaFolderOpen as IconFolderOpen,
} from 'react-icons/fa';
import {
  SiCss3 as IconCss,
  SiNpm as IconNpm,
  SiTypescript as IconTypescript,
} from 'react-icons/si';
import { useActiveTab, useFiles } from '@/hooks/storage';
import classes from './FileTree.module.css';
import { NewFile } from './NewFile';
import { openTab } from '@/utils/storage';

export const FileTree: React.FC = () => {
  const files = useFiles();
  const [isNewFileOpened, toggleNewFileOpened] = useToggle([false, true]);
  // const tree = useTree();

  return (
    <>
      <NewFile
        opened={isNewFileOpened}
        close={() => {
          toggleNewFileOpened(false);
        }}
      />
      <Group
        justify='center'
        py='xs'
        style={{ borderBottom: 'solid 1px gray' }}
      >
        <Button
          variant='default'
          onClick={() => {
            toggleNewFileOpened(true);
          }}
        >
          New Script
        </Button>
      </Group>
      <Tree
        // tree={tree}
        pl='xs'
        classNames={classes}
        selectOnClick
        clearSelectionOnOutsideClick
        data={files.map((file) => ({
          label: file.name,
          value: file.id,
        }))}
        renderNode={(payload) => <Leaf {...payload} />}
      />
    </>
  );
};
interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

const FileIcon: React.FC<Readonly<FileIconProps>> = ({
  name,
  isFolder,
  expanded,
}) => {
  if (name.endsWith('package.json')) {
    return <IconNpm size={14} />;
  }

  if (
    name.endsWith('.ts') ||
    name.endsWith('.tsx') ||
    name.endsWith('tsconfig.json')
  ) {
    return <IconTypescript size={14} />;
  }

  if (name.endsWith('.css')) {
    return <IconCss size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <IconFolderOpen color='var(--mantine-color-yellow-9)' size={14} />
    ) : (
      <IconFolder color='var(--mantine-color-yellow-9)' size={14} />
    );
  }

  return null;
};

const Leaf: React.FC<Readonly<RenderTreeNodePayload>> = ({
  node,
  expanded,
  hasChildren,
  elementProps,
}) => {
  const [, setActiveTab] = useActiveTab();
  return (
    <Group
      gap={5}
      {...elementProps}
      onClick={() => {
        const uri = `file://${node.value}`;
        void openTab({
          uri,
        });
        setActiveTab(uri);
      }}
    >
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
};
