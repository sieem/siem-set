<script lang="ts">
  import { darkMode } from '../../services/DarkMode.service';
  import { gameEnded } from '../../services/EndGame.service';
  import { relaxedMode } from '../../services/RelaxedMode.service';
  import { restartGame } from '../../services/RestartGame.service';
  import { playedGames } from '../../services/Score.service';
  import { timer } from '../../services/Timer.service';
  import ScoreBoard from '../ScoreBoard/ScoreBoard.svelte';

  const restartGameHandler = () => {
    restartGame();
  };

  const continueHandler = () => {
    timer.set(true);
  };

  const changeRelaxedMode = () => {
    relaxedMode.update((value) => value);
  };

  const changeDarkMode = () => {
    darkMode.update((value) => value);
  };
</script>

<div class="paused-container">
  <div>
    <h3>{$gameEnded ? 'Game over' : 'Game paused'}</h3>
    {#if $playedGames > 0}
      <div class="playedGames">Games played: {$playedGames}</div>
    {/if}
  </div>

  {#if !$relaxedMode}
    <ScoreBoard />
  {/if}
  <div class="row">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card" on:click={restartGameHandler}>Restart</div>
    {#if !$gameEnded}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="card" on:click={continueHandler}>Continue</div>
    {/if}
  </div>
  <div>
    <span>Relaxed mode</span>
    <input type="checkbox" bind:checked={$relaxedMode} on:change={changeRelaxedMode} />
  </div>

  <div>
    <span>Dark mode</span>
    <input type="checkbox" bind:checked={$darkMode} on:change={changeDarkMode} />
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

  .playedGames {
    font-style: italic;
    font-size: 0.75rem;
  }
</style>
