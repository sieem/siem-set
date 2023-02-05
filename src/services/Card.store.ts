import { writable } from "svelte/store";
import type { ICard } from "../components/Card/ICard.interface";

export const amountOfCards = import.meta.env.MODE === 'production' ? 81 : 27;
export const cards = writable<ICard[]>([]);
export const cardsOnTheTable = writable<ICard[]>([]);
export const activatedCards = writable<ICard[]>([]);
export const cardsRemaining = writable(amountOfCards);