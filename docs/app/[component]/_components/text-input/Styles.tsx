'use client';

import { DemoShell, TextInput } from '@exoshell/ui';
import { useHover } from '@mantine/hooks';

export const Styles: React.FC = () => {
  const { hovered: isRootHovered, ref: refRoot } = useHover();
  const { hovered: isLabelHovered, ref: refLabel } = useHover();
  const { hovered: isDescriptionHovered, ref: refDescription } = useHover();
  const { hovered: isInputHovered, ref: refInput } = useHover();
  const { hovered: isErrorHovered, ref: refError } = useHover();

  return (
    <DemoShell
      main={
        <TextInput
          classNames={{
            root: 'max-w-[340px] grow my-[20px] data-outline-root:outline-2  outline-green-500 group',
            label:
              'group-data-outline-label:outline-2 group-data-outline-label:outline-green-500',
            description:
              'group-data-outline-description:outline-2 group-data-outline-description:outline-green-500',
            input:
              'group-data-outline-input:outline-2 group-data-outline-input:outline-green-500',
            error:
              'group-data-outline-error:outline-2 group-data-outline-error:outline-green-500',
          }}
          label='Label'
          description='Description'
          labelProps={{
            ref: refLabel,
          }}
          descriptionProps={{
            ref: refDescription,
          }}
          inputProps={{
            placeholder: 'Input placeholder',
            ref: refInput,
          }}
          errorProps={{
            ref: refError,
          }}
          error='Input error'
          isInvalid
          data-outline-root={isRootHovered ? true : undefined}
          data-outline-label={isLabelHovered ? true : undefined}
          data-outline-description={isDescriptionHovered ? true : undefined}
          data-outline-input={isInputHovered ? true : undefined}
          data-outline-error={isErrorHovered ? true : undefined}
        />
      }
      sidebar={
        <div className='flex flex-col justify-center'>
          {(
            [
              [refRoot, 'root', 'Root element'],
              [refLabel, 'label', 'Label element'],
              [refDescription, 'description', 'Description element'],
              [refInput, 'input', 'Input element'],
              [refError, 'error', 'Error element'],
            ] satisfies [React.RefObject<unknown>, string, string][]
          ).map(([ref, label, description]) => (
            <div
              key={label}
              className='px-[12px] py-[6px] hover:bg-gray-100'
              ref={ref}
            >
              <p className='font-bold'>{label}</p>
              <p className='text-sm'>Root {description}</p>
            </div>
          ))}
        </div>
      }
    />
  );
};
