import { writable } from "svelte/store";
import { highScore, insertScore, score } from "./Score.service";
import { time, timer } from "./Timer.service";

export const endGameMessage = writable('');
export const gameEnded = writable(false);

export const handleEndOfGame = async () => {
    let _currentScore: number;
    let _currentTime: number;
    let _highScore: {score: number, time: number};

    score.subscribe((value) => _currentScore = value)();
    time.subscribe((value) => _currentTime = value)();
    highScore.subscribe((value) => _highScore = value)();

    if (_currentScore === _highScore.score) {
        endGameMessage.set(`Wow, you just managed to score the same as your high score! 😏`);
    } else if (_currentScore > _highScore.score) {
        endGameMessage.set(`Wow, you just managed to get a new high score! You scored ${_currentScore}! Keep up the good work! 🚀`);
    } else {
        endGameMessage.set(`Game over, you scored ${_currentScore}. But your best high score is ${_highScore.score}. Try again, you can do it! 💪`);
    }


    timer.set(false);
    gameEnded.set(true);
    insertScore({ score: _currentScore, time: _currentTime });
    localStorage.clear();
};
