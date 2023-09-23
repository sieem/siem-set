import { type Writable, writable } from 'svelte/store';

export const writeableWithValue = <T>(initialValue: T): Writable<T> & { value: () => T } => {
  const { subscribe, set, update } = writable<T>(initialValue);
  return {
    subscribe,
    set,
    update,
    value: () => {
      let value: T;
      subscribe((_value) => (value = _value))();
      return value;
    },
  };
};
