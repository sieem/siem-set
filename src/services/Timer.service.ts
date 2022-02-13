import { writable } from "svelte/store";
export const timer$ = writable(true);
export const time$ = writable(0);

let timer: NodeJS.Timeout;
let lastTimePairFound = 0;

const controlTimer = (play: boolean) =>
    play
        ? timer = setInterval(() => time$.update((time) => ++time), 1000)
        : clearInterval(timer);

export const setLastTimePairFound = () => time$.subscribe((time) => lastTimePairFound = time)();
export const getLastTimePairFound = (): number => lastTimePairFound;

timer$.subscribe((play: boolean) => controlTimer(play));
