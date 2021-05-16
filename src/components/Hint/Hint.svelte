<script lang="ts">
import { cardsOnTheTable, cardsRemaining, findValidSet } from "../../services/Card.service";
import { setHintsGiven } from "../../services/Hint.service";
let amountOfHint = 1;

const handleClick = async () => {
    const validSet = findValidSet($cardsOnTheTable).slice(0, amountOfHint);
    setHintsGiven(amountOfHint);
    amountOfHint = 2;

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
    amountOfHint = 1;
    setHintsGiven(0);
})
</script>

<div class="card" on:click={handleClick}>Hint</div>


<style>
.card {
    justify-self: center;
    cursor: pointer;
    background: white;
    border-radius: 10px;
    border: 2px solid #aaa;
    padding: 5px;
    height: 35px;
    font-weight: bold;
    line-height: 1.4;
    text-align: center;
    cursor: pointer;
    justify-self: center;
}
</style>
