<script lang="ts">
	import Card from './components/Card/card.svelte';
	import type { ICard } from './components/Card/card.interface';
	import { generateAllCards } from './services/card.service';

	const allCards: ICard[] = generateAllCards();
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="field">
		{#each allCards as card}
			<Card {...card}/>
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.field {
		height: 80vh;
		width: 80vw;
		background: green;
		display:grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-gap: 1.5vw;
		padding: 1.5vw;
	}
</style>
