<script lang="ts">
	import { tap } from 'svelte-hammer';
	import { activatedCards } from "../../services/Card.service";
	import { Color } from "./Enum/Color.enum";
	import { Filling } from "./Enum/Filling.enum";
	import { Shape } from "./Enum/Shape.enum";
	import type { ICard } from "./ICard.interface";

	export let card: ICard;

	const handleClick = () => {
		card.active = !card.active;

		if (card.active) {
			activatedCards.update((_activatedCards) => ([card, ..._activatedCards]));
		} else {
			activatedCards.update((_activatedCards) => _activatedCards.filter((_activatedCard) => _activatedCard !== card));
		}
	}
</script>

<div class="card {card.active ? 'active': ''} {card.showHint ? 'showHint': ''}" use:tap={{ interval: 10 }} on:tap={handleClick}>
    {#each Array(card.amount + 1) as i}
		<div
			class="element {Color[card.color].toLowerCase()} {Filling[card.filling].toLowerCase()} {Shape[card.shape].toLowerCase()}">
		</div>
	{/each}
</div>

<style>
	.card {
		--border-color-active: salmon;
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

	@keyframes showHint {
		0% {background-color: white; border-color: var(--border-color);}
		50% {background-color: var(--border-color-active); border-color: var(--border-color-active);}
		100% {background-color: white; border-color: var(--border-color);}
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
	.element.square {
		/* transform: rotate(-45deg) scaleX(0.4); */
	}

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
