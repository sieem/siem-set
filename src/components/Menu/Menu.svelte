<script lang="ts">
    import { timerStore } from "../../services/Timer.service";
    let ticking: boolean;

    timerStore.subscribe((_ticking) => ticking = _ticking);

    const handleClick = () => timerStore.set(!ticking);
</script>

<div class="button {ticking ? 'pause': 'play'}" on:click={handleClick}></div>


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
    border-color: #202020;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    z-index: 1;
}

.button.play {
    border-width: calc(var(--size) / 2) 0px calc(var(--size) / 2) var(--size);
    border-color: transparent transparent transparent #202020;
}

.button.pause {
    border-style: double;
    border-width: 0px 0px 0px var(--size);
    border-color: #202020;
}
</style>
