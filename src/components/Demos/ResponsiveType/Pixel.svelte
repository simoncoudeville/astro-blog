<div class="pixel-holder">
  <span class="pixel-text text-s">There it is</span>
  <div class="pixel-pointer">
    <div class="pixel" />
  </div>
</div>

<style>
  .pixel {
    width: 1px;
    height: 1px;
    background-color: var(--global-text-color);
  }

  .pixel-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--global-whitespace);
    padding: var(--global-whitespace);
  }

  .pixel-text {
    color: var(--global-accent-color);
  }

  .pixel-pointer {
    width: 40px;
    height: 40px;
    border: 1px solid var(--global-accent-color);
    align-self: center;
    justify-self: center;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .pixel-pointer::after {
    display: block;
    content: "";
    position: absolute;
    width: 1px;
    height: var(--global-whitespace);
    background-color: var(--global-accent-color);
    top: calc(var(--global-whitespace) * -1);
  }
</style>
