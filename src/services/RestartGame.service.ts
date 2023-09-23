import { generateAllCards } from './Card.service';
import { gameEnded } from './EndGame.service';
import { score } from './Score.service';
import { setLastTimePairFound, time, timer } from './Timer.service';

export const restartGame = () => {
  time.set(0);
  score.set(0);
  gameEnded.set(false);
  timer.set(true);
  setLastTimePairFound();
  generateAllCards();
};
