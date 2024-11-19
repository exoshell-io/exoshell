import { Button, TextInput } from '@mantine/core';
import { IconSearch } from './icons';

export const SearchBar: React.FC = () => {
  return (
    <TextInput
      placeholder='Search or jump to...'
      leftSection={<IconSearch />}
      rightSection={
        <Button
          color='gray'
          size='compact-xs'
          component='span'
          variant='outline'
        >
          /
        </Button>
      }
    />
  );
};
