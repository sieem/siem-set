import { getCurrentScore } from "./Score.service";
import { timerStore } from "./Timer.service";

export const handleEndOfGame = () => {
    const currentScore = getCurrentScore();
    const highScore = Number(localStorage.getItem('highScore'));
    if (currentScore > highScore) {
        alert(`Wow, you just managed to get a new high score! You scored ${currentScore}!`);
        localStorage.setItem('highScore', String(currentScore));
    } else {
        alert(`Game over, you scored ${currentScore}. But your best high score is ${highScore}. Refresh the page to try again, you can do it! 💪`);
    }
    timerStore.set(false);
};