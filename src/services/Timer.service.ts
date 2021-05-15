import { writable } from "svelte/store";
export const timerStore = writable(true);
export const timeStore = writable(0);

let timer;

export const controlTimer = (play: boolean) =>
    play
        ? timer = setInterval(() => timeStore.update((time) => time + 1), 1000)
        : clearInterval(timer);

timerStore.subscribe((play: boolean) => controlTimer(play));