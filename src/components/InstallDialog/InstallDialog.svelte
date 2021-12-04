<script lang="ts">

const finishInstall = () => {
  window.location.reload();
}

</script>

<div class="card" on:click="{finishInstall}">New version detected, finish install</div>

<style>
.card {
  justify-self: end;
  font-size: 10px;
}
</style>
