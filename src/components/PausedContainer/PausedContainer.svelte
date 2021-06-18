<script lang="ts">
import { gameEnded } from "../../services/EndGame.service";
import { relaxedMode } from "../../services/RelaxedMode.service";
import { restartGame } from "../../services/RestartGame.service";
import { timer } from "../../services/Timer.service";
import ScoreBoard from "../ScoreBoard/ScoreBoard.svelte";

const restartGameHandler = () => {
    restartGame();
};

const continueHandler = () => {
    timer.set(true);
};

const onChange = () => {
    relaxedMode.update((value) => value);
}

</script>

<div class="paused-container">
    <h3>{$gameEnded ? 'Game over' : 'Game paused'}</h3>
    {#if !$relaxedMode}
                <ScoreBoard/>
    {/if}
    <div class="row">
        <div class="card" on:click={restartGameHandler}>Restart</div>
        {#if !$gameEnded}
            <div class="card" on:click={continueHandler}>Continue</div>
        {/if}
    </div>
    <div>
        <span>Relaxed mode</span>
        <input type="checkbox" bind:checked={$relaxedMode} on:change="{onChange}">
    </div>
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

.row {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
</style>
