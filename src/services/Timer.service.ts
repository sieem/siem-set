import { writable } from "svelte/store";
export const timer = writable(true);
export const time = writable(0);

let _timer;
let _time = 0;
let lastTimePairFound = 0;

export const controlTimer = (play: boolean) =>
    play
        ? _timer = setInterval(() => _time++ && time.set(_time), 1000)
        : clearInterval(_timer);

export const setLastTimePairFound = (): number => lastTimePairFound = _time;
export const getLastTimePairFound = (): number => lastTimePairFound;
export const getCurrentTime = (): number => _time;

timer.subscribe((play: boolean) => controlTimer(play));