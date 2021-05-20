import { writable } from "svelte/store";
import { score } from "./Score.service";
import { timer } from "./Timer.service";

export const endGameMessage = writable('');
export const gameEnded = writable(false);

export const handleEndOfGame = () => {
    let currentScore: number;
    let highScore = Number(localStorage.getItem('highScore'));

    score.subscribe((_score) => currentScore = _score)();
    if (currentScore === highScore) {
        endGameMessage.set(`Wow, you just managed to score the same as your high score! 😏`);
    } else if (currentScore > highScore) {
        endGameMessage.set(`Wow, you just managed to get a new high score! You scored ${currentScore}! Keep up the good work! 🚀`);
        highScore = currentScore;
    } else {
        endGameMessage.set(`Game over, you scored ${currentScore}. But your best high score is ${highScore}. Refresh the page to try again, you can do it! 💪`);
    }

    timer.set(false);
    localStorage.clear();
    localStorage.setItem('highScore', String(currentScore));
    gameEnded.set(true);
};
