<script lang="ts">
import { cardsOnTheTable, cardsRemaining, findValidSet } from "../../services/Card.service";
import { hintsGiven } from "../../services/Hint.service";
let amountOfHint = 0;

const handleClick = async () => {
    amountOfHint = amountOfHint < 3 ? ++amountOfHint : 3;
    const validSet = findValidSet($cardsOnTheTable).slice(0, amountOfHint);
    hintsGiven.set(amountOfHint);

    cardsOnTheTable.update((_cardsOnTheTable) => _cardsOnTheTable.map((cardOnTheTable) => (
        { 
            ...cardOnTheTable,
            active: false,
            showHint: validSet.includes(cardOnTheTable),
        }
    )));

    await new Promise((resolve) => setTimeout(() => resolve(''), 2000));

    cardsOnTheTable.update((_cardsOnTheTable) => _cardsOnTheTable.map((cardOnTheTable) => (
        { 
            ...cardOnTheTable,
            showHint: false,
        }
    )));
};

cardsRemaining.subscribe(() => {
    amountOfHint = 0;
    hintsGiven.set(0);
})
</script>

<div class="card" on:click={handleClick}>Hint</div>


<style>

</style>
