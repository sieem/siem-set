<script lang="ts">
	import Card from './components/Card/Card.svelte';
	import Score from './components/Score/Score.svelte';
	import Timer from './components/Timer/Timer.svelte';
	import Menu from './components/Menu/Menu.svelte';
	import CardsRemaining from './components/CardsRemaining/CardsRemaining.svelte';

	import type { ICard } from './components/Card/ICard.interface';
	import { generateAllCards, cardsOnTheTableStore } from './services/Card.service';

    let cardsOnTheTable: ICard[] = [];
    cardsOnTheTableStore.subscribe((_cardsOnTheTable: ICard[]) => cardsOnTheTable = _cardsOnTheTable);

	generateAllCards();
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div id="main">
	<header>
		<Score/>
		<Timer/>
		<Menu/>
	</header>
	<div class="field">
		{#each cardsOnTheTable as card}
			<Card {card}/>
		{/each}
	</div>
	<footer>
		<CardsRemaining/>
		<div></div>
	</footer>
</div>

<style>
	#main {
		height: 100vh;
		display: grid;
		grid-template-rows: 50px 1fr 50px;
		max-width: 600px;
		margin: auto;
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
		grid-gap: 10px;
		padding: 10px;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
