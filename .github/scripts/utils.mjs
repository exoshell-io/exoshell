/**
 * Cast (unwrap) a non-null value to a non-null type.
 * It is equivalent to the ! operator in Typescript (eg. `a!.b!.c`)
 * @template T
 * @param {T} value
 */
export function castNonNull(value) {
  return /** @type {NonNullable<T>} */ (value);
}
