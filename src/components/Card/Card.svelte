<script lang="ts">
	import { activatedCardsStore } from "../../services/Card.service";
	import { Color } from "./Enum/Color.enum";
	import { Filling } from "./Enum/Filling.enum";
	import { Shape } from "./Enum/Shape.enum";
	import type { ICard } from "./ICard.interface";

	export let card: ICard;

	const handleClick = async () => {
		card.active = !card.active;

		if (card.active) {
			activatedCardsStore.update((_activatedCards) => ([card, ..._activatedCards]));
		} else {
			activatedCardsStore.update((_activatedCards) => _activatedCards.filter((_activatedCard) => _activatedCard !== card));
		}
	}
</script>

<div class="card {card.active ? 'active': ''}" on:click={handleClick}>
    {#each Array(card.amount + 1) as i}
		<div
			class="element {Color[card.color].toLowerCase()} {Filling[card.filling].toLowerCase()} {Shape[card.shape].toLowerCase()}">
		</div>
	{/each}
</div>

<style>
	.card {
		background: white;
		border-radius: 25px;
		border: 5px solid #aaa;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		cursor: pointer;
	}

	.card.active {
		border-color: salmon;
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
