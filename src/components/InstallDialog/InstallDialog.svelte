<script lang="ts">

const finishInstall = () => {
  window.location.reload();
}

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click="{finishInstall}">New version detected, finish install</div>

<style>
.card {
  justify-self: end;
  font-size: 10px;
}
</style>
