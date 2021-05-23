<script lang="ts">
    import { timeDisplayer } from "../../helper/timeDisplayer.helper";
    import { time, timer } from "../../services/Timer.service";

    document.addEventListener('visibilitychange', (ev) => {
        if (document.visibilityState === 'hidden') {
            timer.set(false);
        }
    });

</script>

<div>{timeDisplayer($time)}</div>

<style>
div {
    justify-self: center;
}
</style>
