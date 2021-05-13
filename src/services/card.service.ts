import type { ICard } from '../components/Card/ICard.interface';
import { writable } from 'svelte/store';

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

    while (!checkIfThereIsAValidPair(cardsOnTheTable)) {
        cards = [...cardsOnTheTable, ...cards];
        cardsOnTheTable = cards.splice(0, 12);
    }

    cardsRemainingStore.set(cards.length);
    cardsOnTheTableStore.set(cardsOnTheTable);
}

activatedCardsStore.subscribe((_activatedCards: ICard[]) => {
    if (_activatedCards.length === 3) {
        if (checkCardPair(_activatedCards)) {
            cardsOnTheTable = cardsOnTheTable.filter((card) => !_activatedCards.map((activatedCard) => getCardId(activatedCard)).includes(getCardId(card)));

            let newCardsOnTheTable = cards.splice(0, 3);

            while (!checkIfThereIsAValidPair([...newCardsOnTheTable, ...cardsOnTheTable])) {
                cards = [...newCardsOnTheTable, ...cards];
                newCardsOnTheTable = cards.splice(0, 3);
            }

            cardsOnTheTable = [...newCardsOnTheTable, ...cardsOnTheTable];
        }

        cardsRemainingStore.update((existing) => cards.length);
        cardsOnTheTableStore.update((existing) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, active: false })));

        activatedCardsStore.set([]);
    }
});

export const handleCardClick = (card: ICard) => {
    
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