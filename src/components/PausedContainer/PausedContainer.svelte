<script lang="ts">
import { endGameMessage, gameEnded } from "../../services/EndGame.service";
import { restartGame } from "../../services/RestartGame.service";
import { timer } from "../../services/Timer.service";

const restartGameHandler = () => {
    restartGame();
};

const continueHandler = () => {
    timer.set(true);
};

</script>

<div class="paused-container">
    {#if !$gameEnded}
        <div>Game Paused</div>
    {:else}
        <div>
            {$endGameMessage}
        </div>
    {/if}
    {#if !$gameEnded}
        <div class="card" on:click={continueHandler}>Continue</div>
    {/if}
    <div class="card" on:click={restartGameHandler}>Restart</div>
</div>
<style>
.paused-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    align-items: center;
    text-align: center;
}
</style>
