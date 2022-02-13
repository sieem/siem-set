import type { ICard } from '../components/Card/ICard.interface';
import { writable } from 'svelte/store';
import { countScore } from './Score.service';
import { handleEndOfGame } from './EndGame.service';
import { sleep } from '../helper/sleep.helper';

const correctPairs = ['000', '111', '222', '012'];
const amountOfCards = globalThis.isProduction ? 81 : 27;
const retryAmount = 10;

export const cards$ = writable([]);
export const cardsOnTheTable$ = writable([]);
export const activatedCards$ = writable([]);
export const cardsRemaining$ = writable(amountOfCards);

const getCardId = ({ amount, color, filling, shape }: ICard): string => `${amount}${color}${filling}${shape}`;
const getCardIds = (cards: ICard[]): string[] => cards.map((card) => getCardId(card));

export const findValidSet = (cards: ICard[]): ICard[] => {
    for (let i = 0; i < Math.pow(cards.length, 3); i++) {
        const cardPair = i
            .toString(cards.length)
            .padStart(3, '0')
            .split('')
            .map((el) => parseInt(el, cards.length))
            .map((el) => cards[el]);

        if (new Set(cardPair).size !== 3 || cardPair.includes(undefined)) {
            continue;
        }

        if (checkSet(cardPair)) {
            return cardPair;
        };
    }

    console.log('no valid pairs found');
    return null;
}

export const generateAllCards = (): void => {
    let i = -1;

    let cards = Array(amountOfCards)
        .join('-')
        .split('-')
        .map((): ICard => {
            i++;
            const cardCode = i
                .toString(3)
                .padStart(4, '0')
                .split('')
                .map((el) => Number(el));
            return {
                amount: cardCode[0],
                color: cardCode[1],
                filling: cardCode[2],
                shape: cardCode[3],
            };
        })
        .sort(() => Math.random() > Math.random() ? -1 : 1);

    let cardsOnTheTable = cards.splice(0, 12);

    for (let i = 0; i < retryAmount; i++) {
        if (findValidSet(cardsOnTheTable)) {
            i = retryAmount;
            continue;
        }

        cards = [...cards, ...cardsOnTheTable];
        cardsOnTheTable = cards.splice(0, 12);
    }

    cardsRemaining$.set(cards.length);
    cardsOnTheTable$.set(cardsOnTheTable);
    cards$.set(cards);
}

const checkSet = (cards: ICard[]): boolean => {
    const cardIds = cards.map((card) => getCardId(card));
    const cardsSplit = cardIds.map((activatedCardId) => activatedCardId.split(''));

    for (let i = 0; i < 4; i++) {
        const numberToCheck = cardsSplit.map((el) => el[i]).sort().join('');
        if (!correctPairs.includes(numberToCheck)) {
            return false;
        }
    }

    return true;
}



activatedCards$.subscribe(async (activatedCards: ICard[]) => {
    if (activatedCards.length !== 3) {
        return;
    }

    let cardsOnTheTable: ICard[];
    let cards: ICard[];

    cardsOnTheTable$.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, active: false })));
    cardsOnTheTable$.subscribe((value) => cardsOnTheTable = value)();
    cards$.subscribe((value) => cards = value)();

    activatedCards$.set([]);

    if (checkSet(activatedCards)) {
        const oldCardsOnTheTable = cardsOnTheTable;
        cardsOnTheTable = cardsOnTheTable.filter((cardOnTheTable) => !getCardIds(activatedCards).includes(getCardId(cardOnTheTable)));

        let newCardsOnTheTable = cards.splice(0, 3);
        let validSetFound = false;

        for (let i = 0; i < retryAmount; i++) {
            if (findValidSet([...cardsOnTheTable, ...newCardsOnTheTable])) {
                validSetFound = true;
                break;
            }
            cards = [...cards, ...newCardsOnTheTable];
            newCardsOnTheTable = cards.splice(0, 3);
        }

        cardsOnTheTable = oldCardsOnTheTable
            .map((cardOnTheTable) =>
                getCardIds(activatedCards).includes(getCardId(cardOnTheTable))
                    ? newCardsOnTheTable.splice(0, 1)[0]
                    : cardOnTheTable
            )
            .filter((el) => el !== undefined);

        countScore(getCardIds(activatedCards));

        cardsRemaining$.set(cards.length);
        cards$.set(cards);
        cardsOnTheTable$.set(cardsOnTheTable);

        if (!validSetFound) {
            handleEndOfGame();
        }
    } else {
        const activatedCardsIds = getCardIds(activatedCards);
        cardsOnTheTable$.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => activatedCardsIds.includes(getCardId(cardOnTheTable))
            ? { ...cardOnTheTable, wrong: true }
            : cardOnTheTable
        ));
        await sleep(820); // wait for the animation to end
        cardsOnTheTable$.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, wrong: false })));
    }
});
