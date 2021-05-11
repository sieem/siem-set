<script lang="ts">
    const startTime = new Date();
    let time;
    setTime();

    setInterval(() => {
        setTime();
    }, 1000);

    function setTime() {
        time = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    }

</script>

<div>{time}</div>

<style>

</style>
