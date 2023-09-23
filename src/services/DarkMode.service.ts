import { writeableWithValue } from '../helper/writeableWithValue.helper';

export const darkMode = writeableWithValue(window.matchMedia('(prefers-color-scheme: dark)').matches);
