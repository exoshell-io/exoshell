import { tv } from 'tailwind-variants';
import { type SlotComponentProps } from '@exoshell/ui';

// =============================================================================
// #region Styles
export const _tv[FTName % pascalcase] = tv({
  slots: {
    root: ''
  },
  variants: {},
  defaultVariants: {}
});

export const tv[FTName % pascalcase] = _tv[FTName % pascalcase]();
// #endregion

// =============================================================================
// #region [FTName % pascalcase]
export type [FTName % pascalcase]Props =
  SlotComponentProps<typeof _tv[FTName % pascalcase], 'root', React.PropsWithChildren>

export const [FTName % pascalcase]: React.FC<[FTName % pascalcase]Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={tv[FTName % pascalcase].root({ className })} {...props}>
      {children}
    </div>
  );
}
// #endregion
