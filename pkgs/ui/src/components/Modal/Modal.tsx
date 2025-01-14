'use client';

import { Button } from '../..';
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Heading as AriaHeading,
} from 'react-aria-components';

export const Modal: React.FC<Readonly<React.PropsWithChildren>> = ({
  children,
  ...props
}) => {
  return (
    <ModalRoot {...props}>
      <Button>Open Modal</Button>
      <ModalOverlay>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>
    </ModalRoot>
  );
};

export const ModalRoot: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof AriaDialogTrigger>>
> = ({ ...props }) => {
  return <AriaDialogTrigger {...props} />;
};

export const ModalTrigger: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof Button>>
> = (props) => <Button {...props} />;

export const ModalOverlay: React.FC<
  Readonly<React.ComponentPropsWithRef<typeof AriaModalOverlay>>
> = ({ ...props }) => {
  return <AriaModalOverlay {...props} />;
};

export const ModalContent: React.FC<
  Readonly<{
    children: React.ReactNode;
    closeButtonProps?: Readonly<React.ComponentPropsWithRef<typeof Button>>;
    modalProps?: Readonly<React.ComponentPropsWithRef<typeof AriaModal>>;
    dialogProps?: Readonly<React.ComponentPropsWithRef<typeof AriaDialog>>;
    title?: string;
    centered?: boolean;
    fullscreen?: boolean;
  }>
> = ({ children, modalProps, dialogProps, title }) => {
  return (
    <div className='fixed top-0 left-0 flex h-dvh w-dvw items-center justify-center'>
      <AriaModal {...modalProps} className='border border-gray-200 bg-pink-200'>
        <AriaDialog {...dialogProps}>
          <header className='flex flex-row justify-between'>
            {title ? <AriaHeading slot='title'>Sign up</AriaHeading> : <div />}
            <Button slot='close'>Close</Button>
          </header>
          {children}
        </AriaDialog>
      </AriaModal>
    </div>
  );
};
