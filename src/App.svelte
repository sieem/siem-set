<script lang="ts">
	import Card from './components/Card/Card.svelte';
	import Score from './components/Score/Score.svelte';
	import Timer from './components/Timer/Timer.svelte';
	import Menu from './components/Menu/Menu.svelte';
	import Help from './components/Help/Help.svelte';
	import Hint from './components/Hint/Hint.svelte';
	import Social from './components/Social/Social.svelte';
	import CardsRemaining from './components/CardsRemaining/CardsRemaining.svelte';
	import { generateAllCards, cardsOnTheTable } from './services/Card.service';
	import { requestWakeLock } from './services/WakeLock.service';
	import { setLastTimePairFound, time, timer } from './services/Timer.service';
	import { score } from './services/Score.service';
	import { retrieveState, saveState } from './services/State.service';
	
	if (!retrieveState()) {
		generateAllCards();
	}

	document.addEventListener('visibilitychange', (ev) => document.visibilityState === 'visible' ? requestWakeLock() : saveState());

	const restartGame = () => {
		time.set(0);
		score.set(0);
		timer.update((ticking) => !ticking);
		setLastTimePairFound();
		generateAllCards();
	};
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
	{#if $timer}
		<div class="field">
			{#each $cardsOnTheTable as card}
				<Card {card}/>
			{/each}
		</div>
	{:else}
		<div class="paused-container">
			<div>Game Paused</div>
			<div class="card" on:click={restartGame}>Restart</div>
		</div>
	{/if}
	
	<footer>
		<CardsRemaining/>
		<Hint/>
		<Help/>
		<Social/>
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

	header,
	footer {
		align-items: center;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}



	.field {
		display:grid;
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


	.paused-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		align-items: center;
	}

	footer {
		grid-template-columns: repeat(4, 1fr);
	}
</style>
