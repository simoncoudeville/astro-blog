<script>
  export let title = "Note";
  import IconInfo from "./Icons/IconInfo.svelte";
</script>

<aside class="note flow-xs">
  <header class="note__header">
    <h3 class="note__title">{title}</h3>
    <IconInfo />
  </header>
  <slot />
</aside>
