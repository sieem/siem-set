import { writable, type Writable } from 'svelte/store';

export const writeableWithValue = <T>(initialValue: T): Writable<T> & { value: () => T } => {
  const { subscribe, set, update } = writable<T>(initialValue);
  return {
    subscribe,
    set,
    update,
    value: () => {
      let value: T;
      subscribe((_value) => (value = _value))();
      //@ts-expect-error value is defined
      return value;
    },
  };
};
