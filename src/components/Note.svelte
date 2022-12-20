<div class="note">
  <h3 class="note__title">Note</h3>
  <slot />
</div>

<style>
  .note {
    background-color: var(--global-foregroundColor);
    border-radius: var(--global-borderRadius);
    padding: var(--global-whitespace-2xs);
    border: 1px solid var(--global-color-rose);
  }

  .note__title,
  .note {
    --fs: 17;
    font-size: calc(var(--fs) / var(--root-font-size) * 1rem);
    line-height: calc(var(--global-baseline) * 5);
    /* color: var(--global-muted-color); */
    color: var(--global-color-rose);
  }

  .note__title {
    /* font-weight: normal; */
    color: var(--global-color-rose);
    /* color: var(--global-text-color); */
    /* color: var(--global-meta-color); */
    margin-bottom: var(--global-whitespace-4xs);
  }
</style>
