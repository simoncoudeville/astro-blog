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
    --fs: var(--ms-1);
    --note-backgroundColor: var(--global-foregroundColor);
    --note-color: var(--global-muted-color);
    /* --note-color: var(--global-muted-color2); */
    /* --note-title-color: var(--global-accent-color); */
    --note-title-color: var(--global-muted-color);
    --note-title-color: var(--global-text-color);
    /* --note-title-color: var(--global-title-color); */
    --note-whitespace: var(--global-whitespace);
    background-color: var(--note-backgroundColor);
    border-radius: var(--global-borderRadius-lg);
    padding: var(--note-whitespace);
    color: var(--note-color);
    /* font-size: calc(var(--fs) / var(--root-font-size) * 1rem); */
    /* line-height: calc(var(--global-baseline) * 4.5); */
    /* font-family: var(--global-font-family-alpha); */
  }

  .note__header {
    color: var(--note-title-color);
    display: flex;
    align-items: center;
    gap: var(--global-whitespace-3xs);
    justify-content: space-between;
  }

  .note__title {
    /* --fs: var(--ms-1); */
    /* font-size: calc(var(--fs) / var(--root-font-size) * 1rem); */
    /* line-height: calc(var(--global-baseline) * 4.5); */
    /* font-family: var(--global-font-family-alpha); */
    /* font-family: var(--global-font-family-beta); */
    /* font-style: italic; */
    /* color: var(--note-title-color); */
    font-weight: normal;
  }

  /* @media (prefers-color-scheme: dark) {
    .note {
      --note-title-color: var(--global-color-violet-400);
    }
  } */
</style>
