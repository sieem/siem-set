import type { ICard } from '../components/Card/card.interfacerd/card.interface';
let cards = [];

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