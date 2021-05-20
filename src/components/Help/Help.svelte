<script lang="ts">
    import { timer } from "../../services/Timer.service";
    let showHelp = false;

    const handleClick = () => {
        showHelp = !showHelp;
        timer.set(!showHelp);
    };
</script>

<div class="card" on:click={handleClick}>Help</div>

{#if showHelp}
    <div class="help-container">
        <div class="close-container">
            <div class="card" on:click={handleClick}>X</div>
        </div>
        <h1>How to play set:</h1>
        <p>
            The goal of the game is to find a valid set of 3 cards in the 12 cards on the board.
            Once you have found such a set, you can click the three cards and if the set is valid, three new cards will be added to the board.
            The game ends when there are no new cards to be added and all valid sets are found.
        </p>

        <p>
            To understand what makes a set valid, we first have to see how a card looks like.
        </p>

        <h2>The four elements of a card</h2>
        <p>There are 81 unique cards in the game. Every card is made up of 4 elements: the color, the shape, the filling and the amount of shapes.</p>
        <h3>The color:</h3>
        <img src="/images/help/example-color.png" alt="">
        <h3>The shape:</h3>
        <img src="/images/help/example-shape.png" alt="">
        <h3>Filling of the shape:</h3>
        <img src="/images/help/example-filling.png" alt="">
        <h3>Amount of shapes:</h3>
        <img src="/images/help/example-amount.png" alt="">

        <h2>A valid set</h2>
        <p>A set is valid when the four elements are in balance. This means that for every element (color, shape, filling & amount), everything of that element has to be the same or everything has to be different.</p>
        <img src="/images/help/example-set-1.png" alt="">
        <p><em>This set is valid because the colors are all different, but the shape, the filling and the amount are the same.</em></p>
        <p></p>
        <img src="/images/help/example-set-2.png" alt="">
        <p><em>This set is valid because the colors and shapes are all different, but the filling and the amount are the same.</em></p>
        <p></p>
        <img src="/images/help/example-set-3.png" alt="">
        <p><em>This set is valid because the color, the shapes, the filling and the amount are all different.</em></p>
        <p></p>
    </div>
{/if}


<style>
.help-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #ADD8E6E6;
    z-index: calc(2147483647 + 2); /* Above play/pause button */
    padding: 50px;
    overflow: auto;
}

.help-container * {
    user-select: text;
}

.close-container {
    display: flex;
    justify-content: flex-end;
}

h1 {
    margin-bottom: 5px;
}

h2 {
    margin-top: 20px;
}

h3 {
    margin-top: 15px;
}

p {
    margin-bottom: 10px;
}

img {
    width: 100%;
    margin-top: 5px;
}
</style>
