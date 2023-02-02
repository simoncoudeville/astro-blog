<script>
  export let functionName;
  export let disabledParameters = false;
  import IconRefresh from "../../Icons/IconRefresh.svelte";
</script>

<button
  class="button-reset shrink-0"
  on:click={functionName}
  disabled={disabledParameters}
>
  <span class="sr-only">reset</span>
  <IconRefresh />
</button>
