<script lang="ts">
    import { time, controlTimer, timer } from "../../services/Timer.service";
    let visibilityChangePausedTheGame = false;

    document.addEventListener('visibilitychange', (ev) => {
        if (document.visibilityState === 'hidden' && $timer) {
            controlTimer(false);
            visibilityChangePausedTheGame = true;
        }

        if (document.visibilityState === 'visible' && visibilityChangePausedTheGame) {
            controlTimer(true);
            visibilityChangePausedTheGame = false;
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
