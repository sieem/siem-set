<script lang="ts">
    import { timeDisplayer } from "../../helper/timeDisplayer.helper";
    import { relaxedMode$ } from "../../services/RelaxedMode.service";
    import { highScore$, score$ } from "../../services/Score.service";
</script>

<div>
    {#if !$relaxedMode$}
        <b>Score</b> {$score$}<br>
        {#if $highScore$}
            <span>(Best: {$highScore$.score$} in {timeDisplayer($highScore$.time)})</span>
        {/if}
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
