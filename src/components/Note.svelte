<script>
  export let title = "Note";
  import IconInfo from "./Icons/IconInfo.svelte";
</script>

<aside class="note readable flow-s">
  <header class="note__header">
    <h2 class="note__title">{title}</h2>
    <!-- <IconInfo /> -->
  </header>
  <slot />
</aside>

<style>
  .note {
    --note-backgroundColor: var(--global-foregroundColor);
    --note-color: var(--global-muted-color);
    /* --note-title-color: var(--global-accent-color); */
    --note-title-color: var(--global-muted-color);
    /* --note-title-color: var(--global-text-color); */
    --note-whitespace: var(--global-whitespace);
    background-color: var(--note-backgroundColor);
    border-radius: var(--global-borderRadius-lg);
    padding: var(--note-whitespace);
    color: var(--note-color);
  }

  .note__title,
  .note {
    --fs: var(--ms0);
    font-size: calc(var(--fs) / var(--root-font-size) * 1rem);
    /* line-height: calc(var(--global-baseline) * 5.5); */
  }

  .note__header {
    color: var(--note-title-color);
    display: flex;
    align-items: center;
    gap: var(--global-whitespace-3xs);
    justify-content: space-between;
  }

  .note__title {
    font-family: var(--global-font-family-alpha);
    font-family: var(--global-font-family-beta);
    font-style: italic;
    color: currentColor;
    font-weight: normal;
  }

  /* @media (prefers-color-scheme: dark) {
    .note {
      --note-title-color: var(--global-color-violet-400);
    }
  } */
</style>
