<script lang="ts">
  import { formatTime } from '../../helper/formatTime.helper';
  import { relaxedMode } from '../../services/RelaxedMode.service';
  import { time, timer } from '../../services/Timer.service';

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      timer.set(false);
    }
  });
</script>

<div>
  {#if !$relaxedMode}
    {formatTime($time)}
  {/if}
</div>

<style>
  div {
    justify-self: center;
  }
</style>
