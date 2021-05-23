import { writable } from "svelte/store";
export const timer = writable(true);
export const time = writable(0);

let _timer;
let lastTimePairFound = 0;

const controlTimer = (play: boolean) =>
    play
        ? _timer = setInterval(() => time.update((_time) => ++_time), 1000)
        : clearInterval(_timer);

export const setLastTimePairFound = () => time.subscribe((_time) => lastTimePairFound = _time)();
export const getLastTimePairFound = (): number => lastTimePairFound;

timer.subscribe((play: boolean) => controlTimer(play));
