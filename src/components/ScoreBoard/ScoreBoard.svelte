<script lang="ts">
  import { formatDate } from '../../helper/formatDate.helper';
  import { formatTime } from '../../helper/formatTime.helper';
  import { lastRecordDateTime, scoreBoard } from '../../services/Score.service';

  let activeTab: 'score' | 'time' = 'score';

  const changeActiveTab = (tab: 'score' | 'time') => (activeTab = tab);
</script>

{#if $scoreBoard[activeTab].length}
  <div class="card">
    <div class="table">
      <div class="row header tabs">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="tab"
          class:active={activeTab === 'score'}
          on:click={() => changeActiveTab('score')}
        >
          By Score
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="tab"
          class:active={activeTab === 'time'}
          on:click={() => changeActiveTab('time')}
        >
          By Time
        </div>
      </div>
      <div class="row header">
        <div></div>
        <div>Score</div>
        <div>Time</div>
        <div>Date</div>
        <div>Unused cards</div>
      </div>
      {#each $scoreBoard[activeTab] as row}
        <div class="row" class:active={$lastRecordDateTime === row.date}>
          <div>{row.score}</div>
          <div>{formatTime(row.time)}</div>
          <div>{formatDate(row.date)}</div>
          <div>{row.unusedCards ?? '?'}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  :root {
    counter-reset: row;
  }

  .card {
    cursor: unset;
  }

  .table {
    display: grid;
    gap: 5px;
    margin: 5px;
    max-height: 500px;
    overflow: auto;
  }

  .table .row {
    display: grid;
    gap: 20px;
    grid-template-columns: 30px 1fr 1fr 1fr 1fr 30px;
    font-size: 80%;
    white-space: nowrap;
  }

  .table .row.tabs {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0;
    padding-bottom: 15px;
  }

  .table .row.tabs .tab {
    border-bottom: var(--border-width) solid var(--border-color);
    cursor: pointer;
  }

  .table .row.tabs .tab:hover,
  .table .row.tabs .tab.active {
    border-color: var(--border-color-active);
  }

  .table .row:not(.header) {
    counter-increment: row;
  }

  .table .row:not(.header):before {
    content: counter(row);
  }

  .table .row.active:after {
    content: '⭐';
  }
</style>
