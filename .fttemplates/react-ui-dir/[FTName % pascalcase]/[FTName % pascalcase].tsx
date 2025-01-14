import { type SlotComponentProps } from '@exoshell/ui';
import { _tv[FTName % pascalcase], tv[FTName % pascalcase] } from './styles';

// =============================================================================
// #region [FTName % pascalcase]
export type [FTName % pascalcase]Props =
  SlotComponentProps<typeof _tv[FTName % pascalcase], 'root', React.ComponentPropsWithRef<'div'>>;

export const [FTName % pascalcase]: React.FC<[FTName % pascalcase]Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={tv[FTName % pascalcase].root({ className, ...props })} {...props}>
      {children}
    </div>
  );
}
// #endregion
