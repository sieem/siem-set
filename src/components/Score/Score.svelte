<script lang="ts">
    import { score } from "../../services/Score.service";
    const highScore = Number(localStorage.getItem('highScore'));
</script>

<div>
    <b>Score</b> {$score}<br>
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
