import { writable } from "svelte/store";
import { getHintsGiven } from "./Hint.service";
import { getCurrentTime, getLastTimePairFound, setLastTimePairFound } from "./Timer.service";
let currentScore = 0;
export const score = writable(currentScore);

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

    const newScore = Math.round((1 / (getCurrentTime() - getLastTimePairFound())) * pairScore * 10);
    const hintsGiven = getHintsGiven();
    const hintPenalty = [1, 0.5, 0];

    currentScore = currentScore + (newScore * hintPenalty[hintsGiven]);
    score.set(currentScore);

    setLastTimePairFound();
});

export const getCurrentScore = (): number => currentScore;
