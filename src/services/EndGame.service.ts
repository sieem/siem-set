import { writable } from "svelte/store";
import { highScore, insertScore, score } from "./Score.service";
import { time, timer } from "./Timer.service";

export const gameEnded = writable(false);

export const handleEndOfGame = async () => {
    let _currentScore: number;
    let _currentTime: number;
    let _highScore: {score: number, time: number};

    score.subscribe((value) => _currentScore = value)();
    time.subscribe((value) => _currentTime = value)();
    highScore.subscribe((value) => _highScore = value ?? { score: 0, time: 0 })();

    timer.set(false);
    gameEnded.set(true);
    insertScore({ score: _currentScore, time: _currentTime });
    localStorage.clear();
};
