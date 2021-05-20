import { cards, cardsOnTheTable, cardsRemaining } from "./Card.service";
import { score } from "./Score.service";
import { time } from "./Timer.service";

export const saveState = (): void => {
    console.log('saveState');
    time.subscribe((_time) => localStorage.setItem('time', String(_time)))();
    score.subscribe((_score) => localStorage.setItem('score', String(_score)))();
    cardsRemaining.subscribe((_cardsRemaining) => localStorage.setItem('cardsRemaining', String(_cardsRemaining)))();
    cardsOnTheTable.subscribe((_cardsOnTheTable) => localStorage.setItem('cardsOnTheTable', JSON.stringify(_cardsOnTheTable)))();
    cards.subscribe((_cards) => localStorage.setItem('cards', JSON.stringify(_cards)))();
}

export const retrieveState = (): boolean => {
    const _time = Number(localStorage.getItem('time'));
    const _score = Number(localStorage.getItem('score'));
    const _cardsRemaining = Number(localStorage.getItem('cardsRemaining'));
    const _cardsOnTheTable = JSON.parse(localStorage.getItem('cardsOnTheTable'));
    const _cards = JSON.parse(localStorage.getItem('cards'));

    if (![_time, _score, _cardsRemaining, _cardsOnTheTable, _cards].includes(null)) {
        console.log(true);
        time.set(_time);
        score.set(_score);
        cardsRemaining.set(_cardsRemaining);
        cardsOnTheTable.set(_cardsOnTheTable);
        cards.set(_cards);

        return true;
    } else {
        return false;
    }
}
