import { writable } from "svelte/store";
import { getHintsGiven } from "./Hint.service";
import { time, getLastTimePairFound, setLastTimePairFound } from "./Timer.service";
export const score = writable(0);

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

    let currentTime: number;
    time.subscribe((_time) => currentTime = _time)();

    score.update((_currentScore) => {
        const newScore = (1 / (currentTime - getLastTimePairFound() + 1)) * pairScore * 10;
        const hintsGiven = getHintsGiven();
        const hintPenalty = [1, 0.5, 0];

        return _currentScore + Math.round(newScore * hintPenalty[hintsGiven]);
    });

    setLastTimePairFound();
});
