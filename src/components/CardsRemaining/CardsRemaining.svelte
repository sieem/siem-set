<script lang="ts">
    import { cardsRemainingStore } from '../../services/Card.service';
    let cardsRemaining: number;
    cardsRemainingStore.subscribe((_cardsRemaining) => cardsRemaining = _cardsRemaining);

</script>

<div class="cardsRemaining">{cardsRemaining}</div>

<style>
    
</style>
