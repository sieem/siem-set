<script lang="ts">
	import { tap } from 'svelte-hammer';
	import { activatedCards$ } from "../../services/Card.store";
	import { Color } from "./Enum/Color.enum";
	import { Filling } from "./Enum/Filling.enum";
	import { Shape } from "./Enum/Shape.enum";
	import type { ICard } from "./ICard.interface";

	export let card: ICard;

	const handleClick = () => {
		card.active = !card.active;

		if (card.active) {
			activatedCards$.update((activatedCards) => ([card, ...activatedCards]));
		} else {
			activatedCards$.update((activatedCards) => activatedCards.filter((activatedCard) => activatedCard !== card));
		}
	}
</script>

<div class="card {card.active ? 'active': ''} {card.showHint ? 'showHint': ''} {card.wrong ? 'wrongSet': ''}" use:tap on:tap={handleClick}>
	{#each Array(card.amount + 1) as _}
		<div
			class="element {Color[card.color].toLowerCase()} {Filling[card.filling].toLowerCase()} {Shape[card.shape].toLowerCase()}">
		</div>
	{/each}
</div>

<style>
	.card {
		--border-width: 5px;
		border-radius: 25px;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		cursor: pointer;
		justify-self: unset;
	}

	.card.active {
		border-color: var(--border-color-active);
	}

	.card.showHint {
		animation-name: showHint;
		animation-duration: 1s;
		animation-iteration-count: 2;
	}

	.card.wrongSet {
		animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	@keyframes showHint {
		0% {background-color: white; border-color: var(--border-color);}
		50% {background-color: var(--border-color-active); border-color: var(--border-color-active);}
		100% {background-color: white; border-color: var(--border-color);}
	}

	@keyframes shake {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}

		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
	}

	.element {
		height: 20%;
		width: 50%;
		background: white;
	}

	/* Color */
	.element.red {
		--color: #E73137;
	}

	.element.green {
		--color: #04A64B;
	}

	.element.blue {
		--color: #4A2683;
	}

	/* Filling */
	.element.empty {
		border: 3px solid var(--color);
	}

	.element.striped {
		border: 3px solid var(--color);
		background: repeating-linear-gradient(90deg,white,white 75%, var(--color) 25%, var(--color));
		background-size: 3% 100%;
	}
	.element.full {
		background: var(--color);
	}

	/* Shape */
	.element.oval {
		border-radius: 25px;
	}
	.element.swirl {
		border-top-left-radius: 100%;
		border-top-right-radius: 5%;
		border-bottom-left-radius: 5%;
		border-bottom-right-radius: 100%;

	}
</style>
