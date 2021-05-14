<script lang="ts">
    let time = 0;
    let timer = setInterval(() => time++, 1000);


    document.addEventListener('visibilitychange', (ev) => 
        document.visibilityState === 'visible'
            ? timer = setInterval(() => time++, 1000)
            : clearInterval(timer)
    );
</script>

<div>{time}</div>

<style>

</style>
