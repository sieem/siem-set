<script lang="ts">
    import { scoreStore } from "../../services/Score.service";
    let score = 0;
    const highScore = Number(localStorage.getItem('highScore'));

    scoreStore.subscribe((_score) => score = _score);
</script>

<div>
    <b>Score</b> {score}<br>
    {#if highScore}
        <span>(Best: {highScore})</span>
    {/if}
</div>

<style>
div {
    justify-self: start;
    line-height: 0.9;
}

span {
    font-size: 70%;
}
</style>
