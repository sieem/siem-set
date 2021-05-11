import type { ICard } from '../components/Card/card.interface';

let cards = [];
let activatedCardPromises = [];

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

    return cards.splice(0,12);
}

export const handleCardClick = async (cardId: string, active: boolean) => {
    const activatedCardPromise = {
        cardId,
        promise: null,
        resolve: null,
    };
    activatedCardPromise.promise = new Promise((resolve) => activatedCardPromise.resolve = resolve)

    if (active) {
        activatedCardPromises.push(activatedCardPromise);
    } else {
        activatedCardPromises = activatedCardPromises.filter((el) => el.cardId !== cardId);
    }

    if (activatedCardPromises.length === 3) {
        await new Promise((resolve) => setTimeout(() => resolve(''), 100));
        for (const activatedCard of activatedCardPromises) {
            activatedCard.resolve();
        }
        activatedCardPromises = [];
    }

    return activatedCardPromise.promise;
}

