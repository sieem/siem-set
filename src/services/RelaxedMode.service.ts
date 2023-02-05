import { writable } from "svelte/store";
import { writeableWithValue } from "../helper/writeableWithValue.helper";

export const relaxedMode = writeableWithValue(false);
