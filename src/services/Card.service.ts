import type { ICard } from '../components/Card/ICard.interface';
import { writable } from 'svelte/store';
import { timerStore } from './Timer.service';

let cards = [];
let cardsOnTheTable: ICard[] = [];
export const cardsOnTheTableStore = writable(cardsOnTheTable);
export const activatedCardsStore = writable([]);
const correctPairs = ['000', '111', '222', '012'];
export const cardsRemainingStore = writable(81);

const getCardId = ({ amount, color, filling, shape }: ICard): string => `${amount}${color}${filling}${shape}`;

const checkIfThereIsAValidPair = (cards: ICard[]): boolean => {
    for (let i = 0; i < Math.pow(cards.length, 3); i++) {
        const cardPair = i
            .toString(12)
            .padStart(3, '0')
            .split('')
            .map((el) => parseInt(el, 12))
            .map((el) => cards[el]);

        if (new Set(cardPair).size !== 3) {
            continue;
        }


        if (checkCardPair(cardPair)) {
            return true;
        };
    }

    console.log('no valid pairs found');
    return false;
}

export const generateAllCards = (): void => {
    let i = -1;

    cards = Array(81)
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
                active: false,
            };
        })
        .sort(() => 
            Math.random() > Math.random() ? -1 : 1
        );

    cardsOnTheTable = cards.splice(0, 12);

    for (let i = 0; i < 500; i++) {
        if (checkIfThereIsAValidPair(cardsOnTheTable)) {
            i = 500;
            continue;
        }

        cards = [...cards, ...cardsOnTheTable];
        cardsOnTheTable = cards.splice(0, 12);
    }

    cardsRemainingStore.set(cards.length);
    cardsOnTheTableStore.set(cardsOnTheTable);
}

const checkCardPair = (cards: ICard[]): boolean => {
    if (cards.includes(undefined)) {
        alert('No valid sets to be found, you won the game');
        timerStore.set(false);
        return true;
    }
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

activatedCardsStore.subscribe((_activatedCards: ICard[]) => {
    if (_activatedCards.length === 3) {
        if (checkCardPair(_activatedCards)) {
            const oldCardsOnTheTable = cardsOnTheTable;
            cardsOnTheTable = cardsOnTheTable.filter((cardOnTheTable) => !_activatedCards.map((activatedCard) => getCardId(activatedCard)).includes(getCardId(cardOnTheTable)));

            let newCardsOnTheTable = cards.splice(0, 3);

            for (let i = 0; i < 500; i++) {
                if (checkIfThereIsAValidPair([...cardsOnTheTable, ...newCardsOnTheTable])) {
                    i = 500;
                    continue;
                }
                cards = [...cards, ...newCardsOnTheTable];
                newCardsOnTheTable = cards.splice(0, 3);
            }

            cardsOnTheTable = oldCardsOnTheTable.map((cardOnTheTable) => 
                _activatedCards.map((activatedCard) => getCardId(activatedCard)).includes(getCardId(cardOnTheTable))
                ? newCardsOnTheTable.splice(0,1)[0]
                : cardOnTheTable
            )
        }

        cardsRemainingStore.update((existing) => cards.length);
        cardsOnTheTableStore.update((existing) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, active: false })));

        activatedCardsStore.set([]);
    }
});
