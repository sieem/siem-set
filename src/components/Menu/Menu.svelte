<script lang="ts">
    import { gameEnded } from "../../services/EndGame.service";
    import { restartGame } from "../../services/RestartGame.service";
    import { timer } from "../../services/Timer.service";

    const handleClick = () => {
        timer.update((ticking) => !ticking);

        if ($gameEnded) {
            restartGame();
        }
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="button {$timer ? 'pause': 'play'}" on:click={handleClick}></div>


<style>
div {
    justify-self: end;
}

.button {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    border-style: solid;
    border-width: calc(var(--size) / 2);
    border-color: var(--button-color);
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    z-index: 10;
}

.button.play {
    border-width: calc(var(--size) / 2) 0px calc(var(--size) / 2) var(--size);
    border-color: transparent transparent transparent var(--button-color);
}

.button.pause {
    border-style: double;
    border-width: 0px 0px 0px var(--size);
    border-color: var(--button-color);
}
</style>
