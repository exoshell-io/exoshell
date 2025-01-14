'use client';

import { type SlotComponentProps } from '../..';
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  Input as AriaInput,
  FieldError as AriaFieldError,
  Text as AriaText,
} from 'react-aria-components';
import { _tvTextInput, tvTextInput } from './styles';
import type { ClassNameValue } from 'tailwind-merge';

// =============================================================================
// #region TextInput
type AriaTextFieldProps = React.ComponentPropsWithRef<typeof AriaTextField>;
type AriaLabelProps = React.ComponentPropsWithRef<typeof AriaLabel>;
type AriaInputProps = React.ComponentPropsWithRef<typeof AriaInput>;
type AriaTextProps = React.ComponentPropsWithRef<typeof AriaText>;
type AriaFieldErrorProps = React.ComponentPropsWithRef<typeof AriaFieldError>;

export type TextInputProps = SlotComponentProps<
  typeof _tvTextInput,
  'root',
  Omit<AriaTextFieldProps, 'children' | 'className'> & {
    classNames?: {
      root?: AriaTextFieldProps['className'];
      label?: AriaLabelProps['className'];
      description?: AriaTextProps['className'];
      input?: AriaInputProps['className'];
      error?: AriaFieldErrorProps['className'];
    };
    label?: AriaLabelProps['children'];
    labelProps?: Omit<AriaLabelProps, 'children' | 'className'>;
    inputProps?: Omit<AriaInputProps, 'className'>;
    description?: AriaTextProps['children'];
    descriptionProps?: Omit<AriaTextProps, 'children' | 'className'>;
    errorProps?: Omit<AriaFieldErrorProps, 'children' | 'className'>;
    error?: AriaFieldErrorProps['children'];
  }
>;

export const TextInput: React.FC<TextInputProps> = ({
  classNames,
  label,
  labelProps,
  inputProps,
  description,
  descriptionProps,
  errorProps,
  error,
  ...props
}) => {
  return (
    <AriaTextField
      className={(renderProps) => {
        let className: ClassNameValue | undefined = undefined;
        if (typeof classNames?.root === 'function') {
          className = classNames.root(renderProps);
        } else if (classNames !== undefined) {
          className = classNames.root;
        }
        return tvTextInput.root({ className, ...props, ...renderProps });
      }}
      {...props}
    >
      {label !== undefined && (
        <AriaLabel
          className={tvTextInput.label({
            className: classNames?.label,
            ...props,
          })}
          {...labelProps}
        >
          {label}
        </AriaLabel>
      )}
      {description !== undefined && (
        <AriaText
          slot='description'
          className={tvTextInput.description({
            className: classNames?.description,
            ...props,
          })}
          {...descriptionProps}
        >
          {description}
        </AriaText>
      )}
      <AriaInput
        className={(renderProps) => {
          let className: ClassNameValue | undefined = undefined;
          if (typeof classNames?.input === 'function') {
            className = classNames.input(renderProps);
          } else if (classNames !== undefined) {
            className = classNames.input;
          }
          return tvTextInput.input({
            className,
            hasDescription: description !== undefined,
            ...props,
            ...renderProps,
          });
        }}
        {...inputProps}
      />
      <AriaFieldError
        className={(renderProps) => {
          let className: ClassNameValue | undefined = undefined;
          if (typeof classNames?.error === 'function') {
            className = classNames.error(renderProps);
          } else if (classNames !== undefined) {
            className = classNames.error;
          }
          return tvTextInput.error({ className, ...props, ...renderProps });
        }}
        {...errorProps}
      >
        {error}
      </AriaFieldError>
    </AriaTextField>
  );
};
// #endregion
