import { writable } from "svelte/store";
export const timerStore = writable(true);
export const timeStore = writable(0);

let timer;
let time = 0;
let lastTimePairFound = 0;

export const controlTimer = (play: boolean) =>
    play
        ? timer = setInterval(() => time++ && timeStore.set(time), 1000)
        : clearInterval(timer);

export const setLastTimePairFound = (): number => lastTimePairFound = time;
export const getLastTimePairFound = (): number => lastTimePairFound;
export const getCurrentTime = (): number => time;

timerStore.subscribe((play: boolean) => controlTimer(play));