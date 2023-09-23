import { derived } from 'svelte/store';

import type { ICard } from '../components/Card/ICard.interface';
import { writeableWithValue } from '../helper/writeableWithValue.helper';

//@ts-expect-error env is not typed, check vite docs
export const amountOfCards = import.meta.env.PROD ? 81 : 27;
export const cards = writeableWithValue<ICard[]>([]);
export const cardsOnTheTable = writeableWithValue<ICard[]>([]);
export const activatedCards = writeableWithValue<ICard[]>([]);
export const cardsRemaining = derived(cards, (cards) => cards.length);
