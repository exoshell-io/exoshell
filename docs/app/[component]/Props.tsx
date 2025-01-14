'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TextInput,
} from '@exoshell/ui';
import { Fragment, useMemo, useState } from 'react';
import type { Meta } from './_components/_meta';

export const Props: React.FC<{ props: Meta['props'] }> = ({ props }) => {
  const [search, setSearch] = useState('');
  const filteredProps = useMemo((): typeof props => {
    if (search === '') {
      return props;
    }
    return Object.entries(props).reduce<Meta['props']>(
      (acc, [componentName, componentProps]) => {
        acc[componentName] ??= {};
        Object.entries(componentProps).forEach(([propName, propMeta]) => {
          if (propName.includes(search)) {
            acc[componentName]![propName] = propMeta;
          }
        });
        return acc;
      },
      {},
    );
  }, [search, props]);

  return (
    <div className='mx-auto flex max-w-[1080px] flex-col'>
      <TextInput
        classNames={{
          root: 'w-full mb-[32px]',
          input: 'w-full',
        }}
        size='lg'
        inputProps={{ placeholder: 'Search props' }}
        value={search}
        onChange={setSearch}
      />
      {Object.entries(filteredProps).map(([componentName, componentProps]) => (
        <Fragment key={componentName}>
          <h2 className='mb-[20px] text-2xl font-bold'>{componentName}</h2>
          {Object.keys(componentProps).length === 0 ? (
            <p>Nothing found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn isRowHeader>Name</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Description</TableColumn>
              </TableHeader>
              <TableBody>
                {Object.entries(componentProps).map(
                  ([propName, { type, description }]) => (
                    <TableRow key={propName}>
                      <TableCell>{propName}</TableCell>
                      <TableCell>
                        <span className='text-blue-500'>{type}</span>
                      </TableCell>
                      <TableCell>{description}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          )}
        </Fragment>
      ))}
    </div>
  );
};
