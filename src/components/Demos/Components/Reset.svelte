<script>
  export let functionName;
  export let disabledParameters;
  import IconRefresh from "../../Icons/IconRefresh.svelte";
</script>

<button
  class="button-reset"
  on:click={functionName}
  disabled={disabledParameters}
>
  <span class="sr-only">reset</span>
  <IconRefresh />
</button>
