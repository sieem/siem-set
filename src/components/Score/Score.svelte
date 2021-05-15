<script lang="ts">
    import { scoreStore } from "../../services/Score.service";
    let score = 0;

    scoreStore.subscribe((_score) => score = _score);
</script>

<div>Score: {score}</div>

<style>

</style>
