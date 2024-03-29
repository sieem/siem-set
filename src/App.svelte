<script lang="ts">
  import { onMount } from 'svelte';
  import Card from './components/Card/Card.svelte';
  import CardsRemaining from './components/CardsRemaining/CardsRemaining.svelte';
  import Help from './components/Help/Help.svelte';
  import Hint from './components/Hint/Hint.svelte';
  import InstallDialog from './components/InstallDialog/InstallDialog.svelte';
  import Menu from './components/Menu/Menu.svelte';
  import PausedContainer from './components/PausedContainer/PausedContainer.svelte';
  import Score from './components/Score/Score.svelte';
  import Social from './components/Social/Social.svelte';
  import Timer from './components/Timer/Timer.svelte';
  import {
    activateServiceWorker,
    showInstallDialog,
  } from './services/ActivateServiceWorker.service';
  import { generateAllCards } from './services/Card.service';
  import { cardsOnTheTable } from './services/Card.store';
  import { darkMode } from './services/DarkMode.service';
  import { gameEnded } from './services/EndGame.service';
  import {
    setLatestHighScore,
    setPlayedGames,
    updateScoreBoardStore,
  } from './services/Score.service';
  import { retrieveState, saveState } from './services/State.service';
  import { timer } from './services/Timer.service';
  import { requestWakeLock } from './services/WakeLock.service';
  activateServiceWorker();

  if (!retrieveState()) {
    generateAllCards();
  }

  updateScoreBoardStore();
  setLatestHighScore();
  setPlayedGames();

  timer.set(!$gameEnded);



  onMount(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => darkMode.set(e.matches));

    requestWakeLock();

    document.addEventListener('visibilitychange', () =>
        document.visibilityState === 'visible' ? requestWakeLock() : saveState(),
    );
  })
</script>

<svelte:head>
  <title>SiemSet</title>
</svelte:head>

<div id="main" class:dark={$darkMode}>
  <header>
    <Score />
    <Timer />
    <Menu />
  </header>
  {#if $timer && !$gameEnded}
    <div class="field">
      {#each $cardsOnTheTable as card}
        <Card {card} />
      {/each}
    </div>
  {:else}
    <PausedContainer />
  {/if}

  <footer>
    <CardsRemaining />
    {#if $timer && !$gameEnded}
      <Hint />
    {:else}
      <div></div>
    {/if}
    <Help />
    {#if $showInstallDialog}
      <InstallDialog />
    {:else}
      <Social />
    {/if}
  </footer>
</div>

<style>
  #main {
    --gap: 10px;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    max-width: 600px;
    margin: auto;
    padding: var(--gap);
    position: relative;
  }

  header,
  footer {
    align-items: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .field {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: var(--gap);
  }

  /* iPad */
  @media screen and (min-width: 768px) and (max-height: 1024px) {
    #main {
      max-width: 800px;
    }
    .field {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }
  }

  footer {
    grid-template-columns: repeat(4, 1fr);
  }
</style>
