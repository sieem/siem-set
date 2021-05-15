<script lang="ts">
	import Card from './components/Card/Card.svelte';
	import Score from './components/Score/Score.svelte';
	import Timer from './components/Timer/Timer.svelte';
	import Menu from './components/Menu/Menu.svelte';
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

	.paused-container {
		display: grid;
		place-items: center;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
