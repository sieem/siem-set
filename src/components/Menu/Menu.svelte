<script lang="ts">
    import { timer } from "../../services/Timer.service";
    let lastClick: Date;

    const handleClick = () => {
        if (Number(new Date()) - Number(lastClick) < 300) {
            if (localStorage.getItem('debugMode') === 'true') {
                localStorage.setItem('debugMode', 'false');
                screenLog.destroy();
            } else {
                localStorage.setItem('debugMode', 'true');
                screenLog.init();
            }
        }
        lastClick = new Date();
        timer.update((ticking) => !ticking);
    };
</script>

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
    border-color: #202020;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    z-index: calc(2147483647 + 1); /* higher than screenlog */
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
