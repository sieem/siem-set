import { cards, cardsOnTheTable, cardsRemaining } from "./Card.service";
import { gameEnded } from "./EndGame.service";
import { relaxedMode } from "./RelaxedMode.service";
import { lastRecordDateTime, score } from "./Score.service";
import { time } from "./Timer.service";

export const saveState = (): void => {
    time.subscribe((_time) => localStorage.setItem('time', String(_time)))();
    score.subscribe((_score) => localStorage.setItem('score', String(_score)))();
    cardsRemaining.subscribe((_cardsRemaining) => localStorage.setItem('cardsRemaining', String(_cardsRemaining)))();
    gameEnded.subscribe((_gameEnded) => localStorage.setItem('gameEnded', String(_gameEnded)))();
    cardsOnTheTable.subscribe((_cardsOnTheTable) => localStorage.setItem('cardsOnTheTable', JSON.stringify(_cardsOnTheTable)))();
    cards.subscribe((_cards) => localStorage.setItem('cards', JSON.stringify(_cards)))();
    lastRecordDateTime.subscribe((_lastRecordDateTime) => localStorage.setItem('lastRecordDateTime', String(_lastRecordDateTime)))();
    relaxedMode.subscribe((_relaxedMode) => localStorage.setItem('relaxedMode', String(_relaxedMode)))();
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

