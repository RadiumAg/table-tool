export type ValidateCallback = (...args) => any;

export const isObject = (value: unknown): value is object =>
  Object.prototype.toString.call(value) === '[object Object]';
