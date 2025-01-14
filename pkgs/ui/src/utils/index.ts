import type {
  ClassProp,
  StringToBoolean,
  VariantProps,
} from 'tailwind-variants';

export const emptyObject = {} as const;

/**
 * Type definition for component props integrating `tailwind-variant`.
 *
 * @template Variant - The variant props type inferred from `import('tailwind-variants').tv({...})` instance.
 * @template RequiredVariants - Optional. The keys to mark as required from `C`. Eg. `'color' | 'size'`.
 * @see https://www.tailwind-variants.org/docs/typescript#required-variants
 */
export type ComponentProps<
  Variant extends never extends VariantProps<infer X> ? X : never,
  RequiredVariants extends Exclude<
    keyof Exclude<Parameters<Variant>[0], undefined>,
    'class' | 'className'
  > = never,
  Props extends object = object,
> = Readonly<VariantProps<Variant>> &
  Required<Pick<VariantProps<Variant>, RequiredVariants>> &
  Readonly<Omit<ClassProp, 'class'>> &
  Readonly<Props>;

/**
 * Type definition for polymorphic component props (extends {@link ComponentProps}).
 *
 * @template Element - The element type that the component renders as.
 * @template Variant - The variant props type inferred from `import('tailwind-variants').tv({...})` instance.
 * @template RequiredVariants - Optional. The keys to mark as required from `C`. Eg. `'color' | 'size'`.
 * @see https://www.tailwind-variants.org/docs/typescript#required-variants
 */
export type PolymorphicComponentProps<
  Element extends React.ElementType,
  Variant extends never extends VariantProps<infer X> ? X : never,
  RequiredVariants extends Exclude<
    keyof Exclude<Parameters<Variant>[0], undefined>,
    'class' | 'className'
  > = never,
  Props extends object = object,
> = Readonly<React.ComponentPropsWithRef<Element>> & {
  readonly as?: Element;
} & ComponentProps<Variant, RequiredVariants, Props>;

export type TvWithSlots = {
  slots: { [k: string]: unknown };
  variants?: {
    [k: string]: {
      [v: string]: { [slot: keyof TvWithSlots['slots']]: unknown };
    };
  };
};

/**
 * Type definition that filter out the variant props that affect a given
 * tailwind-variant slot.
 * @template Tv - The tailwind-variant instance type. eg. `typeof tv({...})`
 * @template Slot - The slot key to filter the variant props.
 * @template Variants - Internal. The variant props type inferred from `Tv`.
 */
export type TvSlotProps<
  Tv extends TvWithSlots,
  Slot extends keyof Tv['slots'],
  Variants extends Tv['variants'] = Tv['variants'],
> = {
  [Variant in keyof Variants as {
    [VariantValue in keyof Variants[Variant]]: Slot extends keyof Variants[Variant][VariantValue]
      ? VariantValue
      : never;
  }[keyof Variants[Variant]] extends never
    ? never
    : Variant]?: StringToBoolean<keyof Variants[Variant]>;
};

/**
 * Type definition for slot component props (extends {@link TvSlotProps}).
 *
 * @template Tv - The tailwind-variant instance type. eg. `typeof tv({...})`
 * @template Slot - The slot key to filter the variant props.
 * @template Props - Optional. Additional props to be included in the component props.
 */
export type SlotComponentProps<
  Tv extends TvWithSlots,
  Slot extends keyof Tv['slots'],
  Props extends object = object,
> = Readonly<TvSlotProps<Tv, Slot>> & Props;

export type ComponentsProps<E extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<E>,
  'children'
>;

// =============================================================================
// #region Object Utils

/**
 * Merge two objects.
 * Examples:
 *   Merge<{a?:string},{a?:string}> // {a?:string|undefined}
 *   Merge<{a?:string},{a:string}> // {a:string|undefined}
 *   Merge<{a?:string},{a?:number}> // {a?:string|number|undefined}
 */
export type Merge<T, U> = {
  [K in keyof T | keyof U as IsOptionalProperty<T & U, K> extends true
    ? never
    : K]: UnionField<T, U, K>;
} & {
  [K in keyof T | keyof U as IsOptionalProperty<T & U, K> extends true
    ? K
    : never]?: UnionField<T, U, K>;
};

/**
 * UnionField merges two objects by making a union of the type of the properties
 * that are present in both objects. See {@link Merge}.
 */
type UnionField<T, U, K extends keyof T | keyof U> = K extends keyof T
  ? K extends keyof U
    ? T[K] | U[K]
    : T[K]
  : K extends keyof U
    ? U[K]
    : never;

/**
 * Check if a object's property is optional (eg. {name?: string}).
 * Example:
 *   IsOptional<{name?: string}, 'name'> // true
 *   IsOptional<{name: string | undefined}, 'name'> // false
 */
type IsOptionalProperty<T, K extends keyof T> = undefined extends T[K]
  ? object extends Pick<T, K>
    ? true
    : false
  : false;

// #endregion
