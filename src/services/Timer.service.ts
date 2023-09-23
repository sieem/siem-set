import { writable } from 'svelte/store';

import { writeableWithValue } from '../helper/writeableWithValue.helper';
export const timer = writable(true);
export const time = writeableWithValue(0);

let _timer: NodeJS.Timeout;
let lastTimePairFound = 0;

const controlTimer = (play: boolean) =>
  play ? (_timer = setInterval(() => time.update((time) => ++time), 1000)) : clearInterval(_timer);

export const setLastTimePairFound = () => (lastTimePairFound = time.value());
export const getLastTimePairFound = () => lastTimePairFound;

timer.subscribe((play) => controlTimer(play));
