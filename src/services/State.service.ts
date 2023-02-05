import { cards, cardsOnTheTable, cardsRemaining } from "./Card.store";
import { gameEnded } from "./EndGame.service";
import { relaxedMode } from "./RelaxedMode.service";
import { lastRecordDateTime, score } from "./Score.service";
import { time } from "./Timer.service";

export const saveState = (): void => {
    time.subscribe((time) => localStorage.setItem('time', String(time)))();
    score.subscribe((score) => localStorage.setItem('score', String(score)))();
    cardsRemaining.subscribe((cardsRemaining) => localStorage.setItem('cardsRemaining', String(cardsRemaining)))();
    gameEnded.subscribe((gameEnded) => localStorage.setItem('gameEnded', String(gameEnded)))();
    cardsOnTheTable.subscribe((cardsOnTheTable) => localStorage.setItem('cardsOnTheTable', JSON.stringify(cardsOnTheTable)))();
    cards.subscribe((cards) => localStorage.setItem('cards', JSON.stringify(cards)))();
    lastRecordDateTime.subscribe((lastRecordDateTime) => localStorage.setItem('lastRecordDateTime', String(lastRecordDateTime)))();
    relaxedMode.subscribe((relaxedMode) => localStorage.setItem('relaxedMode', String(relaxedMode)))();
}

export const retrieveState = (): boolean => {
    const _time = Number(localStorage.getItem('time'));
    const _score = Number(localStorage.getItem('score'));
    const _cardsRemaining = Number(localStorage.getItem('cardsRemaining'));
    const _gameEnded = localStorage.getItem('gameEnded') === 'true';
    const _cardsOnTheTable = JSON.parse(localStorage.getItem('cardsOnTheTable'));
    const _cards = JSON.parse(localStorage.getItem('cards'));
    const _lastRecordDateTime = Number(localStorage.getItem('lastRecordDateTime'));
    const _relaxedMode = localStorage.getItem('relaxedMode') === 'true';
    
    if (![_time, _score, _gameEnded, _cardsRemaining, _cardsOnTheTable, _cards, _lastRecordDateTime, _relaxedMode].includes(null)) {
        time.set(_time);
        score.set(_score);
        cardsRemaining.set(_cardsRemaining);
        gameEnded.set(_gameEnded);
        cardsOnTheTable.set(_cardsOnTheTable);
        cards.set(_cards);
        lastRecordDateTime.set(_lastRecordDateTime);
        relaxedMode.set(_relaxedMode);

        return true;
    } else {
        return false;
    }
}

