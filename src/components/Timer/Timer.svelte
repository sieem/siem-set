<script lang="ts">
    import { timeDisplayer } from "../../helper/timeDisplayer.helper";
    import { relaxedMode } from "../../services/RelaxedMode.service";
    import { time, timer } from "../../services/Timer.service";

    document.addEventListener('visibilitychange', (ev) => {
        if (document.visibilityState === 'hidden') {
            timer.set(false);
        }
    });

</script>

<div>
    {#if !$relaxedMode}
        {timeDisplayer($time)}
    {/if}
</div>

<style>
div {
    justify-self: center;
}
</style>
