import { writable } from "svelte/store";

export const amountOfCards = globalThis.isProduction ? 81 : 27;
export const cards$ = writable([]);
export const cardsOnTheTable$ = writable([]);
export const activatedCards$ = writable([]);
export const cardsRemaining$ = writable(amountOfCards);