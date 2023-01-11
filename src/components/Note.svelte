<script>
  export let title = "Note";
</script>

<aside class="note flow-xs">
  <header class="note__header">
    <h3 class="note__title">{title}</h3>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><circle cx="12" cy="12" r="10" /><line
        x1="12"
        y1="16"
        x2="12"
        y2="12"
      /><line x1="12" y1="8" x2="12.01" y2="8" /></svg
    >
  </header>
  <slot />
</aside>

<style>
  .note {
    --note-backgroundColor: var(--global-foregroundColor);
    /* --note-backgroundColor: var(--global-color-lilac-light); */
    --note-whitespace: var(--global-whitespace);
    background-color: var(--note-backgroundColor);
    border-radius: var(--global-borderRadius);
    padding: var(--note-whitespace);
    /* border: 1px solid var(--global-color-rose); */
    margin-left: calc(var(--note-whitespace) * -1);
    margin-right: calc(var(--note-whitespace) * -1);
    color: var(--global-muted-color);
    /* color: var(--global-color-lilac-dark); */
  }

  .note__title,
  .note {
    --fs: 17;
    font-size: calc(var(--fs) / var(--root-font-size) * 1rem);
    line-height: calc(var(--global-baseline) * 6);
    /* font-weight: normal; */
    /* color: var(--global-muted-color); */
    /* color: var(--global-color-rose); */
    /* color: var(--global-color-lilac-dark); */
  }

  .note__header {
    /* color: var(--global-title-color); */
    color: var(--global-accent-color);
    display: flex;
    align-items: center;
    /* flex-direction: row-reverse;
    justify-content: flex-end; */
    gap: var(--global-whitespace-3xs);
    justify-content: space-between;

    /* margin-bottom: var(--global-whitespace-xs); */
  }

  .note__title {
    color: inherit;
    /* font-weight: normal; */
    /* color: var(--global-color-rose); */
    /* color: var(--global-text-color); */
    /* color: var(--global-meta-color); */
  }
</style>
