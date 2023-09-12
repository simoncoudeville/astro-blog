<script>
  export let functionName;
  export let disabledParameters = false;
  import IconRefresh from "../../Icons/IconRefresh.svelte";
</script>

<button
  class="button-reset text-s"
  on:click={functionName}
  disabled={disabledParameters}
>
  <span class="sr-only">reset</span>
  <!-- Reset -->
  <IconRefresh />
</button>

<style>
  .button-reset {
    border-radius: var(--global-borderRadius-sm);
    /* border-radius: 100%; */
    /* border-radius: var(--global-whitespace); */
    /* background-color: var(--global-foregroundColor2); */
    /* background-color: var(--global-backgroundColor); */
    /* border: 1px solid var(--global-borderColor2); */
    /* padding: 0 var(--global-whitespace-xs); */
  }
</style>
