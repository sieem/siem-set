import { derived } from "svelte/store";
import type { ICard } from "../components/Card/ICard.interface";
import { writeableWithValue } from "../helper/writeableWithValue.helper";

export const amountOfCards = import.meta.env.MODE === 'production' ? 81 : 27;
export const cards = writeableWithValue<ICard[]>([]);
export const cardsOnTheTable = writeableWithValue<ICard[]>([]);
export const activatedCards = writeableWithValue<ICard[]>([]);
export const cardsRemaining = derived(cardsOnTheTable, cardsOnTheTable => cardsOnTheTable.length);