<script lang="ts">
    import { timeStore, controlTimer } from "../../services/Timer.service";
    let time = 0;

    document.addEventListener('visibilitychange', (ev) => controlTimer(document.visibilityState === 'visible'));

    timeStore.subscribe((_time) => time = _time);
</script>

<div>{time}</div>

<style>

</style>
