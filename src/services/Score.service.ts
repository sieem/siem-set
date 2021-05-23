import { writable } from "svelte/store";
import { database } from "./Database.service";
import { hintsGiven } from "./Hint.service";
import { time, getLastTimePairFound, setLastTimePairFound } from "./Timer.service";
export const score = writable(0);
export const scoreBoard = writable([]);
export const highScore = writable({ score: 0, time: 0 });

export const countScore = ((activatedCardIds: string[]) => {
    const cardsSplit = activatedCardIds.map((activatedCardId) => activatedCardId.split(''));
    let pairScore = 0;

    for (let i = 0; i < 4; i++) {
        const numberToCheck = cardsSplit.map((el) => el[i]).sort();
        if (new Set(numberToCheck).size === 3) {
            // Elements are all different
            pairScore = pairScore + 3;
        } else {
            // Elements are all the same
            pairScore = pairScore + 1;
        }
    }

    score.update((_currentScore) => {
        let currentTime: number;
        time.subscribe((value) => currentTime = value)();
        let _hintsGiven: number;
        hintsGiven.subscribe((value) => _hintsGiven = value)();

        const newScore = (1 / (currentTime - getLastTimePairFound() + 1)) * pairScore * 10;
        const hintPenalty = [1, 2/3, 1/3, 0];

        return _currentScore + Math.round(newScore * hintPenalty[_hintsGiven]);
    });

    setLastTimePairFound();
});


export const insertScore = async ({ score, time }) => {
    await database.table('scores').put({ score, time, date: Date.now() });
    updateScoreBoardStore();
};

const updateScoreBoardStore = async () => {
    scoreBoard.set(await database.table('scores').orderBy('score').reverse().toArray());
    getLatestHighScore();
};

export const getLatestHighScore = async () => {
    highScore.set(await database.table('scores').orderBy('score').reverse().first());
}
