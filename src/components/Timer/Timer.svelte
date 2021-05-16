<script lang="ts">
    import { timeStore, controlTimer, timerStore } from "../../services/Timer.service";
    let time = 0;
    let ticking = false;
    let visibilityChangePausedTheGame = false;

    document.addEventListener('visibilitychange', (ev) => {
        if (document.visibilityState === 'hidden' && ticking) {
            controlTimer(false);
            visibilityChangePausedTheGame = true;
        }

        if (document.visibilityState === 'visible' && visibilityChangePausedTheGame) {
            controlTimer(true);
            visibilityChangePausedTheGame = false;
        }
    });

    timeStore.subscribe((_time) => time = _time);
    timerStore.subscribe((_ticking) => ticking = _ticking);

    const timeDisplayer = (time) => `${Math.floor(time/60)}:${String(time % 60).padStart(2, '0')}`;
</script>

<div>{timeDisplayer(time)}</div>

<style>
div {
    justify-self: center;
}
</style>
