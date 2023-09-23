import { cards, cardsOnTheTable } from './Card.store';
import { darkMode } from './DarkMode.service';
import { gameEnded } from './EndGame.service';
import { relaxedMode } from './RelaxedMode.service';
import { lastRecordDateTime, score } from './Score.service';
import { time } from './Timer.service';

const writeablesToSave = {
  time,
  score,
  gameEnded,
  cardsOnTheTable,
  cards,
  lastRecordDateTime,
  relaxedMode,
  darkMode,
};

export const saveState = (): void => {
  const entriesWithValue = Object.entries(writeablesToSave).map(([key, writable]) => [
    key,
    writable.value(),
  ]);
  const state = Object.fromEntries(entriesWithValue);
  localStorage.setItem('state', JSON.stringify(state));
};

export const retrieveState = (): boolean => {
  try {
    //@ts-expect-error JSON parse doesn't have typing
    const state = JSON.parse(localStorage.getItem('state'));
    //@ts-expect-error TS doesn't know what the writable will accept
    Object.entries(writeablesToSave).forEach(([key, writable]) => writable.set(state[key]));
    return true;
  } catch (error) {
    return false;
  }
};
