import { writable } from "svelte/store";
import { cardsOnTheTable } from './Card.service';
import type { ScoresTables } from "./Database.service";
import { highScore, insertScore, score } from "./Score.service";
import { time, timer } from "./Timer.service";

export const gameEnded = writable(false);

export const handleEndOfGame = async () => {
    let _currentScore: ScoresTables['score'];
    let _currentTime: ScoresTables['time'];
    let _highScore: Pick<ScoresTables, 'score' | 'time'>;
    let _unusedCards: ScoresTables['unusedCards'];

    score.subscribe((value) => _currentScore = value)();
    time.subscribe((value) => _currentTime = value)();
    highScore.subscribe((value) => _highScore = value ?? { score: 0, time: 0 })();
    cardsOnTheTable.subscribe((value) => _unusedCards = value.length)();

    timer.set(false);
    gameEnded.set(true);
    insertScore({ score: _currentScore, time: _currentTime, unusedCards: _unusedCards });
    localStorage.clear();
};
