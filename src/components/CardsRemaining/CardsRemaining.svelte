<script lang="ts">
    import { cardsRemaining } from '../../services/Card.store';
</script>

<div class="cardsRemaining">
    <div class="card one">{$cardsRemaining}</div>
    <div class="card two" class:hidden={$cardsRemaining < 3}></div>
    <div class="card three" class:hidden={$cardsRemaining < 3}></div>
</div>

<style>
    .cardsRemaining {
        position: relative;
        height: 35px;
        width: 30px;
        font-weight: bold;
        line-height: 1.4;
        text-align: center;
        justify-self: start;
    }

    .card {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .one {
        top: 0;
        left: 0;
        z-index: 3;
    }

    .two {
        top: 2px;
        left: 2px;
        z-index: 2;
    }

    .three {
        top: 4px;
        left: 4px;
        z-index: 1;
    }

    .hidden {
        display: none;
    }
</style>
