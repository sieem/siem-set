import { cards, cardsOnTheTable, cardsRemaining } from "./Card.store";
import { gameEnded } from "./EndGame.service";
import { relaxedMode } from "./RelaxedMode.service";
import { lastRecordDateTime, score } from "./Score.service";
import { time } from "./Timer.service";

const writeablesToSave = { time, score, gameEnded, cardsOnTheTable, cards, lastRecordDateTime, relaxedMode };

export const saveState = (): void => {
    const entriesWithValue = Object.entries(writeablesToSave).map(([key, writable]) => [key, writable.value()]);
    const state = Object.fromEntries(entriesWithValue);
    localStorage.setItem('state', JSON.stringify(state));
}

export const retrieveState = (): boolean => {
    try {
        const state = JSON.parse(localStorage.getItem('state'));
        //@ts-expect-error TS doesn't know what the writable will accept
        Object.entries(writeablesToSave).forEach(([key, writable]) => writable.set(state[key]));
        return true;

    } catch (error) {
        return false;
    }
}

