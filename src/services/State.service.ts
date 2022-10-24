import { cards$, cardsOnTheTable$, cardsRemaining$ } from "./Card.store";
import { gameEnded$ } from "./EndGame.service";
import { relaxedMode$ } from "./RelaxedMode.service";
import { lastRecordDateTime$, score$ } from "./Score.service";
import { time$ } from "./Timer.service";

export const saveState = (): void => {
    time$.subscribe((time) => localStorage.setItem('time', String(time)))();
    score$.subscribe((score) => localStorage.setItem('score', String(score)))();
    cardsRemaining$.subscribe((cardsRemaining) => localStorage.setItem('cardsRemaining', String(cardsRemaining)))();
    gameEnded$.subscribe((gameEnded) => localStorage.setItem('gameEnded', String(gameEnded)))();
    cardsOnTheTable$.subscribe((cardsOnTheTable) => localStorage.setItem('cardsOnTheTable', JSON.stringify(cardsOnTheTable)))();
    cards$.subscribe((cards) => localStorage.setItem('cards', JSON.stringify(cards)))();
    lastRecordDateTime$.subscribe((lastRecordDateTime) => localStorage.setItem('lastRecordDateTime', String(lastRecordDateTime)))();
    relaxedMode$.subscribe((relaxedMode) => localStorage.setItem('relaxedMode', String(relaxedMode)))();
}

export const retrieveState = (): boolean => {
    const time = Number(localStorage.getItem('time'));
    const score = Number(localStorage.getItem('score'));
    const cardsRemaining = Number(localStorage.getItem('cardsRemaining'));
    const gameEnded = localStorage.getItem('gameEnded') === 'true';
    const cardsOnTheTable = JSON.parse(localStorage.getItem('cardsOnTheTable'));
    const cards = JSON.parse(localStorage.getItem('cards'));
    const lastRecordDateTime = Number(localStorage.getItem('lastRecordDateTime'));
    const relaxedMode = localStorage.getItem('relaxedMode') === 'true';
    
    if (![time, score, gameEnded, cardsRemaining, cardsOnTheTable, cards, lastRecordDateTime, relaxedMode].includes(null)) {
        time$.set(time);
        score$.set(score);
        cardsRemaining$.set(cardsRemaining);
        gameEnded$.set(gameEnded);
        cardsOnTheTable$.set(cardsOnTheTable);
        cards$.set(cards);
        lastRecordDateTime$.set(lastRecordDateTime);
        relaxedMode$.set(relaxedMode);

        return true;
    } else {
        return false;
    }
}

