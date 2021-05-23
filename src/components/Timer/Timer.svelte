<script lang="ts">
    import { time, timer } from "../../services/Timer.service";

    document.addEventListener('visibilitychange', (ev) => {
        if (document.visibilityState === 'hidden') {
            timer.set(false);
        }
    });

    const timeDisplayer = (time) => `${Math.floor(time/60)}:${String(time % 60).padStart(2, '0')}`;
</script>

<div>{timeDisplayer($time)}</div>

<style>
div {
    justify-self: center;
}
</style>
