import type { ICard } from '../components/Card/ICard.interface';
import { countScore } from './Score.service';
import { handleEndOfGame } from './EndGame.service';
import { sleep } from '../helper/sleep.helper';
import { activatedCards, amountOfCards, cards, cardsOnTheTable, cardsRemaining } from './Card.store';

const correctPairs = ['000', '111', '222', '012'];

const retryAmount = 10;

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

    return null;
}

export const generateAllCards = (): void => {
    let i = -1;

    let _cards = Array(amountOfCards)
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

    let _cardsOnTheTable = _cards.splice(0, 12);

    for (let i = 0; i < retryAmount; i++) {
        if (findValidSet(_cardsOnTheTable)) {
            i = retryAmount;
            continue;
        }

        _cards = [..._cards, ..._cardsOnTheTable];
        _cardsOnTheTable = _cards.splice(0, 12);
    }

    cardsOnTheTable.set(_cardsOnTheTable);
    cards.set(_cards);
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

activatedCards.subscribe(async (_activatedCards: ICard[]) => {
    if (_activatedCards.length !== 3) {
        return;
    }

    let updatedCardsOnTheTable: ICard[];
    let updatedCards = cards.value();

    cardsOnTheTable.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, active: false })));

    activatedCards.set([]);

    if (checkSet(_activatedCards)) {
        const oldCardsOnTheTable = cardsOnTheTable.value();
        updatedCardsOnTheTable = oldCardsOnTheTable.filter((cardOnTheTable) => !getCardIds(_activatedCards).includes(getCardId(cardOnTheTable)));

        let newCardsOnTheTable = updatedCards.splice(0, 3);
        let validSetFound = false;

        for (let i = 0; i < retryAmount; i++) {
            if (findValidSet([...updatedCardsOnTheTable, ...newCardsOnTheTable])) {
                validSetFound = true;
                break;
            }
            updatedCards = [...updatedCards, ...newCardsOnTheTable];
            newCardsOnTheTable = updatedCards.splice(0, 3);
        }

        updatedCardsOnTheTable = oldCardsOnTheTable
            .map((cardOnTheTable) =>
                getCardIds(_activatedCards).includes(getCardId(cardOnTheTable))
                    ? newCardsOnTheTable.splice(0, 1)[0]
                    : cardOnTheTable
            )
            .filter((el) => el !== undefined);

        countScore(getCardIds(_activatedCards));

        cards.set(updatedCards);
        cardsOnTheTable.set(updatedCardsOnTheTable);

        if (!validSetFound) {
            handleEndOfGame();
        }
    } else {
        const activatedCardsIds = getCardIds(_activatedCards);
        cardsOnTheTable.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => activatedCardsIds.includes(getCardId(cardOnTheTable))
            ? { ...cardOnTheTable, wrong: true }
            : cardOnTheTable
        ));
        await sleep(820); // wait for the animation to end
        cardsOnTheTable.update((cardsOnTheTable) => cardsOnTheTable.map((cardOnTheTable) => ({ ...cardOnTheTable, wrong: false })));
    }
});
