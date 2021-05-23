<script lang="ts">
import { dateDisplayer } from "../../helper/dateDisplayer.helper";

    import { timeDisplayer } from "../../helper/timeDisplayer.helper";
    import { scoreBoard } from "../../services/Score.service";
</script>

<div>
    {#if $scoreBoard.length}
    <h2>Your scores:</h2>
        <div class="table">
            {#each $scoreBoard as row}
                <div class="row">
                    <div>{row.score}</div>
                    <div>{timeDisplayer(row.time)}</div>
                    <div>{dateDisplayer(row.date)}</div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
.table {
    display: grid;
    gap: 5px;
    margin: 5px;
}

.table .row {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
}
</style>
