import { writable } from "svelte/store";
import { cardsOnTheTable$ } from "./Card.store";
import type { ScoresTables } from "./Database.service";
import { insertScore, score$ } from "./Score.service";
import { time$, timer$ } from "./Timer.service";

export const gameEnded$ = writable(false);

export const handleEndOfGame = async () => {
    let currentScore: ScoresTables['score'];
    let currentTime: ScoresTables['time'];
    let unusedCards: ScoresTables['unusedCards'];

    score$.subscribe((value) => currentScore = value)();
    time$.subscribe((value) => currentTime = value)();
    cardsOnTheTable$.subscribe((value) => unusedCards = value.length)();

    timer$.set(false);
    gameEnded$.set(true);
    insertScore({ score: currentScore, time: currentTime, unusedCards: unusedCards });
    localStorage.clear();
};
