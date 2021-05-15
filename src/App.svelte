<script lang="ts">
	import Card from './components/Card/Card.svelte';
	import Score from './components/Score/Score.svelte';
	import Timer from './components/Timer/Timer.svelte';
	import Menu from './components/Menu/Menu.svelte';
	import Help from './components/Help/Help.svelte';
	import CardsRemaining from './components/CardsRemaining/CardsRemaining.svelte';
	import type { ICard } from './components/Card/ICard.interface';
	import { generateAllCards, cardsOnTheTableStore } from './services/Card.service';
	import { requestWakeLock } from './services/WakeLock.service';
	import { timerStore } from './services/Timer.service';

	let cardsOnTheTable: ICard[] = [];
	let ticking: boolean;
	
	cardsOnTheTableStore.subscribe((_cardsOnTheTable: ICard[]) => cardsOnTheTable = _cardsOnTheTable);
	timerStore.subscribe((_ticking) => ticking = _ticking);
	
	generateAllCards();
	requestWakeLock();
</script>

<svelte:head>
	<title>SiemSet</title>
</svelte:head>

<div id="main">
	<header>
		<Score/>
		<Timer/>
		<Menu/>
	</header>
	{#if ticking}
		<div class="field">
			{#each cardsOnTheTable as card}
				<Card {card}/>
			{/each}
		</div>
	{:else}
		<div class="paused-container">
			<div>Game Paused</div>
		</div>
	{/if}
	
	<footer>
		<CardsRemaining/>
		<a href="https://github.com/sieem/siem-set/" target="_blank" class="github">
			<svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
		</a>
		<Help/>
	</footer>
</div>

<style>
	#main {
		--gap: 10px;
		height: 100vh;
		display: grid;
		grid-template-rows: 50px 1fr 50px;
		max-width: 600px;
		margin: auto;
		padding: var(--gap);
		position: relative;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.field {
		display:grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		grid-gap: var(--gap);
	}


	/* iPad */
	@media screen and (min-width: 768px) and (max-height: 1024px) {
		#main {
			max-width: 800px;
		}
		.field {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
		}
	}


	.paused-container {
		display: grid;
		place-items: center;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.github {
		display: flex;
	}
</style>
