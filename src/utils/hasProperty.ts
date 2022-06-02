/**
 * SOURCE - TLDR an easier way of dealing with `unknown`
 * but want to test if it is an object.
 * https://kamyshov.info/post/typesafe-hasownproperty/
 */

export function hasProperty<N extends string>(
  obj: unknown,
  propertyName: N
): obj is {
  [K in N]: unknown;
} {
  return Object(obj) === obj && Object.prototype.hasOwnProperty.call(obj, propertyName);
}

export function hasSafeProperty<N extends string, T>(
  obj: unknown,
  propertyName: N,
  isT: (value: unknown) => value is T
): obj is {
  [K in N]: T;
} {
  return hasProperty(obj, propertyName) && isT(obj[propertyName]);
}
