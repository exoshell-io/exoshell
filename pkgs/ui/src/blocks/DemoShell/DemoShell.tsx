import { type SlotComponentProps } from '../..';
import { _tvDemoShell, tvDemoShell } from './styles';

// =============================================================================
// #region DemoShell
type ClassNames<T extends object> = { [key in keyof T]?: string };

export type DemoShellProps = SlotComponentProps<
  typeof _tvDemoShell,
  'root',
  {
    main: React.ReactNode;
    sidebar?: React.ReactNode;
    footer?: React.ReactNode;
    classNames?: ClassNames<(typeof _tvDemoShell)['slots']>;
  }
>;

export const DemoShell: React.FC<DemoShellProps> = ({
  main,
  sidebar,
  footer,
  classNames,
  ...props
}) => {
  return (
    <div
      className={tvDemoShell.root({ className: classNames?.root, ...props })}
    >
      <div className='flex max-h-[50dvh] flex-row'>
        <div className='flex grow items-center justify-center'>{main}</div>
        {sidebar !== undefined && (
          <div className='flex w-[250px] flex-col gap-[12px] border-l p-[16px] pb-[22px]'>
            {sidebar}
          </div>
        )}
      </div>
      {footer !== undefined && <div className='border-t'>{footer}</div>}
    </div>
  );
};
// #endregion
