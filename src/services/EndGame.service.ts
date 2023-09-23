import { writeableWithValue } from '../helper/writeableWithValue.helper';
import { cardsOnTheTable } from './Card.store';
import { insertScore, score } from './Score.service';
import { time, timer } from './Timer.service';

export const gameEnded = writeableWithValue(false);

export const handleEndOfGame = async () => {
  timer.set(false);
  gameEnded.set(true);
  insertScore({
    score: score.value(),
    time: time.value(),
    unusedCards: cardsOnTheTable.value().length,
  });
  localStorage.clear();
};
