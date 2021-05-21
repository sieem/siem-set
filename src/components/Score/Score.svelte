<script lang="ts">
    import { highScore, score } from "../../services/Score.service";
</script>

<div>
    <b>Score</b> {$score}<br>
    {#if $highScore}
        <span>(Best: {$highScore})</span>
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
