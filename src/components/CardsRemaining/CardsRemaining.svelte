<script lang="ts">
    import { cardsRemaining } from '../../services/Card.service';
    let _cardsRemaining = '';
    cardsRemaining.subscribe((value) => _cardsRemaining = value);

</script>

<div class="cardsRemaining">{_cardsRemaining}</div>

<style>
    
</style>
