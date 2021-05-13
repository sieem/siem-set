import type { ICard } from '../components/Card/ICard.interface';
import { writable } from 'svelte/store';

let cards = [];
let cardsOnTheTable;
let activatedCardPromises = [];
const correctPairs = ['000', '111', '222', '012'];
export const cardsRemaining = writable('cardsRemaining');

const getCardId = ({ amount, color, filling, shape }: ICard): string => `${amount}${color}${filling}${shape}`;

const checkIfThereIsAValidPair = (cards: ICard[]): boolean => {
    for (let i = 0; i < Math.pow(cards.length, 3); i++) {
        const cardPair = i
            .toString(12)
            .padStart(3, '0')
            .split('')
            .map((el) => parseInt(el, 12))
            .map((el) => cards[el]);
        
        if (checkCardPair(cardPair)) {
            console.log('valid pair found');
            return true;
        };
    }

    console.log('no valid pairs found');
    return false;
}

export const generateAllCards = (): ICard[] => {
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
            };
        })
        .sort(() => 
            Math.random() > Math.random() ? -1 : 1
        );

    cardsOnTheTable = cards.splice(0, 12);

    while (!checkIfThereIsAValidPair(cardsOnTheTable)) {
        cards = [...cardsOnTheTable, ...cards];
        cardsOnTheTable = cards.splice(0, 12);
    }

    cardsRemaining.set(String(cards.length));

    return cardsOnTheTable;
}

export const handleCardClick = async (card: ICard, active: boolean) => {
    const cardId = getCardId(card);
    const activatedCardPromise = {
        card,
        cardId,
        promise: null,
        resolve: null,
        reject: null,
    };
    activatedCardPromise.promise = new Promise((resolve, reject) => {
        activatedCardPromise.resolve = resolve;
        activatedCardPromise.reject = reject;
    })

    if (active) {
        activatedCardPromises.push(activatedCardPromise);
    } else {
        activatedCardPromises = activatedCardPromises.filter((el) => el.cardId !== cardId);
    }

    if (activatedCardPromises.length === 3) {
        await new Promise((resolve) => setTimeout(() => resolve(''), 100));
        if (checkCardPair(activatedCardPromises.map((el) => el.card))) {
            cardsOnTheTable = cardsOnTheTable.filter((card) => !activatedCardPromises.map((el) => el.cardId).includes(getCardId(card)));

            let newCardsOnTheTable = cards.splice(0, 3);

            while (!checkIfThereIsAValidPair([...newCardsOnTheTable, ...cardsOnTheTable])) {
                cards = [...newCardsOnTheTable, ...cards];
                newCardsOnTheTable = cards.splice(0, 3);
            }

            for (const activatedCard of activatedCardPromises) {
                activatedCard.resolve(...newCardsOnTheTable.splice(0,1));
            }
        } else {
            for (const activatedCard of activatedCardPromises) {
                activatedCard.reject();
            }
        }
        activatedCardPromises = [];
        cardsRemaining.update((existing) => String(cards.length));
    }

    return activatedCardPromise.promise;
}

const checkCardPair = (activatedCards: ICard[]): boolean => {
    const activatedCardIds = activatedCards.map((card) => getCardId(card));
    const activatedCardsSplit = activatedCardIds.map((activatedCardId) => activatedCardId.split(''));
    for (let i = 0; i < 4; i++) {
        const numberToCheck = activatedCardsSplit.map((el) => el[i]).sort().join('');
        if (!correctPairs.includes(numberToCheck)) {
            return false;
        }
    }

    return true;
}