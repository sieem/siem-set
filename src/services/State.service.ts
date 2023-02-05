import { cards, cardsOnTheTable, cardsRemaining } from "./Card.store";
import { gameEnded } from "./EndGame.service";
import { relaxedMode } from "./RelaxedMode.service";
import { lastRecordDateTime, score } from "./Score.service";
import { time } from "./Timer.service";

export const saveState = (): void => {
    localStorage.setItem('time', String(time.value()));
    localStorage.setItem('score', String(score.value()));
    localStorage.setItem('cardsRemaining', String(cardsRemaining.value()));
    localStorage.setItem('gameEnded', String(gameEnded.value()));
    localStorage.setItem('cardsOnTheTable', JSON.stringify(cardsOnTheTable.value()));
    localStorage.setItem('cards', JSON.stringify(cards.value()));
    localStorage.setItem('lastRecordDateTime', String(lastRecordDateTime.value()));
    localStorage.setItem('relaxedMode', String(relaxedMode.value()));
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

